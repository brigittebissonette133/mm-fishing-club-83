
// Client-side security utilities and helpers

export class SecurityUtils {
  // Rate limiters with automatic cleanup
  private static readonly loginAttempts = new Map<string, number[]>();
  private static readonly fileUploads = new Map<string, number[]>();
  private static readonly formSubmissions = new Map<string, number[]>();
  
  private static readonly MAX_LOGIN_ATTEMPTS = 5;
  private static readonly MAX_FILE_UPLOADS = 10;
  private static readonly MAX_FORM_SUBMISSIONS = 20;
  private static readonly LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  private static readonly FILE_WINDOW_MS = 60 * 1000; // 1 minute
  private static readonly FORM_WINDOW_MS = 60 * 1000; // 1 minute

  private static createRateLimiter(
    storage: Map<string, number[]>, 
    maxRequests: number, 
    windowMs: number
  ) {
    return (identifier: string = 'default'): boolean => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!storage.has(identifier)) {
        storage.set(identifier, []);
      }
      
      const requests = storage.get(identifier)!;
      
      // Remove old requests and clean up memory
      const validRequests = requests.filter(time => time > windowStart);
      
      if (validRequests.length >= maxRequests) {
        return false;
      }
      
      validRequests.push(now);
      storage.set(identifier, validRequests);
      
      // Periodic cleanup of old entries
      if (Math.random() < 0.1) { // 10% chance to trigger cleanup
        this.cleanupOldEntries(storage, windowMs);
      }
      
      return true;
    };
  }

  private static cleanupOldEntries(storage: Map<string, number[]>, windowMs: number) {
    const now = Date.now();
    const cutoff = now - windowMs * 2; // Keep entries for 2x window duration
    
    for (const [key, requests] of storage.entries()) {
      const validRequests = requests.filter(time => time > cutoff);
      if (validRequests.length === 0) {
        storage.delete(key);
      } else {
        storage.set(key, validRequests);
      }
    }
  }

  static checkLoginRateLimit(identifier?: string): boolean {
    const rateLimiter = this.createRateLimiter(
      this.loginAttempts, 
      this.MAX_LOGIN_ATTEMPTS, 
      this.LOGIN_WINDOW_MS
    );
    return rateLimiter(identifier || 'global');
  }

  static checkFileUploadRateLimit(identifier?: string): boolean {
    const rateLimiter = this.createRateLimiter(
      this.fileUploads, 
      this.MAX_FILE_UPLOADS, 
      this.FILE_WINDOW_MS
    );
    return rateLimiter(identifier || 'global');
  }

  static checkFormSubmitRateLimit(identifier?: string): boolean {
    const rateLimiter = this.createRateLimiter(
      this.formSubmissions, 
      this.MAX_FORM_SUBMISSIONS, 
      this.FORM_WINDOW_MS
    );
    return rateLimiter(identifier || 'global');
  }

  // Secure random string generation with better entropy
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Use crypto.getRandomValues if available, fallback to Math.random
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        result += chars.charAt(array[i] % chars.length);
      }
    } else {
      // Fallback for older browsers
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    
    return result;
  }

  // Content Security Policy violation handler
  static setupCSPReporting() {
    if (typeof document !== 'undefined') {
      document.addEventListener('securitypolicyviolation', (event) => {
        console.warn('CSP Violation:', {
          directive: event.violatedDirective,
          blockedURI: event.blockedURI,
          source: event.sourceFile,
          line: event.lineNumber
        });
        
        // In production, this should report to a security monitoring service
      });
    }
  }

  // Input validation helpers with better error handling
  static validateImageDimensions(file: File, maxWidth: number = 2048, maxHeight: number = 2048): Promise<boolean> {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) {
        resolve(false);
        return;
      }

      const img = new Image();
      const timeout = setTimeout(() => {
        resolve(false);
        URL.revokeObjectURL(img.src);
      }, 5000);

      img.onload = () => {
        clearTimeout(timeout);
        const isValid = img.width <= maxWidth && img.height <= maxHeight;
        resolve(isValid);
        URL.revokeObjectURL(img.src);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
        URL.revokeObjectURL(img.src);
      };
      
      try {
        img.src = URL.createObjectURL(file);
      } catch (error) {
        clearTimeout(timeout);
        resolve(false);
      }
    });
  }

  // Safe JSON parsing with better type checking
  static safeJsonParse<T>(json: string, fallback: T): T {
    if (typeof json !== 'string' || json.trim() === '') {
      return fallback;
    }
    
    try {
      const parsed = JSON.parse(json);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  // Session security checks with better browser compatibility
  static validateSession(): boolean {
    // Check if running in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return true;
    }

    // Check if the tab is visible (basic anti-bot measure)
    if (document.hidden) {
      return true; // Allow background operation
    }

    // Check for unusual activity patterns
    const userAgent = navigator.userAgent;
    if (!userAgent || userAgent.length < 10) {
      console.warn('Suspicious user agent detected');
      return false;
    }

    return true;
  }

  // Memory cleanup for sensitive data with better type safety
  static clearSensitiveMemory(obj: any): void {
    if (obj === null || obj === undefined) {
      return;
    }
    
    if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'string') {
            obj[key] = '';
          } else if (typeof obj[key] === 'object') {
            this.clearSensitiveMemory(obj[key]);
          }
        }
      }
    }
  }

  // Secure form handler - specifically for form data
  static createSecureFormHandler<T>(
    handler: (data: T) => void | Promise<void>,
    validator?: (data: T) => boolean
  ) {
    return async (data: T) => {
      try {
        // Basic data validation
        if (!data || typeof data !== 'object') {
          console.warn('Invalid form data');
          return;
        }

        // Custom validation if provided
        if (validator && !validator(data)) {
          console.warn('Form data validation failed');
          return;
        }

        // Rate limiting check
        if (!this.checkFormSubmitRateLimit()) {
          console.warn('Rate limit exceeded');
          return;
        }

        await handler(data);
      } catch (error) {
        console.error('Form handler error:', error);
      }
    };
  }

  // Secure event handling with better type safety
  static createSecureEventHandler<T extends Event>(
    handler: (event: T) => void,
    validator?: (event: T) => boolean
  ) {
    return (event: T) => {
      try {
        // Basic event validation
        if (!event || typeof event !== 'object') {
          console.warn('Invalid event object');
          return;
        }

        // Custom validation if provided
        if (validator && !validator(event)) {
          console.warn('Event validation failed');
          return;
        }

        // Rate limiting check for events that could be abused
        if (event.type === 'submit' || event.type === 'click') {
          if (!this.checkFormSubmitRateLimit()) {
            console.warn('Rate limit exceeded');
            return;
          }
        }

        handler(event);
      } catch (error) {
        console.error('Event handler error:', error);
      }
    };
  }

  // Browser feature detection
  static getBrowserCapabilities() {
    return {
      hasLocalStorage: typeof Storage !== 'undefined',
      hasCrypto: typeof crypto !== 'undefined' && !!crypto.getRandomValues,
      hasCanvas: typeof document !== 'undefined' && !!document.createElement('canvas').getContext,
      hasFileReader: typeof FileReader !== 'undefined',
      hasGeolocation: typeof navigator !== 'undefined' && !!navigator.geolocation,
      hasVibration: typeof navigator !== 'undefined' && !!navigator.vibrate
    };
  }
}

// Initialize security measures only in browser environment
if (typeof window !== 'undefined') {
  SecurityUtils.setupCSPReporting();
}
