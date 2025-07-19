
import React from 'react';
import { Card } from '@/components/ui/card';

interface LureStatsProps {
  totalLures: number;
  totalTypes: number;
  totalCatches: number;
}

const LureStats = ({ totalLures, totalTypes, totalCatches }: LureStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-3 text-center">
        <p className="text-lg font-bold text-primary">{totalLures}</p>
        <p className="text-xs text-muted-foreground">Total Lures</p>
      </Card>
      <Card className="p-3 text-center">
        <p className="text-lg font-bold text-accent">{totalTypes}</p>
        <p className="text-xs text-muted-foreground">Types</p>
      </Card>
      <Card className="p-3 text-center">
        <p className="text-lg font-bold text-secondary-foreground">{totalCatches}</p>
        <p className="text-xs text-muted-foreground">Total Catches</p>
      </Card>
    </div>
  );
};

export default LureStats;
