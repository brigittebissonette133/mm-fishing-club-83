
import React from 'react';
import { Trophy, Ruler, Fish, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAchievements } from '@/hooks/useAchievements';

const PersonalBestsSection = () => {
  const { getAllPersonalBests } = useAchievements();
  const personalBests = getAllPersonalBests();

  const getPersonalBestIcon = (type: string) => {
    switch (type) {
      case 'longest_fish': return Ruler;
      case 'most_fish_day': return Fish;
      case 'most_species_day': return Target;
      case 'most_lures_lost_day': return Zap;
      default: return Trophy;
    }
  };

  const getPersonalBestColor = (type: string) => {
    switch (type) {
      case 'longest_fish': return 'from-blue-50 to-blue-100 border-blue-200';
      case 'most_fish_day': return 'from-green-50 to-green-100 border-green-200';
      case 'most_species_day': return 'from-purple-50 to-purple-100 border-purple-200';
      case 'most_lures_lost_day': return 'from-red-50 to-red-100 border-red-200';
      default: return 'from-yellow-50 to-orange-50 border-yellow-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-yellow-600" />
        <h2 className="text-lg font-bold text-foreground">Personal Bests</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalBests.map((best) => {
          const Icon = getPersonalBestIcon(best.type);
          const hasRecord = best.value > 0;
          
          return (
            <Card 
              key={best.id} 
              className={`p-4 bg-gradient-to-r ${getPersonalBestColor(best.type)}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{best.title}</h3>
                  {hasRecord ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">{best.value}</span>
                        <span className="text-sm text-muted-foreground">{best.unit}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {best.details}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(best.date).toLocaleDateString()}
                      </p>
                      {best.location && (
                        <p className="text-xs text-muted-foreground">
                          📍 {best.location}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No record yet</p>
                  )}
                </div>
                {hasRecord && best.fishImage && best.type === 'longest_fish' && (
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/20">
                    <img 
                      src={best.fishImage} 
                      alt={best.species || 'Fish'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {hasRecord && (
                  <Trophy className="w-5 h-5 text-yellow-600" />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalBestsSection;
