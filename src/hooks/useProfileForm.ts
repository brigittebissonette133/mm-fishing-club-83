
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useImageHandler } from './useImageHandler';
import { useProfileData } from './useProfileData';
import { validateProfileForm } from '@/utils/profileValidation';
import { Logger } from '@/utils/logger';

export const useProfileForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    formData,
    isProfileSaved,
    updateFormData,
    saveProfile,
    savePassword
  } = useProfileData();

  const { handlePhotoUpload: handleImageUpload } = useImageHandler();

  const handleInputChange = (field: string, value: string) => {
    updateFormData(field, value);
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await handleImageUpload(
      file,
      (photo: string) => updateFormData('profilePhoto', photo),
      setIsLoading
    );
  };

  const removePhoto = () => {
    updateFormData('profilePhoto', null);
    toast({
      title: "Photo Removed",
      description: "Your profile photo has been removed.",
    });
    Logger.info('Profile photo removed');
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const validatedData = validateProfileForm(formData);
      
      const profileData = {
        name: validatedData.name,
        username: validatedData.username,
        email: validatedData.email,
        profilePhoto: formData.profilePhoto || undefined
      };
      
      saveProfile(profileData);
      
      if (validatedData.password) {
        savePassword(validatedData.password);
      }
      
      toast({
        title: "Profile Saved",
        description: "Your account information has been saved securely!",
      });
      
      Logger.info('Profile saved successfully', { 
        username: validatedData.username,
        email: validatedData.email 
      });
      
    } catch (error: any) {
      Logger.error('Profile save failed', { error: error.message });
      
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path && err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Save Failed",
          description: error.message || "Failed to save profile. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    isProfileSaved,
    handleInputChange,
    handlePhotoUpload,
    removePhoto,
    handleSave
  };
};
