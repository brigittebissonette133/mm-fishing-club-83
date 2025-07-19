
import React from 'react';
import { Trophy, Star, MapPin, Fish, Target, Award } from 'lucide-react';
import AchievementHeader from '@/components/achievements/AchievementHeader';
import PersonalBestsSection from '@/components/achievements/PersonalBestsSection';
import ProgressOverview from '@/components/achievements/ProgressOverview';
import QuickStats from '@/components/achievements/QuickStats';
import AchievementsList from '@/components/achievements/AchievementsList';
import MotivationMessage from '@/components/achievements/MotivationMessage';
import TopCatchesList from '@/components/achievements/TopCatchesList';
import { useAchievements } from '@/hooks/useAchievements';

const AchievementsTab = () => {
  const { getCatchHistory } = useAchievements();
  const catchHistory = getCatchHistory();
  const hasCatches = catchHistory.length > 0;

  const achievements = [
    {
      id: 1,
      title: 'First Catch',
      description: 'Catch your first fish',
      icon: Fish,
      unlocked: hasCatches,
      progress: hasCatches ? 100 : 0,
      rarity: 'common',
      unlockedDate: hasCatches ? catchHistory[0]?.date : undefined
    },
    {
      id: 2,
      title: 'Perfect Ten',
      description: 'Catch 10 fish',
      icon: Target,
      unlocked: catchHistory.length >= 10,
      progress: Math.min(100, (catchHistory.length / 10) * 100),
      rarity: 'uncommon',
      target: 10,
      current: catchHistory.length,
      unlockedDate: catchHistory.length >= 10 ? catchHistory[9]?.date : undefined
    },
    {
      id: 3,
      title: 'Species Hunter',
      description: 'Catch 5 different species',
      icon: Award,
      unlocked: false,
      progress: 0,
      rarity: 'rare',
      target: 5,
      current: 0
    },
    {
      id: 4,
      title: 'Location Scout',
      description: 'Fish at 3 different locations',
      icon: MapPin,
      unlocked: false,
      progress: 0,
      rarity: 'uncommon',
      target: 3,
      current: 0
    },
    {
      id: 5,
      title: 'Trophy Hunter',
      description: 'Catch 20 fish',
      icon: Trophy,
      unlocked: catchHistory.length >= 20,
      progress: Math.min(100, (catchHistory.length / 20) * 100),
      rarity: 'rare',
      target: 20,
      current: catchHistory.length
    },
    {
      id: 6,
      title: 'Master Angler',
      description: 'Catch 10 different species',
      icon: Star,
      unlocked: false,
      progress: 0,
      rarity: 'legendary',
      target: 10,
      current: 0
    },
    {
      id: 7,
      title: 'Lake Explorer',
      description: 'Fish at 10 different locations',
      icon: MapPin,
      unlocked: false,
      progress: 0,
      rarity: 'epic',
      target: 10,
      current: 0
    },
    {
      id: 8,
      title: 'Century Club',
      description: 'Catch 100 fish',
      icon: Trophy,
      unlocked: catchHistory.length >= 100,
      progress: Math.min(100, (catchHistory.length / 100) * 100),
      rarity: 'legendary',
      target: 100,
      current: catchHistory.length
    }
  ];

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="p-4 space-y-6">
      <AchievementHeader />
      <PersonalBestsSection />
      <TopCatchesList />
      <ProgressOverview 
        unlockedAchievements={unlockedAchievements} 
        totalAchievements={totalAchievements} 
      />
      <QuickStats unlockedAchievements={unlockedAchievements} />
      <AchievementsList achievements={achievements} />
      <MotivationMessage 
        totalAchievements={totalAchievements} 
        unlockedAchievements={unlockedAchievements} 
      />
    </div>
  );
};

export default AchievementsTab;
