import { CoreStorage } from './coreStorage';
import { SESSION_TIMEOUT } from './storageTypes';

export class SessionManager {
  // Enhanced session management - NO PASSWORD STORAGE
  static logout(): void {
    console.warn('🔒 DEMO LOGOUT: Clearing all local session data');
    
    // Clear all demo data
    CoreStorage.removeItem('user_login');
    CoreStorage.removeItem('is_logged_in');
    CoreStorage.removeItem('user_profile');
    CoreStorage.removeItem('session_timestamp');
    
    // Security: Clear any potential sensitive data remnants
    const keys = Object.keys(localStorage);
    keys.forEach((key: string) => {
      if (key.includes('password') || key.includes('secret') || key.includes('token')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('🔒 Demo session cleared - all local data removed');
  }

  static isLoggedIn(): boolean {
    const isLoggedIn = CoreStorage.getItem<boolean>('is_logged_in') || false;
    const sessionTimestamp = CoreStorage.getItem<number>('session_timestamp');
    
    // Check for session timeout
    if (sessionTimestamp && Date.now() - sessionTimestamp > SESSION_TIMEOUT) {
      console.log('🔒 Demo session expired - logging out');
      this.logout();
      return false;
    }
    
    return isLoggedIn;
  }

  static getCurrentUser(): any {
    if (!this.isLoggedIn()) {
      return null;
    }
    return CoreStorage.getItem('user_login');
  }

  static updateSessionTimestamp(): void {
    CoreStorage.setItem('session_timestamp', Date.now());
  }

  // Security method to detect suspicious activity
  static validateSession(): boolean {
    try {
      // Check if we're in a secure context for production
      if (typeof window !== 'undefined' && location.protocol === 'http:' && location.hostname !== 'localhost') {
        console.warn('🔒 Insecure context detected - HTTPS required for production');
        return false;
      }
      
      // Basic tampering detection
      const loginInfo = CoreStorage.getItem('user_login');
      const isLoggedIn = CoreStorage.getItem('is_logged_in');
      
      if (isLoggedIn && !loginInfo) {
        console.warn('🔒 Session inconsistency detected - clearing session');
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      this.logout();
      return false;
    }
  }
}