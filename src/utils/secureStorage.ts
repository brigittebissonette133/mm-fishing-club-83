
// WARNING: This is client-side storage only and should not be used for truly sensitive data
// For production applications, use proper backend authentication and secure server-side storage
// DEMO ONLY - NOT SECURE FOR PRODUCTION USE

import { CoreStorage } from './storage/coreStorage';
import { FishingDataStorage } from './storage/fishingDataStorage';
import { SessionManager } from './storage/sessionManager';

// Main SecureStorage class that combines all storage functionality
export class SecureStorage {
  // Core storage operations
  static setItem(key: string, value: any): void {
    return CoreStorage.setItem(key, value);
  }

  static getItem<T>(key: string): T | null {
    return CoreStorage.getItem<T>(key);
  }

  static removeItem(key: string): void {
    return CoreStorage.removeItem(key);
  }

  static clear(): void {
    return CoreStorage.clear();
  }

  // Fishing app specific methods
  static saveFishingData(data: any): void {
    return FishingDataStorage.saveFishingData(data);
  }

  static loadFishingData(): any {
    return FishingDataStorage.loadFishingData();
  }

  static saveUserPreferences(preferences: any): void {
    return FishingDataStorage.saveUserPreferences(preferences);
  }

  static loadUserPreferences(): any {
    return FishingDataStorage.loadUserPreferences();
  }

  // Session management methods
  static logout(): void {
    return SessionManager.logout();
  }

  static isLoggedIn(): boolean {
    return SessionManager.isLoggedIn();
  }

  static getCurrentUser(): any {
    return SessionManager.getCurrentUser();
  }

  static updateSessionTimestamp(): void {
    return SessionManager.updateSessionTimestamp();
  }

  static validateSession(): boolean {
    return SessionManager.validateSession();
  }
}
