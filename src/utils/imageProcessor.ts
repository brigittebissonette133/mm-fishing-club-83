
import { ImageProcessingCore } from './image/processing';
import { ImageCompression } from './image/compression';
import { ImageValidation } from './image/validation';

export class ImageProcessor {
  private static readonly MAX_CANVAS_SIZE = 1920;
  private static readonly JPEG_QUALITY = 0.7;
  private static readonly WEBP_QUALITY = 0.8;
  private static readonly PROCESSING_TIMEOUT = 10000;
  private static readonly COMPRESSION_TIMEOUT = 8000;

  // Process image with compression optimizations
  static async processImageAsync(file: File, options?: { 
    maxWidth?: number; 
    maxHeight?: number; 
    quality?: number;
    format?: 'jpeg' | 'webp' | 'auto';
  }): Promise<string> {
    return ImageProcessingCore.processImageAsync(file, options);
  }

  // Fast compression for camera captures
  static async compressForCamera(imageDataUrl: string): Promise<string> {
    return ImageCompression.compressForCamera(imageDataUrl);
  }

  // Clean up blob URLs to prevent memory leaks
  static cleanupBlobUrl(url: string): void {
    ImageProcessingCore.cleanupBlobUrl(url);
  }

  // Validate image dimensions without loading full image
  static async validateImageDimensions(
    file: File, 
    maxWidth: number = 2048, 
    maxHeight: number = 2048
  ): Promise<{ valid: boolean; width?: number; height?: number }> {
    return ImageValidation.validateImageDimensions(file, maxWidth, maxHeight);
  }
}
