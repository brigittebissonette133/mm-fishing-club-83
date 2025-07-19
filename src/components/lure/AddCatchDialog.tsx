
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddCatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  newCatch: any;
  setNewCatch: (catch_: any) => void;
  commonFishSpecies: string[];
}

const AddCatchDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  newCatch, 
  setNewCatch, 
  commonFishSpecies 
}: AddCatchDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Catch to Lure</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fish Species</label>
            <Select value={newCatch.species} onValueChange={(value) => setNewCatch({ ...newCatch, species: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select fish species" />
              </SelectTrigger>
              <SelectContent>
                {commonFishSpecies.map(species => (
                  <SelectItem key={species} value={species}>{species}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Input
              type="text"
              placeholder="Size, location, conditions..."
              value={newCatch.notes}
              onChange={(e) => setNewCatch({ ...newCatch, notes: e.target.value })}
            />
          </div>
          
          <Button onClick={onSave} className="w-full">
            Add Catch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCatchDialog;
