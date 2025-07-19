import { STORAGE_KEY_PREFIX, StorageItem, STORAGE_VERSION } from './storageTypes';
import { DataSanitizer } from './dataSanitizer';

export class CoreStorage {
  static setItem(key: string, value: any): void {
    // Security check - never store passwords or secrets
    if (key.includes('password') || key.includes('secret') || key.includes('token')) {
      console.warn('🔒 SECURITY: Attempted to store sensitive data - blocked for security');
      return;
    }

    try {
      const item: StorageItem = {
        value: DataSanitizer.sanitizeValue(value),
        timestamp: Date.now(),
        version: STORAGE_VERSION
      };
      
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(item));
    } catch (error) {
      console.error('Failed to store item:', error);
      throw new Error('Storage operation failed');
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      if (!stored) return null;

      const item: StorageItem = JSON.parse(stored);
      
      // Check for version compatibility
      if (item.version !== STORAGE_VERSION) {
        console.warn('Storage version mismatch, clearing item');
        this.removeItem(key);
        return null;
      }
      
      // Check for data age (additional security layer)
      if (Date.now() - item.timestamp > 7 * 24 * 60 * 60 * 1000) { // 7 days
        console.warn('Stored data too old, clearing item');
        this.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Failed to retrieve item:', error);
      this.removeItem(key); // Clean up corrupted data
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFIX + key);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
}