
import React from 'react';
import { Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  rarity: string;
  unlockedDate?: string;
  target?: number;
  current?: number;
}

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList = ({ achievements }: AchievementsListProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'uncommon': return 'text-green-600 bg-green-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-3">
      {achievements.map((achievement) => {
        const Icon = achievement.icon;
        const isUnlocked = achievement.unlocked;
        
        return (
          <Card 
            key={achievement.id} 
            className={`p-4 transition-all duration-200 ${
              isUnlocked ? 'bg-card' : 'bg-muted/30'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Achievement Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isUnlocked 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              
              {/* Achievement Details */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${
                    isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </span>
                </div>
                
                <p className={`text-sm ${
                  isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {achievement.description}
                </p>
                
                {/* Progress Bar for Locked Achievements */}
                {!isUnlocked && achievement.target && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {achievement.current}/{achievement.target}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {achievement.progress}%
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}
                
                {/* Unlock Date for Completed Achievements */}
                {isUnlocked && achievement.unlockedDate && (
                  <p className="text-xs text-muted-foreground">
                    Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Achievement Status */}
              {isUnlocked && (
                <div className="text-green-600">
                  <Trophy className="w-5 h-5" />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AchievementsList;
