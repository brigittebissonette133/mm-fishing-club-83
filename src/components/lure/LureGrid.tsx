
import React from 'react';
import LureCard from './LureCard';

interface LureGridProps {
  lures: any[];
  onAddCatch: (lureId: string) => void;
  onDelete: (lureId: string) => void;
}

const LureGrid = ({ lures, onAddCatch, onDelete }: LureGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {lures.map((lure) => (
        <LureCard
          key={lure.id}
          lure={lure}
          onAddCatch={onAddCatch}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LureGrid;
