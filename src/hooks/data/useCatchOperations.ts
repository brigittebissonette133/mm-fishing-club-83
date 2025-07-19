
import { UserData } from '@/types/userData';
import { useToast } from '@/hooks/use-toast';

interface UseCatchOperationsProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export const useCatchOperations = ({ userData, updateUserData }: UseCatchOperationsProps) => {
  const { toast } = useToast();

  const addCatch = (catchData: any) => {
    const newCatch = {
      ...catchData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    updateUserData({
      catches: [newCatch, ...userData.catches],
      profile: {
        ...userData.profile,
        totalCatches: userData.profile.totalCatches + 1,
        experience: userData.profile.experience + 10
      }
    });

    toast({
      title: "🎣 Catch Logged!",
      description: `Added ${catchData.species} to your collection`,
    });
  };

  const updatePersonalBest = (bestData: any) => {
    const existingIndex = userData.personalBests.findIndex(pb => pb.type === bestData.type);
    const newBests = [...userData.personalBests];
    
    if (existingIndex >= 0) {
      newBests[existingIndex] = bestData;
    } else {
      newBests.push(bestData);
    }
    
    updateUserData({
      personalBests: newBests
    });
  };

  return {
    addCatch,
    updatePersonalBest
  };
};
