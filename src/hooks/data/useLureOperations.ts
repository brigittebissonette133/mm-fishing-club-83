
import { UserData } from '@/types/userData';
import { useToast } from '@/hooks/use-toast';

interface UseLureOperationsProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export const useLureOperations = ({ userData, updateUserData }: UseLureOperationsProps) => {
  const { toast } = useToast();

  const addLure = (lureData: any) => {
    const newLure = {
      ...lureData,
      id: Date.now().toString(),
      timesUsed: 0,
      catches: [],
      totalCatches: 0
    };
    
    updateUserData({
      lures: [...userData.lures, newLure]
    });

    toast({
      title: "🎯 Lure Added!",
      description: `${lureData.name} added to your tackle box`,
    });
  };

  return {
    addLure
  };
};
