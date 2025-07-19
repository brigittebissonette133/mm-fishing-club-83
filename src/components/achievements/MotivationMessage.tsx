
import React from 'react';
import { Star, Fish } from 'lucide-react';
import { GameCard, GameCardContent } from '@/components/ui/game-card';

interface MotivationMessageProps {
  totalAchievements: number;
  unlockedAchievements: number;
}

const MotivationMessage = ({ totalAchievements, unlockedAchievements }: MotivationMessageProps) => {
  const remaining = totalAchievements - unlockedAchievements;
  
  return (
    <GameCard variant="forest" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-2 right-2 opacity-30">
        <Fish className="w-8 h-8 text-white float-animation" />
      </div>
      <div className="absolute bottom-2 left-2 opacity-20">
        <Star className="w-6 h-6 text-white" style={{ animationDelay: '1s' }} />
      </div>
      
      <GameCardContent className="p-6 text-center relative z-10">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Star className="w-6 h-6 text-white animate-pulse" />
          </div>
        </div>
        
        <h3 className="font-bold text-white text-lg mb-2 drop-shadow-sm">
          🎣 Keep Casting!
        </h3>
        <p className="text-white/90 text-sm font-medium">
          You're making waves! Only <span className="font-bold text-yellow-300">{remaining}</span> more achievements to unlock.
        </p>
        
        {/* Progress indicator */}
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < Math.min(5, Math.ceil((unlockedAchievements / totalAchievements) * 5))
                  ? 'bg-yellow-300 shadow-sm'
                  : 'bg-white/30'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </GameCardContent>
    </GameCard>
  );
};

export default MotivationMessage;
