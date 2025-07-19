
import React from 'react';
import { Package, Fish, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LureCardProps {
  lure: any;
  onAddCatch: (lureId: string) => void;
  onDelete: (lureId: string) => void;
}

const LureCard = ({ lure, onAddCatch, onDelete }: LureCardProps) => {
  const getUniqueSpeciesCount = (catches: any[]) => {
    return catches ? new Set(catches.map(c => c.species)).size : 0;
  };

  const getTotalCatches = (catches: any[]) => {
    return catches ? catches.reduce((sum, c) => sum + c.count, 0) : 0;
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Lure Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center flex-shrink-0">
          {lure.image ? (
            <img src={lure.image} alt={lure.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Package className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        
        {/* Lure Details */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-foreground">{lure.name}</h3>
              <p className="text-sm text-muted-foreground">{lure.type} • {lure.color}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAddCatch(lure.id)}
                className="flex items-center gap-1"
              >
                <Fish className="w-3 h-3" />
                Add Catch
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(lure.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {/* Usage Stats */}
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">
              Used: <span className="font-medium text-foreground">{lure.timesUsed || 0} times</span>
            </span>
            <span className="text-muted-foreground">
              Species: <span className="font-medium text-foreground">{getUniqueSpeciesCount(lure.catches || [])}</span>
            </span>
            <span className="text-muted-foreground">
              Total: <span className="font-medium text-foreground">{getTotalCatches(lure.catches || [])} fish</span>
            </span>
          </div>

          {/* Species Caught */}
          {lure.catches && lure.catches.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Species Caught:</p>
              <div className="flex flex-wrap gap-1">
                {lure.catches.map((catch_, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    {catch_.species} ({catch_.count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LureCard;
