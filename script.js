// Kessler & Vayne Industries - Main Application Script

// Storage System
const Storage = {
    PEPPER: 'kv∴meshbits',
    
    encode(obj) {
        return btoa(this.PEPPER + JSON.stringify(obj));
    },
    
    decode(str) {
        try {
            return JSON.parse(atob(str).replace(this.PEPPER, ''));
        } catch (error) {
            console.warn('Failed to decode storage item:', error);
            return null;
        }
    },
    
    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            
            // Use obfuscation for sensitive keys
            if (key.includes('orders') || key.includes('deliveryDates') || key.includes('puzzle')) {
                return this.decode(item);
            }
            
            return JSON.parse(item);
        } catch (error) {
            console.warn(`Failed to get storage item ${key}:`, error);
            return null;
        }
    },
    
    setItem(key, value) {
        try {
            let serialized;
            
            if (key.includes('orders') || key.includes('deliveryDates') || key.includes('puzzle')) {
                serialized = this.encode(value);
            } else {
                serialized = JSON.stringify(value);
            }
            
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.warn(`Failed to set storage item ${key}:`, error);
        }
    },
    
    removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn(`Failed to remove storage item ${key}:`, error);
        }
    },
    
    clearAllKVData() {
        try {
            const keys = Object.keys(localStorage).filter(key => key.startsWith('kv_'));
            keys.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.warn('Failed to clear KV data:', error);
        }
    },
    
    hasOnboarded() {
        return this.getItem('kv_hasOnboarded') === true;
    },
    
    getBalance() {
        return this.getItem('kv_balanceCVX') || 0;
    },
    
    getOrders() {
        return this.getItem('kv_orders') || [];
    },
    
    addOrder(productId) {
        const orders = this.getOrders();
        if (!orders.includes(productId)) {
            orders.push(productId);
            this.setItem('kv_orders', orders);
        }
    }
};

// Crypto Functions
const Crypto = {
    async hashCreds(account, password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(`${account}:${password}`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = new Uint8Array(hashBuffer);
        return btoa(String.fromCharCode(...hashArray));
    },
    
    generateRandomBalance() {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return 503 + (array[0] % (998 - 503 + 1));
    },
    
    futureDate2100s() {
        const array = new Uint32Array(3);
        crypto.getRandomValues(array);
        
        const year = 2103 + (array[0] % 97); // 2103-2199
        const month = 1 + (array[1] % 12);   // 1-12
        const lastDay = new Date(year, month, 0).getDate();
        const day = Math.min(28 + (array[2] % 3), lastDay); // 28-30, clamped to valid days
        
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
};

// Router System
const Router = {
    currentPage: 'shop',
    
    init() {
        // Handle initial load
        this.handleHashChange();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const hash = e.target.getAttribute('href').substring(1);
                this.navigate(hash);
            }
        });
    },
    
    handleHashChange() {
        const hash = window.location.hash.substring(1) || 'shop';
        this.navigate(hash);
    },
    
    navigate(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            // Update navigation active state
            this.updateNavigation(page);
            
            // Update page title
            document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} - Kessler & Vayne Industries`;
            
            // Trigger page-specific initialization
            this.initializePage(page);
        }
    },
    
    updateNavigation(activePage) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activePage}`) {
                link.classList.add('active');
            }
        });
    },
    
    initializePage(page) {
        switch (page) {
            case 'balance':
                Pages.renderBalance();
                break;
            case 'settings':
                Pages.initializeSettings();
                break;
        }
    }
};

