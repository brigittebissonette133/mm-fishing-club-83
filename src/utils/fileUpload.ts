
import { FileValidator, FileValidationOptions } from './file/fileValidation';
import { FileImageProcessor, ImageProcessingOptions } from './file/imageProcessing';
import { FileSecurityHelpers } from './file/securityHelpers';

export interface SecureUploadOptions extends FileValidationOptions, ImageProcessingOptions {}

export class SecureFileUpload {
  private static readonly DEFAULT_OPTIONS: SecureUploadOptions = {
    maxSize: 5 * 1024 * 1024, // Increased to 5MB since we'll compress
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxDimensions: { width: 2048, height: 2048 },
    stripExif: true,
    compression: {
      enabled: true,
      quality: 0.7,
      maxWidth: 1920,
      maxHeight: 1920
    }
  };

  static async validateFile(file: File, options?: SecureUploadOptions): Promise<boolean> {
    return FileValidator.validateFile(file, options);
  }

  static async processImage(file: File, options?: SecureUploadOptions): Promise<string> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    await this.validateFile(file, opts);
    return FileImageProcessor.processImage(file, opts);
  }

  // Quick compression method for camera captures
  static async processImageForCamera(imageDataUrl: string): Promise<string> {
    return FileImageProcessor.processImageForCamera(imageDataUrl);
  }

  // Secure file name generation
  static generateSecureFileName(originalName: string, extension: string): string {
    return FileSecurityHelpers.generateSecureFileName(originalName, extension);
  }

  // Memory cleanup helper
  static cleanup(): void {
    FileSecurityHelpers.cleanup();
  }
}
