
import { useState, useEffect } from 'react';
import { SecureStorage } from '@/utils/secureStorage';
import { UserData } from '@/types/userData';
import { defaultUserData } from '@/utils/defaultUserData';
import { useToast } from '@/hooks/use-toast';

export const useDataStorage = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadUserData = async () => {
    try {
      const savedData = SecureStorage.loadFishingData();
      if (savedData && Object.keys(savedData).length > 0) {
        // Ensure lures have proper structure
        const processedLures = (savedData.lures || defaultUserData.lures).map(lure => ({
          ...lure,
          id: lure.id?.toString() || Date.now().toString(),
          catches: lure.catches || [],
          totalCatches: lure.totalCatches || 0,
          timesUsed: lure.timesUsed || 0
        }));

        setUserData({
          ...defaultUserData,
          ...savedData,
          lures: processedLures,
          preferences: {
            ...defaultUserData.preferences,
            ...savedData.preferences
          }
        });
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load your saved data. Using defaults.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = () => {
    try {
      SecureStorage.saveFishingData(userData);
    } catch (error) {
      console.error('Failed to save user data:', error);
      toast({
        title: "Save Error",
        description: "Failed to save your data. Changes may be lost.",
        variant: "destructive",
      });
    }
  };

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...updates
    }));
  };

  return {
    userData,
    isLoading,
    setUserData,
    loadUserData,
    saveUserData,
    updateUserData
  };
};
