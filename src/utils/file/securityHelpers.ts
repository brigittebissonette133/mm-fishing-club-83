
import { SecurityUtils } from '../security';

export class FileSecurityHelpers {
  // Secure file name generation
  static generateSecureFileName(originalName: string, extension: string): string {
    const timestamp = Date.now();
    const randomSuffix = SecurityUtils.generateSecureToken(8);
    const sanitizedName = originalName
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 20);
    
    return `${sanitizedName}_${timestamp}_${randomSuffix}.${extension}`;
  }

  // Memory cleanup helper
  static cleanup(): void {
    // Force garbage collection if available (development only)
    if (typeof window !== 'undefined' && 'gc' in window && process.env.NODE_ENV === 'development') {
      (window as any).gc();
    }
  }
}
