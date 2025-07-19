
import React from 'react';
import { Fish, MapPin, Calendar, Ruler } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAchievements } from '@/hooks/useAchievements';

const TopCatchesList = () => {
  const { getTopCatches } = useAchievements();
  const topCatches = getTopCatches(5);

  if (topCatches.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Fish className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-foreground">Top Catches</h2>
        </div>
        <Card className="p-6 text-center">
          <Fish className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No catches recorded yet</p>
          <p className="text-sm text-muted-foreground mt-1">Start fishing to see your best catches here!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Fish className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-bold text-foreground">Top Catches</h2>
      </div>
      
      <div className="space-y-3">
        {topCatches.map((catch_, index) => (
          <Card key={catch_.id} className="p-4">
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                #{index + 1}
              </div>
              
              {/* Fish Image */}
              {catch_.imageUrl && (
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={catch_.imageUrl} 
                    alt={catch_.species} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Catch Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{catch_.species}</h3>
                  <div className="flex items-center gap-1 text-primary">
                    <Ruler className="w-4 h-4" />
                    <span className="font-bold">{catch_.length}"</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{catch_.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(catch_.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {catch_.weight && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Weight: {catch_.weight} lbs
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopCatchesList;
