
export class ImageValidation {
  // Validate image dimensions without loading full image
  static async validateImageDimensions(
    file: File, 
    maxWidth: number = 2048, 
    maxHeight: number = 2048
  ): Promise<{ valid: boolean; width?: number; height?: number }> {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve({ valid: false });
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      const cleanup = () => {
        URL.revokeObjectURL(url);
      };

      const timeout = setTimeout(() => {
        cleanup();
        resolve({ valid: false });
      }, 5000);

      img.onload = () => {
        clearTimeout(timeout);
        cleanup();
        
        const valid = img.width <= maxWidth && img.height <= maxHeight;
        resolve({ 
          valid, 
          width: img.width, 
          height: img.height 
        });
      };

      img.onerror = () => {
        clearTimeout(timeout);
        cleanup();
        resolve({ valid: false });
      };

      img.src = url;
    });
  }
}
