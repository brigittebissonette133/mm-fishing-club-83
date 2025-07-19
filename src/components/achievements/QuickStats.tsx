
import React from 'react';
import { GameCard, GameCardContent } from '@/components/ui/game-card';
import { useAchievements } from '@/hooks/useAchievements';

interface QuickStatsProps {
  unlockedAchievements: number;
}

const QuickStats = ({ unlockedAchievements }: QuickStatsProps) => {
  const { getAllPersonalBests, getCatchHistory } = useAchievements();
  const personalBests = getAllPersonalBests();
  const catchHistory = getCatchHistory();

  const stats = [
    { 
      value: unlockedAchievements, 
      label: 'Unlocked', 
      icon: '🏆', 
      color: 'from-yellow-400 to-yellow-600',
      textColor: 'text-yellow-600'
    },
    { 
      value: catchHistory.length > 0 ? 4 : 0, 
      label: 'In Progress', 
      icon: '⏳', 
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600'
    },
    { 
      value: personalBests.filter(pb => pb.value > 0).length, 
      label: 'Records', 
      icon: '📈', 
      color: 'from-green-400 to-green-600',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <GameCard 
          key={stat.label} 
          className="relative overflow-hidden group cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
          
          <GameCardContent className="p-4 text-center relative z-10">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className={`text-2xl font-bold ${stat.textColor} drop-shadow-sm`}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              {stat.label}
            </p>
          </GameCardContent>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </GameCard>
      ))}
    </div>
  );
};

export default QuickStats;
