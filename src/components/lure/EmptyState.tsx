
import React from 'react';
import { Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddLure: () => void;
}

const EmptyState = ({ onAddLure }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
      <h3 className="text-lg font-semibold mb-2">No lures yet</h3>
      <p className="text-muted-foreground mb-4">Start building your tackle collection</p>
      <Button onClick={onAddLure}>
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Lure
      </Button>
    </div>
  );
};

export default EmptyState;
