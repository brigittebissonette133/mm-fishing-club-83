
import React from 'react';
import { GameCard, GameCardContent } from '@/components/ui/game-card';
import { Progress } from '@/components/ui/progress';
import { Waves, Trophy } from 'lucide-react';

interface ProgressOverviewProps {
  unlockedAchievements: number;
  totalAchievements: number;
}

const ProgressOverview = ({ unlockedAchievements, totalAchievements }: ProgressOverviewProps) => {
  const completionPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);
  const isComplete = completionPercentage >= 100;

  return (
    <GameCard variant="ocean" floating className="relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      {/* Background wave decoration */}
      <div className="absolute top-0 right-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <Waves className="w-16 h-16 text-white animate-pulse" />
      </div>
      
      {/* Success celebration */}
      {isComplete && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
      )}
      
      <GameCardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white drop-shadow-sm">
              🌊 Progress Tide
            </span>
            {isComplete && <Trophy className="w-5 h-5 text-yellow-300 animate-bounce" />}
          </div>
          <span className="text-sm text-white/80 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
            {unlockedAchievements}/{totalAchievements}
          </span>
        </div>
        
        <div className="space-y-3">
          <Progress 
            value={completionPercentage} 
            className="h-4 bg-white/20 border border-white/30" 
            animated={true}
            showPercentage={false}
          />
          
          {/* Progress milestones */}
          <div className="flex justify-between text-xs text-white/70">
            <span>Novice</span>
            <span>Angler</span>
            <span>Expert</span>
            <span className={isComplete ? "text-yellow-300 font-bold" : ""}>Master</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <p className="text-lg font-bold text-white drop-shadow-sm">
            {completionPercentage}% Complete
          </p>
          <div className="text-white/80 text-sm font-medium">
            {isComplete ? (
              <span className="text-yellow-300 animate-pulse">🏆 Master Angler!</span>
            ) : completionPercentage > 75 ? (
              <span>🎣 Almost there!</span>
            ) : completionPercentage > 50 ? (
              <span>🐟 Good progress!</span>
            ) : completionPercentage > 25 ? (
              <span>🌊 Getting started!</span>
            ) : (
              <span>🎯 Begin your journey!</span>
            )}
          </div>
        </div>
      </GameCardContent>
    </GameCard>
  );
};

export default ProgressOverview;
