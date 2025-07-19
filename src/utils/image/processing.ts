
export class ImageProcessingCore {
  private static readonly MAX_CANVAS_SIZE = 1920;
  private static readonly PROCESSING_TIMEOUT = 10000;

  // Process image with compression optimizations
  static async processImageAsync(file: File, options?: { 
    maxWidth?: number; 
    maxHeight?: number; 
    quality?: number;
    format?: 'jpeg' | 'webp' | 'auto';
  }): Promise<string> {
    const opts = {
      maxWidth: options?.maxWidth || this.MAX_CANVAS_SIZE,
      maxHeight: options?.maxHeight || this.MAX_CANVAS_SIZE,
      quality: options?.quality || 0.7,
      format: options?.format || 'auto'
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Image processing timeout'));
      }, this.PROCESSING_TIMEOUT);

      const reader = new FileReader();
      
      reader.onload = (e) => {
        clearTimeout(timeout);
        const result = e.target?.result as string;
        
        if (!result || !result.startsWith('data:image/')) {
          reject(new Error('Invalid image data'));
          return;
        }

        // Use requestIdleCallback if available to process during idle time
        const processImage = async () => {
          try {
            const { ImageCompression } = await import('./compression');
            const processedImage = await ImageCompression.compressImageAdvanced(result, file.type, opts);
            resolve(processedImage);
          } catch (error) {
            reject(error);
          }
        };

        if ('requestIdleCallback' in window) {
          requestIdleCallback(processImage, { timeout: 5000 });
        } else {
          setTimeout(processImage, 0);
        }
      };

      reader.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Failed to read image file'));
      };

      reader.readAsDataURL(file);
    });
  }

  // Clean up blob URLs to prevent memory leaks
  static cleanupBlobUrl(url: string): void {
    if (url && url.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.warn('Failed to cleanup blob URL:', error);
      }
    }
  }
}
