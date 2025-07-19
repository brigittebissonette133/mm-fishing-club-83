
import React from 'react';
import { MapPin, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FishIdentificationResult, LocationData } from '@/services/fishIdentificationService';

interface CapturedImageProps {
  capturedImage: string;
  fishData: FishIdentificationResult | null;
  locationData: LocationData | null;
  isAnalyzing: boolean;
}

const CapturedImage = ({ capturedImage, fishData, locationData, isAnalyzing }: CapturedImageProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'epic':
      case 'legendary':
        return <Star className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 relative">
      <img
        src={capturedImage}
        alt="Captured fish"
        className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
      />
      
      {/* AI Analysis Results */}
      {fishData && !isAnalyzing && (
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="p-4 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur border-blue-200 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">
                  AI Confidence: {fishData.confidence}%
                </span>
              </div>
              <Badge className={`${getRarityColor(fishData.rarity)} text-white text-xs flex items-center gap-1`}>
                {getRarityIcon(fishData.rarity)}
                {fishData.rarity.charAt(0).toUpperCase() + fishData.rarity.slice(1)}
              </Badge>
            </div>
            
            <div className="mb-3">
              <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                🐟 {fishData.species}
              </h3>
              <p className="text-sm text-muted-foreground italic">
                {fishData.scientificName}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <p className="text-muted-foreground">Length</p>
                <p className="font-semibold text-lg">📏 {fishData.size}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Weight</p>
                <p className="font-semibold text-lg">⚖️ {fishData.weight}</p>
              </div>
            </div>

            <div className="border-t pt-3 mb-3">
              <p className="text-muted-foreground text-xs mb-1">Habitat</p>
              <div className="flex flex-wrap gap-1">
                {fishData.habitat.map((habitat, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {habitat}
                  </Badge>
                ))}
              </div>
            </div>

            {locationData && (
              <div className="border-t pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600">Location Detected</span>
                </div>
                <p className="font-semibold">{locationData.name}</p>
                <p className="text-sm text-muted-foreground">{locationData.coordinates}</p>
                {locationData.province && (
                  <p className="text-xs text-muted-foreground">
                    {locationData.province}, {locationData.country}
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default CapturedImage;
