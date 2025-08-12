# Kessler & Vayne Industries

A cyberpunk-themed e-commerce site with hidden CTF puzzles, built as a simple static HTML/CSS/JS application.

## Quick Start

**Just open `index.html` in your browser!** No build tools or server required.

## Tech Stack

- **Pure HTML/CSS/JS** - No frameworks or build tools
- **Hash-based routing** - Works without a server
- **LocalStorage** - All data stored locally with light obfuscation
- **Web Crypto API** - For SHA-256 hashing and random number generation
- **Cyberpunk styling** - Custom CSS with neon green theme

## File Structure

```
/
├── index.html      # Single page with all content sections
├── styles.css      # Cyberpunk theme and responsive design
├── script.js       # All functionality (routing, storage, crypto)
├── README.md       # This file
└── SITE-PRD.md     # Original product requirements
```

## Features

- **✅ ConvergenceLedger Account**: Fake cryptocurrency balance system (503-998 CVX)
- **✅ Account Binding**: SHA-256 credential hashing, permanent client binding
- **✅ Hash Routing**: Navigate between Shop, About, Balance, Settings
- **✅ Data Persistence**: LocalStorage with `kv_` prefixed keys and obfuscation
- **✅ Settings**: Clear all data, accessibility toggles
- **✅ Cyberpunk UI**: Dark theme, neon accents, monospace fonts
- **✅ Responsive Design**: Works on mobile and desktop
- **✅ GitHub Pages Ready**: Works as static site

## Usage

### Local Development
1. Open `index.html` in any modern browser
2. Navigate using the header links or hash URLs (`#shop`, `#balance`, etc.)

### GitHub Pages Deployment
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch
4. Site will be available at `https://username.github.io/repository-name`

### Account System
1. Go to Balance page
2. Enter any account number and password
3. First submission creates account with random CVX balance
4. Subsequent logins must use same credentials

## Browser Compatibility

- **Modern browsers** with ES2017+ support
- **Web Crypto API** required (HTTPS recommended for production)
- **LocalStorage** required
- **CSS Grid** and **Flexbox** support

## Development Status

**M1: ✅ Complete** - Core functionality implemented
- Hash-based routing system
- Account binding with crypto
- Settings with data management
- Cyberpunk styling
- Responsive design

**M2: 🔄 Next** - Shop functionality
- Product grid and filtering
- CipherSig component generation
- ConvergenceLedger promo unit
- Product detail modals

## Debug Console

Open browser dev tools and access `window.KV` for debugging:
```javascript
KV.Storage.getItem('kv_balanceCVX')  // Check balance
KV.Storage.clearAllKVData()          // Clear all data
KV.Router.navigate('balance')        // Navigate to page
```
```
