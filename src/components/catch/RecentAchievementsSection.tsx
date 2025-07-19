
import React from 'react';
import { Trophy, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const RecentAchievementsSection = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Recent Achievements</h2>
        </div>

        <div className="space-y-4">
          <Card className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50/50">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-semibold text-foreground">First Bass!</p>
                <p className="text-sm text-muted-foreground">Caught your first Largemouth Bass</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50/50">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-semibold text-foreground">Explorer</p>
                <p className="text-sm text-muted-foreground">Fished at 3 different locations</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecentAchievementsSection;
