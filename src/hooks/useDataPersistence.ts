
import { useEffect } from 'react';
import { UserData } from '@/types/userData';
import { useDataStorage } from '@/hooks/data/useDataStorage';
import { useCatchOperations } from '@/hooks/data/useCatchOperations';
import { useLureOperations } from '@/hooks/data/useLureOperations';
import { useDataExport } from '@/hooks/data/useDataExport';

export const useDataPersistence = () => {
  const { 
    userData, 
    isLoading, 
    loadUserData, 
    saveUserData, 
    updateUserData 
  } = useDataStorage();

  const { addCatch, updatePersonalBest } = useCatchOperations({ 
    userData, 
    updateUserData 
  });

  const { addLure } = useLureOperations({ 
    userData, 
    updateUserData 
  });

  const { clearAllData, exportData } = useDataExport({ 
    userData, 
    updateUserData 
  });

  // Load data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Auto-save when data changes (with debounce)
  useEffect(() => {
    if (!isLoading && userData.preferences.autoSave) {
      const timeoutId = setTimeout(() => {
        saveUserData();
      }, 1000); // Debounce saves by 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [userData, isLoading]);

  return {
    userData,
    isLoading,
    updateUserData,
    addCatch,
    addLure,
    updatePersonalBest,
    saveUserData,
    loadUserData,
    clearAllData,
    exportData
  };
};

export type { UserData };
