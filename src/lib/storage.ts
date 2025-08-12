const PEPPER = 'kv∴meshbits';

export interface StorageKeys {
  kv_firstCreds: string;
  kv_balanceCVX: number;
  kv_hasOnboarded: boolean;
  kv_orders: string[];
  kv_deliveryDates: Record<string, string>;
  kv_productsCache: any;
  kv_ui: {
    filters: any;
    sort: string;
    theme: string;
    reducedMotion: boolean;
  };
  kv_puzzle: {
    ghostMark: number;
    steps: string[];
    discoveredAt: string;
    completed?: boolean;
  };
}

function enc<T>(obj: T): string {
  return btoa(PEPPER + JSON.stringify(obj));
}

function dec<T>(str: string): T {
  return JSON.parse(atob(str).replace(PEPPER, '')) as T;
}

export function getStorageItem<K extends keyof StorageKeys>(
  key: K
): StorageKeys[K] | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    if (key.startsWith('kv_orders') || key.startsWith('kv_deliveryDates') || key.startsWith('kv_puzzle')) {
      return dec<StorageKeys[K]>(item);
    }
    
    return JSON.parse(item) as StorageKeys[K];
  } catch (error) {
    console.warn(`Failed to get storage item ${key}:`, error);
    return null;
  }
}

export function setStorageItem<K extends keyof StorageKeys>(
  key: K,
  value: StorageKeys[K]
): void {
  try {
    let serialized: string;
    
    if (key.startsWith('kv_orders') || key.startsWith('kv_deliveryDates') || key.startsWith('kv_puzzle')) {
      serialized = enc(value);
    } else {
      serialized = JSON.stringify(value);
    }
    
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.warn(`Failed to set storage item ${key}:`, error);
  }
}

export function removeStorageItem(key: keyof StorageKeys): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove storage item ${key}:`, error);
  }
}

export function clearAllKVData(): void {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('kv_'));
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear KV data:', error);
  }
}

export function hasOnboarded(): boolean {
  return getStorageItem('kv_hasOnboarded') === true;
}

export function getBalance(): number {
  return getStorageItem('kv_balanceCVX') || 0;
}

export function getOrders(): string[] {
  return getStorageItem('kv_orders') || [];
}

export function addOrder(productId: string): void {
  const orders = getOrders();
  if (!orders.includes(productId)) {
    orders.push(productId);
    setStorageItem('kv_orders', orders);
  }
}