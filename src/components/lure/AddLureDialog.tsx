
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddLureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onOpenCamera: () => void;
  newLure: any;
  setNewLure: (lure: any) => void;
  lureTypes: string[];
}

const AddLureDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onOpenCamera, 
  newLure, 
  setNewLure, 
  lureTypes 
}: AddLureDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lure</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Lure Name</label>
            <Input
              type="text"
              placeholder="Enter lure name"
              value={newLure.name}
              onChange={(e) => setNewLure({ ...newLure, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select value={newLure.type} onValueChange={(value) => setNewLure({ ...newLure, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lureTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <Input
              type="text"
              placeholder="Enter color"
              value={newLure.color}
              onChange={(e) => setNewLure({ ...newLure, color: e.target.value })}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={onSave} className="flex-1">
              Save Lure
            </Button>
            <Button 
              onClick={onOpenCamera}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Add Photo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLureDialog;
