
import { useState } from 'react';
import { CatchRecordService } from '@/services/catchRecordService';
import { useDataPersistence } from '@/hooks/useDataPersistence';

interface UseSaveCatchOptions {
  fishData: any;
  locationData: any;
  capturedImage: string | null;
  analysisError?: string | null;
  setIsSaving: (saving: boolean) => void;
  toast: any;
  onClose: () => void;
}

export const useSaveCatch = (options: UseSaveCatchOptions) => {
  const [showLureSelection, setShowLureSelection] = useState(false);
  const { userData, updateUserData } = useDataPersistence();
  
  const {
    fishData,
    locationData,
    capturedImage,
    analysisError,
    setIsSaving,
    toast,
    onClose
  } = options;

  const handleSave = () => {
    console.log('Save catch initiated', { fishData: !!fishData, capturedImage: !!capturedImage });
    
    if (!capturedImage) {
      toast({
        title: "No Image",
        description: "Please capture an image first",
        variant: "destructive"
      });
      return;
    }

    // Show lure selection dialog
    setShowLureSelection(true);
  };

  const handleLureSelected = async (lureId: string, lureName: string) => {
    try {
      setIsSaving(true);
      setShowLureSelection(false);

      // Prepare catch data
      const catchData = {
        species: fishData?.species || 'Unknown Fish',
        size: fishData?.size || 'Unknown',
        weight: fishData?.weight || 'Unknown',
        location: locationData?.name || 'Unknown Location',
        image: capturedImage,
        lureUsed: lureName,
        lureId: lureId,
        date: new Date().toISOString(),
        notes: analysisError ? 'Manual entry - AI analysis failed' : ''
      };

      console.log('Saving catch with lure:', { species: catchData.species, lure: lureName });

      if (fishData && !analysisError) {
        // Use the full service for AI-analyzed catches - provide complete FishIdentificationResult
        const result = await CatchRecordService.saveCatch({
          fishData: {
            species: fishData.species,
            size: fishData.size,
            weight: fishData.weight,
            confidence: fishData.confidence || 95,
            rarity: fishData.rarity || 'common',
            habitat: fishData.habitat || ['Unknown'],
            scientificName: fishData.scientificName || 'Unknown'
          },
          locationData,
          imageDataUrl: capturedImage
        });

        if (result.success) {
          // Update the catch record with lure information
          const updatedCatches = userData.catches.map(c => 
            c.id === result.catchRecord.id 
              ? { ...c, lureUsed: lureName, lureId: lureId }
              : c
          );
          updateUserData({ catches: updatedCatches });
        }
      } else {
        // Manual save for failed analysis or manual entries
        updateUserData({
          catches: [
            {
              ...catchData,
              id: Date.now().toString()
            },
            ...userData.catches
          ]
        });
      }

      // Update lure usage statistics if a lure was selected
      if (lureId) {
        const updatedLures = userData.lures.map(lure => {
          if (lure.id === lureId) {
            const updatedCatches = lure.catches || [];
            const species = fishData?.species || 'Unknown Fish';
            const existingSpeciesIndex = updatedCatches.findIndex(c => c.species === species);
            
            if (existingSpeciesIndex >= 0) {
              updatedCatches[existingSpeciesIndex].count += 1;
            } else {
              updatedCatches.push({
                species: species,
                count: 1,
                notes: '',
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
      }

      toast({
        title: "🎣 Catch Saved!",
        description: `Your catch has been logged${lureName !== 'No lure specified' ? ` with ${lureName}` : ''}`,
      });

      onClose();

    } catch (error: any) {
      console.error('Failed to save catch:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save your catch. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSave,
    showLureSelection,
    setShowLureSelection,
    handleLureSelected
  };
};
