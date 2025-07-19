
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LureHeaderProps {
  onAddLure: () => void;
}

const LureHeader = ({ onAddLure }: LureHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Lures</h1>
        <p className="text-muted-foreground">Your tackle collection & performance</p>
      </div>
      
      <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onAddLure}>
        <Plus className="w-4 h-4 mr-2" />
        Add Lure
      </Button>
    </div>
  );
};

export default LureHeader;
