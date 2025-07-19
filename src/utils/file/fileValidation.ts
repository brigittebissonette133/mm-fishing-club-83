
import { validateAndSanitize } from '../validation';
import { SecurityUtils } from '../security';
import { ImageProcessor } from '../imageProcessor';

export interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  maxDimensions?: { width: number; height: number };
}

export class FileValidator {
  private static readonly DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  private static readonly DEFAULT_MAX_DIMENSIONS = { width: 2048, height: 2048 };

  static async validateFile(file: File, options?: FileValidationOptions): Promise<boolean> {
    const opts = {
      maxSize: options?.maxSize || this.DEFAULT_MAX_SIZE,
      allowedTypes: options?.allowedTypes || this.DEFAULT_ALLOWED_TYPES,
      maxDimensions: options?.maxDimensions || this.DEFAULT_MAX_DIMENSIONS
    };
    
    // Rate limiting check
    if (!SecurityUtils.checkFileUploadRateLimit()) {
      throw new Error('Upload rate limit exceeded. Please wait before uploading again.');
    }
    
    try {
      // Basic file validation
      if (!file || !(file instanceof File)) {
        throw new Error('Invalid file object');
      }

      // Validate file using Zod schema
      validateAndSanitize.imageFile(file);
      
      // Size check
      if (file.size > opts.maxSize) {
        throw new Error(`File size exceeds ${Math.round(opts.maxSize / 1024 / 1024)}MB limit`);
      }
      
      if (file.size < 100) {
        throw new Error('File appears to be too small or corrupted');
      }
      
      // Type validation
      if (!opts.allowedTypes.includes(file.type)) {
        throw new Error(`File type not allowed. Allowed types: ${opts.allowedTypes.join(', ')}`);
      }
      
      // Validate file header
      const isValidImage = await this.validateImageHeader(file);
      if (!isValidImage) {
        throw new Error('File appears to be corrupted or not a valid image');
      }

      // Dimension validation using the processor
      if (opts.maxDimensions) {
        const dimensionCheck = await ImageProcessor.validateImageDimensions(
          file, 
          opts.maxDimensions.width, 
          opts.maxDimensions.height
        );
        
        if (!dimensionCheck.valid) {
          throw new Error(
            `Image dimensions (${dimensionCheck.width}x${dimensionCheck.height}) exceed maximum allowed size (${opts.maxDimensions.width}x${opts.maxDimensions.height})`
          );
        }
      }
      
      return true;
    } catch (error) {
      console.error('File validation failed:', error);
      throw error;
    }
  }

  private static async validateImageHeader(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      const timeout = setTimeout(() => {
        reader.abort();
        resolve(false);
      }, 5000);
      
      reader.onload = (e) => {
        clearTimeout(timeout);
        try {
          const buffer = e.target?.result as ArrayBuffer;
          if (!buffer || buffer.byteLength < 4) {
            resolve(false);
            return;
          }
          
          const bytes = new Uint8Array(buffer.slice(0, 12));
          
          // Check magic bytes for common image formats
          const isJPEG = bytes[0] === 0xFF && bytes[1] === 0xD8;
          const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
          const isWebP = buffer.byteLength >= 12 && 
                        new TextDecoder().decode(buffer.slice(8, 12)) === 'WEBP';
          
          resolve(isJPEG || isPNG || isWebP);
        } catch {
          resolve(false);
        }
      };
      
      reader.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
      
      reader.readAsArrayBuffer(file.slice(0, 12));
    });
  }
}