// Page Components
const Pages = {
    renderBalance() {
        const balanceContent = document.getElementById('balance-content');
        const isOnboarded = Storage.hasOnboarded();
        
        if (isOnboarded) {
            const balance = Storage.getBalance();
            balanceContent.innerHTML = `
                <div class="balance-container">
                    <div class="page-header">
                        <h1 class="page-title">CONVERGENCELEDGER ACCOUNT</h1>
                        <p class="page-subtitle">Mesh-native settlement. Your GhostMark improves delivery priority.</p>
                    </div>

                    <div class="balance-display">
                        <div class="balance-amount">${balance}</div>
                        <div class="balance-currency">CVX</div>
                        <div class="balance-status">Bound to this client</div>
                    </div>

                    <div class="balance-info">
                        <p>Account status: <span style="color: var(--cyber-green);">ACTIVE</span></p>
                        <p>SpecterID verification complete. ImpulseCast enabled.</p>
                    </div>
                </div>
            `;
        } else {
            balanceContent.innerHTML = `
                <div class="balance-form">
                    <div class="page-header">
                        <h1 class="page-title">OPEN ACCOUNT</h1>
                        <p class="page-subtitle">Bind your Prime SpecterID to initialize CVX</p>
                    </div>

                    <form id="balance-form">
                        <div class="form-group">
                            <label for="account" class="form-label">Account Number</label>
                            <input type="text" id="account" class="form-input" placeholder="Enter account number" required>
                        </div>

                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-input" placeholder="Enter password" required>
                        </div>

                        <div id="error-container"></div>

                        <button type="submit" id="submit-btn" class="cyber-button full-width">INITIALIZE ACCOUNT</button>
                    </form>

                    <div class="balance-note">
                        <p>First successful submit binds credentials permanently to this client. Subsequent access requires identical SpecterID verification.</p>
                    </div>
                </div>
            `;
            
            // Add form handler
            const form = document.getElementById('balance-form');
            if (form) {
                form.addEventListener('submit', this.handleBalanceSubmit.bind(this));
            }
        }
    },
    
    async handleBalanceSubmit(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const errorContainer = document.getElementById('error-container');
        const account = document.getElementById('account').value;
        const password = document.getElementById('password').value;
        
        // Clear previous errors
        errorContainer.innerHTML = '';
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'INITIALIZING...';
        
        try {
            const credHash = await Crypto.hashCreds(account, password);
            const existingCreds = Storage.getItem('kv_firstCreds');
            
            if (!existingCreds) {
                // First time binding
                const newBalance = Crypto.generateRandomBalance();
                
                Storage.setItem('kv_firstCreds', credHash);
                Storage.setItem('kv_balanceCVX', newBalance);
                Storage.setItem('kv_hasOnboarded', true);
                
                // Re-render the page
                this.renderBalance();
            } else {
                // Verify existing credentials
                if (credHash === existingCreds) {
                    // Re-render the page
                    this.renderBalance();
                } else {
                    // Show error
                    errorContainer.innerHTML = `
                        <div class="error-message">
                            Invalid credentials. This client is bound to different SpecterID.
                        </div>
                    `;
                }
            }
        } catch (error) {
            errorContainer.innerHTML = `
                <div class="error-message">
                    Authentication failed. Please try again.
                </div>
            `;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'INITIALIZE ACCOUNT';
        }
    },
    
    initializeSettings() {
        const clearDataBtn = document.getElementById('clear-data-btn');
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        const reduceAnimationToggle = document.getElementById('reduce-animation-toggle');
        
        // Load saved settings
        const highContrast = Storage.getItem('kv_ui_highContrast') || false;
        const reduceAnimation = Storage.getItem('kv_ui_reduceAnimation') || false;
        
        highContrastToggle.checked = highContrast;
        reduceAnimationToggle.checked = reduceAnimation;
        
        // Apply settings
        if (highContrast) {
            document.body.classList.add('high-contrast');
        }
        if (reduceAnimation) {
            document.body.classList.add('reduce-motion');
        }
        
        // Clear data handler
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', this.handleClearDataClick.bind(this));
        }
        
        // Settings toggles
        highContrastToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            Storage.setItem('kv_ui_highContrast', enabled);
            
            if (enabled) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        });
        
        reduceAnimationToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            Storage.setItem('kv_ui_reduceAnimation', enabled);
            
            if (enabled) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    },
    
    handleClearDataClick() {
        const clearDataSection = document.getElementById('clear-data-section');
        
        clearDataSection.innerHTML = `
            <div class="confirm-dialog">
                <p class="confirm-text">Are you sure? This will permanently delete all local data.</p>
                <div class="confirm-buttons">
                    <button id="confirm-clear-btn" class="cyber-button danger">YES, CLEAR ALL</button>
                    <button id="cancel-clear-btn" class="cyber-button">CANCEL</button>
                </div>
            </div>
        `;
        
        // Add event listeners for confirmation buttons
        document.getElementById('confirm-clear-btn').addEventListener('click', this.handleConfirmClear.bind(this));
        document.getElementById('cancel-clear-btn').addEventListener('click', this.handleCancelClear.bind(this));
    },
    
    async handleConfirmClear() {
        const confirmBtn = document.getElementById('confirm-clear-btn');
        
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'CLEARING...';
        
        // Add a small delay for UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clear all data
        Storage.clearAllKVData();
        
        // Reload the page to reset all state
        window.location.reload();
    },
    
    handleCancelClear() {
        const clearDataSection = document.getElementById('clear-data-section');
        if (clearDataSection) {
            clearDataSection.innerHTML = `
                <button id="clear-data-btn" class="cyber-button danger">CLEAR ALL DATA</button>
            `;
            
            // Re-attach the event listener
            const newClearBtn = document.getElementById('clear-data-btn');
            if (newClearBtn) {
                newClearBtn.addEventListener('click', this.handleClearDataClick.bind(this));
            }
        }
    }
};

// Utility Functions
const Utils = {
    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Generate a random ID
    generateId() {
        return Math.random().toString(36).substring(2, 11);
    },
    
    // Debounce function for search/filtering
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Console System (for future puzzle implementation)
const Console = {
    isVisible: false,
    commands: {},
    
    init() {
        // Listen for tilde key to toggle console
        document.addEventListener('keydown', (e) => {
            if (e.key === '~' && Router.currentPage === 'shop') {
                e.preventDefault();
                this.toggle();
            }
        });
    },
    
    toggle() {
        // This will be implemented in M4 for the puzzle system
        console.log('Console toggle - coming in M4!');
    },
    
    addCommand(name, handler) {
        this.commands[name] = handler;
    }
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Kessler & Vayne Industries - Initializing...');
    
    // Initialize all systems
    Router.init();
    Console.init();
    
    // Load initial settings
    const highContrast = Storage.getItem('kv_ui_highContrast');
    const reduceAnimation = Storage.getItem('kv_ui_reduceAnimation');
    
    if (highContrast) {
        document.body.classList.add('high-contrast');
    }
    if (reduceAnimation) {
        document.body.classList.add('reduce-motion');
    }
    
    console.log('✅ System initialized successfully');
    console.log('📊 Storage keys:', Object.keys(localStorage).filter(k => k.startsWith('kv_')));
    console.log('🎯 Current page:', Router.currentPage);
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Export for debugging (available in browser console)
window.KV = {
    Storage,
    Crypto,
    Router,
    Pages,
    Utils,
    Console
};