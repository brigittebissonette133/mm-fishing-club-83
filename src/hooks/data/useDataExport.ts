
import { UserData } from '@/types/userData';
import { SecureStorage } from '@/utils/secureStorage';
import { useToast } from '@/hooks/use-toast';
import { defaultUserData } from '@/utils/defaultUserData';

interface UseDataExportProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export const useDataExport = ({ userData, updateUserData }: UseDataExportProps) => {
  const { toast } = useToast();

  const clearAllData = () => {
    updateUserData(defaultUserData);
    SecureStorage.clear();
    toast({
      title: "Data Cleared",
      description: "All your fishing data has been reset",
    });
  };

  const exportData = () => {
    try {
      const dataBlob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fishing-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported",
        description: "Your fishing data has been downloaded",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export your data",
        variant: "destructive",
      });
    }
  };

  return {
    clearAllData,
    exportData
  };
};
