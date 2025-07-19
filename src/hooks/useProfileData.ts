
import { useState, useEffect } from 'react';
import { SecureStorage } from '@/utils/secureStorage';

interface UserProfile {
  name: string;
  username: string;
  email: string;
  profilePhoto?: string;
}

interface LoginInfo {
  name?: string;
  email?: string;
}

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePhoto: string | null;
}

export const useProfileData = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    profilePhoto: null
  });
  const [isProfileSaved, setIsProfileSaved] = useState<boolean>(false);

  useEffect(() => {
    const loadProfileData = (): void => {
      const savedProfile = SecureStorage.getItem<UserProfile>('user_profile');
      const loginInfo = SecureStorage.getItem<LoginInfo>('user_login');
      
      if (savedProfile) {
        setFormData(prev => ({
          ...prev,
          name: savedProfile.name || '',
          username: savedProfile.username || '',
          email: savedProfile.email || '',
          profilePhoto: savedProfile.profilePhoto || null
        }));
        setIsProfileSaved(true);
      } else if (loginInfo) {
        setFormData(prev => ({
          ...prev,
          name: loginInfo.name || '',
          email: loginInfo.email || ''
        }));
      }
    };

    loadProfileData();
  }, []);

  const updateFormData = (field: string, value: string | null): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = (profileData: UserProfile): void => {
    SecureStorage.setItem('user_profile', profileData);
    setIsProfileSaved(true);
    window.dispatchEvent(new CustomEvent('profileUpdated'));
  };

  // Note: Password saving removed for security - this is demo only
  const savePassword = (password: string): void => {
    console.warn('🔒 SECURITY: Password saving disabled in demo mode for security');
    // Passwords should never be stored client-side in production
  };

  return {
    formData,
    isProfileSaved,
    updateFormData,
    saveProfile,
    savePassword
  };
};
