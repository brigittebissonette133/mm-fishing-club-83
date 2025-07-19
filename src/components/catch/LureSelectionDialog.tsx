
import React, { useState } from 'react';
import { Package, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDataPersistence } from '@/hooks/useDataPersistence';

interface LureSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLureSelected: (lureId: string, lureName: string) => void;
}

const LureSelectionDialog = ({ isOpen, onClose, onLureSelected }: LureSelectionDialogProps) => {
  const { userData } = useDataPersistence();
  const [selectedLureId, setSelectedLureId] = useState<string | null>(null);

  const handleLureSelect = (lureId: string, lureName: string) => {
    setSelectedLureId(lureId);
    onLureSelected(lureId, lureName);
    setSelectedLureId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Which lure did you use?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {userData.lures.length > 0 ? (
            userData.lures.map((lure) => (
              <Card 
                key={lure.id} 
                className="p-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-muted/50"
                onClick={() => handleLureSelect(lure.id, lure.name)}
              >
                <div className="flex items-center gap-3">
                  {/* Lure Image */}
                  <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {lure.image ? (
                      <img src={lure.image} alt={lure.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Package className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Lure Details */}
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{lure.name}</h4>
                    <p className="text-sm text-muted-foreground">{lure.type} • {lure.color}</p>
                  </div>
                  
                  {/* Select indicator */}
                  <div className="w-6 h-6 rounded-full border-2 border-primary/30 flex items-center justify-center">
                    {selectedLureId === lure.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No lures in your tackle box yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add some lures first!</p>
            </div>
          )}
          
          {/* Skip option */}
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              onLureSelected('', 'No lure specified');
              onClose();
            }}
          >
            Skip - No specific lure
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LureSelectionDialog;
