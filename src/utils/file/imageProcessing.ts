
import { ImageProcessor } from '../imageProcessor';

export interface ImageProcessingOptions {
  stripExif?: boolean;
  compression?: {
    enabled?: boolean;
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
}

export class FileImageProcessor {
  private static readonly DEFAULT_OPTIONS: ImageProcessingOptions = {
    stripExif: true,
    compression: {
      enabled: true,
      quality: 0.7,
      maxWidth: 1920,
      maxHeight: 1920
    }
  };

  static async processImage(file: File, options?: ImageProcessingOptions): Promise<string> {
    const opts = { 
      ...this.DEFAULT_OPTIONS, 
      ...options,
      compression: { ...this.DEFAULT_OPTIONS.compression, ...options?.compression }
    };
    
    try {
      let processedImage: string;

      if (opts.compression?.enabled) {
        // Use advanced compression
        processedImage = await ImageProcessor.processImageAsync(file, {
          maxWidth: opts.compression.maxWidth,
          maxHeight: opts.compression.maxHeight,
          quality: opts.compression.quality,
          format: 'auto'
        });
      } else if (opts.stripExif) {
        // Use basic processing
        processedImage = await ImageProcessor.processImageAsync(file);
      } else {
        // Simple processing without compression or EXIF stripping
        processedImage = await this.basicImageProcessing(file);
      }

      return processedImage;
    } catch (error) {
      throw new Error(`Image processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static async basicImageProcessing(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      const timeout = setTimeout(() => {
        reader.abort();
        reject(new Error('File processing timeout'));
      }, 10000);
      
      reader.onload = (e) => {
        clearTimeout(timeout);
        const result = e.target?.result as string;
        
        if (!result || !result.startsWith('data:image/')) {
          reject(new Error('Invalid image data'));
          return;
        }
        
        resolve(result);
      };
      
      reader.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Quick compression method for camera captures
  static async processImageForCamera(imageDataUrl: string): Promise<string> {
    try {
      return await ImageProcessor.compressForCamera(imageDataUrl);
    } catch (error) {
      console.warn('Camera image compression failed, using original:', error);
      return imageDataUrl;
    }
  }
}
