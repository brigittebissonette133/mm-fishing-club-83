
import React from 'react';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FishingConditionsSection = () => {
  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Fishing Conditions</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Best Time</p>
            <p className="font-semibold text-foreground">Dawn & Dusk</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-muted-foreground">Water Temp</p>
            <p className="font-semibold text-foreground">18°C</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FishingConditionsSection;
