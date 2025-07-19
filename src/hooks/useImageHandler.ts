
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SecureFileUpload } from '@/utils/fileUpload';
import { Logger } from '@/utils/logger';

export const useImageHandler = () => {
  const { toast } = useToast();

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isSquare = img.width === img.height;
        resolve(isSquare);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };

  const handlePhotoUpload = async (
    file: File,
    onPhotoUpdate: (photo: string) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
    if (!file) return;

    setIsLoading(true);
    
    try {
      await SecureFileUpload.validateFile(file);
      const isSquare = await validateImageDimensions(file);
      
      if (!isSquare) {
        toast({
          title: "Invalid Image Dimensions",
          description: "Please upload a square image (same width and height).",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Show compression feedback
      toast({
        title: "Processing Image",
        description: "Optimizing your photo...",
        duration: 2000,
      });

      // Process with compression enabled by default
      const processedImage = await SecureFileUpload.processImage(file, {
        compression: {
          enabled: true,
          quality: 0.8, // Higher quality for profile photos
          maxWidth: 1024,
          maxHeight: 1024
        }
      });
      
      onPhotoUpdate(processedImage);
      
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been optimized and updated securely.",
      });
      
      Logger.info('Profile photo updated successfully with compression');
    } catch (error: any) {
      Logger.error('Photo upload failed', { error: error.message });
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePhotoUpload
  };
};
