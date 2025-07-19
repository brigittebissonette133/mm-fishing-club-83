export class ImageCompression {
  private static readonly JPEG_QUALITY = 0.7;
  private static readonly WEBP_QUALITY = 0.8;
  private static readonly COMPRESSION_TIMEOUT = 8000;

  static async compressImageAdvanced(
    dataUrl: string, 
    originalType: string, 
    options: { maxWidth: number; maxHeight: number; quality: number; format: string }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Image compression timeout'));
      }, this.COMPRESSION_TIMEOUT);

      const img = new Image();
      
      img.onload = () => {
        clearTimeout(timeout);
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // Calculate optimal dimensions with better aspect ratio preservation
          const { width, height } = this.calculateOptimalDimensions(
            img.width, 
            img.height, 
            options.maxWidth, 
            options.maxHeight
          );

          canvas.width = width;
          canvas.height = height;

          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Clear canvas with white background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);

          // Draw image with better quality
          ctx.drawImage(img, 0, 0, width, height);

          // Determine output format
          const outputFormat = this.determineOutputFormat(originalType, options.format);
          const quality = outputFormat === 'image/webp' ? this.WEBP_QUALITY : options.quality;

          const compressedDataUrl = canvas.toDataURL(outputFormat, quality);
          
          // Check compression effectiveness
          const originalSize = dataUrl.length;
          const compressedSize = compressedDataUrl.length;
          const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
          
          console.log(`Image compressed: ${compressionRatio}% size reduction (${Math.round(originalSize/1024)}KB → ${Math.round(compressedSize/1024)}KB)`);

          resolve(compressedDataUrl);
        } catch (error) {
          clearTimeout(timeout);
          reject(new Error('Image compression failed'));
        }
      };

      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Failed to load image for compression'));
      };

      img.src = dataUrl;
    });
  }

  private static calculateOptimalDimensions(
    originalWidth: number, 
    originalHeight: number, 
    maxWidth: number, 
    maxHeight: number
  ): { width: number; height: number } {
    // If image is already smaller than max dimensions, keep original size
    if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
      return { width: originalWidth, height: originalHeight };
    }

    // Calculate scaling factor to maintain aspect ratio
    const widthRatio = maxWidth / originalWidth;
    const heightRatio = maxHeight / originalHeight;
    const scalingFactor = Math.min(widthRatio, heightRatio);

    return {
      width: Math.floor(originalWidth * scalingFactor),
      height: Math.floor(originalHeight * scalingFactor)
    };
  }

  private static determineOutputFormat(originalType: string, formatOption: string): string {
    if (formatOption === 'auto') {
      // Use WebP if supported and original is not already WebP
      const supportsWebP = this.supportsWebP();
      if (supportsWebP && originalType !== 'image/webp') {
        return 'image/webp';
      }
      // Default to JPEG for photos, keep PNG for images with transparency
      return originalType === 'image/png' ? 'image/png' : 'image/jpeg';
    }
    
    return formatOption === 'webp' ? 'image/webp' : 'image/jpeg';
  }

  private static supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  }

  // Fast compression for camera captures
  static async compressForCamera(imageDataUrl: string): Promise<string> {
    return this.compressImageAdvanced(imageDataUrl, 'image/jpeg', {
      maxWidth: 1280, // Smaller for camera captures
      maxHeight: 1280,
      quality: 0.75,
      format: 'auto'
    });
  }
}
