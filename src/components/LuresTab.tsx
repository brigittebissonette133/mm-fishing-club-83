
import React, { useState } from 'react';
import { useDataPersistence } from '@/hooks/useDataPersistence';
import { useToast } from '@/hooks/use-toast';
import LureCameraCapture from './lure/LureCameraCapture';
import LureHeader from './lure/LureHeader';
import LureStats from './lure/LureStats';
import LureGrid from './lure/LureGrid';
import AddLureDialog from './lure/AddLureDialog';
import AddCatchDialog from './lure/AddCatchDialog';
import EmptyState from './lure/EmptyState';

const LuresTab = () => {
  const { userData, updateUserData } = useDataPersistence();
  const { toast } = useToast();
  const [showAddLure, setShowAddLure] = useState(false);
  const [showAddCatch, setShowAddCatch] = useState(false);
  const [showLureCamera, setShowLureCamera] = useState(false);
  const [selectedLureId, setSelectedLureId] = useState<string | null>(null);
  const [newLure, setNewLure] = useState({
    name: '',
    type: 'Spinnerbait',
    color: '',
    image: null
  });
  const [newCatch, setNewCatch] = useState({
    species: '',
    notes: ''
  });

  const lureTypes = ['Spinnerbait', 'Jig', 'Crankbait', 'Soft Bait', 'Topwater', 'Spoon', 'Fly'];
  
  const commonFishSpecies = [
    'Bass', 'Pike', 'Trout', 'Salmon', 'Perch', 'Walleye', 'Catfish', 'Bluegill', 
    'Crappie', 'Muskie', 'Carp', 'Striped Bass', 'Snook', 'Redfish', 'Tarpon'
  ];

  const handleAddLure = () => {
    if (!newLure.name.trim() || !newLure.color.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in lure name and color",
        variant: "destructive",
      });
      return;
    }

    const lureData = {
      ...newLure,
      id: Date.now().toString(),
      timesUsed: 0,
      catches: [],
      totalCatches: 0
    };

    updateUserData({
      lures: [...userData.lures, lureData]
    });

    setNewLure({ name: '', type: 'Spinnerbait', color: '', image: null });
    setShowAddLure(false);

    toast({
      title: "🎯 Lure Added!",
      description: `${lureData.name} added to your tackle box`,
    });
  };

  const handleLurePhotoSaved = (imageDataUrl: string) => {
    if (!newLure.name.trim() || !newLure.color.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in lure name and color first",
        variant: "destructive",
      });
      setShowLureCamera(false);
      return;
    }

    const lureData = {
      ...newLure,
      id: Date.now().toString(),
      timesUsed: 0,
      catches: [],
      totalCatches: 0,
      image: imageDataUrl
    };

    updateUserData({
      lures: [...userData.lures, lureData]
    });

    setNewLure({ name: '', type: 'Spinnerbait', color: '', image: null });
    setShowLureCamera(false);
    setShowAddLure(false);

    toast({
      title: "🎯 Lure Added with Photo!",
      description: `${lureData.name} added to your tackle box`,
    });
  };

  const handleAddCatchToLure = () => {
    if (!newCatch.species.trim() || !selectedLureId) {
      toast({
        title: "Missing Information",
        description: "Please select a fish species",
        variant: "destructive",
      });
      return;
    }

    const updatedLures = userData.lures.map(lure => {
      if (lure.id === selectedLureId) {
        const updatedCatches = lure.catches || [];
        const existingSpeciesIndex = updatedCatches.findIndex(c => c.species === newCatch.species);
        
        if (existingSpeciesIndex >= 0) {
          updatedCatches[existingSpeciesIndex].count += 1;
          if (newCatch.notes) {
            updatedCatches[existingSpeciesIndex].notes = newCatch.notes;
          }
        } else {
          updatedCatches.push({
            species: newCatch.species,
            count: 1,
            notes: newCatch.notes,
            dateAdded: new Date().toISOString()
          });
        }

        return {
          ...lure,
          catches: updatedCatches,
          totalCatches: (lure.totalCatches || 0) + 1,
          timesUsed: (lure.timesUsed || 0) + 1
        };
      }
      return lure;
    });

    updateUserData({ lures: updatedLures });

    setNewCatch({ species: '', notes: '' });
    setSelectedLureId(null);
    setShowAddCatch(false);

    toast({
      title: "🐟 Catch Added!",
      description: `${newCatch.species} logged for this lure`,
    });
  };

  const openAddCatchDialog = (lureId: string) => {
    setSelectedLureId(lureId);
    setShowAddCatch(true);
  };

  const deleteLure = (lureId: string) => {
    const updatedLures = userData.lures.filter(lure => lure.id !== lureId);
    updateUserData({ lures: updatedLures });
    
    toast({
      title: "Lure Deleted",
      description: "Lure removed from your tackle box",
    });
  };

  const getTotalCatches = (catches: any[]) => {
    return catches ? catches.reduce((sum, c) => sum + c.count, 0) : 0;
  };

  const handleOpenCamera = () => {
    if (!newLure.name.trim() || !newLure.color.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in lure name and color first",
        variant: "destructive",
      });
      return;
    }
    setShowLureCamera(true);
  };

  if (showLureCamera) {
    return <LureCameraCapture onClose={() => setShowLureCamera(false)} onPhotoSaved={handleLurePhotoSaved} />;
  }

  // Calculate stats
  const totalLures = userData.lures.length;
  const totalTypes = new Set(userData.lures.map(l => l.type)).size;
  const totalCatches = userData.lures.reduce((sum, l) => sum + getTotalCatches(l.catches || []), 0);

  return (
    <div className="p-4 space-y-4">
      <LureHeader onAddLure={() => setShowAddLure(true)} />
      
      <LureStats 
        totalLures={totalLures}
        totalTypes={totalTypes}
        totalCatches={totalCatches}
      />

      {userData.lures.length > 0 ? (
        <LureGrid 
          lures={userData.lures}
          onAddCatch={openAddCatchDialog}
          onDelete={deleteLure}
        />
      ) : (
        <EmptyState onAddLure={() => setShowAddLure(true)} />
      )}

      <AddLureDialog
        isOpen={showAddLure}
        onClose={() => setShowAddLure(false)}
        onSave={handleAddLure}
        onOpenCamera={handleOpenCamera}
        newLure={newLure}
        setNewLure={setNewLure}
        lureTypes={lureTypes}
      />

      <AddCatchDialog
        isOpen={showAddCatch}
        onClose={() => setShowAddCatch(false)}
        onSave={handleAddCatchToLure}
        newCatch={newCatch}
        setNewCatch={setNewCatch}
        commonFishSpecies={commonFishSpecies}
      />
    </div>
  );
};

export default LuresTab;
