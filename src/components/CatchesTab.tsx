
import React, { useState } from 'react';
import { Fish, Calendar, MapPin, Ruler } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CatchesTab = () => {
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  const ontarioFishSpecies = [
    'Bass', 'Pike', 'Walleye', 'Trout', 'Perch', 'Salmon', 'Muskie', 'Catfish'
  ];

  const mockCatches = [
    {
      id: 1,
      species: 'Largemouth Bass',
      size: '14.5"',
      weight: '2.3 lbs',
      location: 'Lake Ontario',
      date: '2024-01-15',
      image: '/lovable-uploads/f7bda583-8d3f-49a0-b428-39efe55069c7.png',
      lure: 'Spinnerbait'
    },
    {
      id: 2,
      species: 'Northern Pike',
      size: '22.0"',
      weight: '4.1 lbs',
      location: 'Lake Simcoe',
      date: '2024-01-10',
      image: '/lovable-uploads/f7bda583-8d3f-49a0-b428-39efe55069c7.png',
      lure: 'Jig'
    },
    {
      id: 3,
      species: 'Walleye',
      size: '16.8"',
      weight: '2.8 lbs',
      location: 'Lake Erie',
      date: '2024-01-08',
      image: '/lovable-uploads/f7bda583-8d3f-49a0-b428-39efe55069c7.png',
      lure: 'Crankbait'
    }
  ];

  const filteredCatches = selectedSpecies === 'all' 
    ? mockCatches 
    : mockCatches.filter(catch_ => 
        catch_.species.toLowerCase().includes(selectedSpecies.toLowerCase())
      );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">My Catches</h1>
        <p className="text-muted-foreground">Your fishing journal</p>
      </div>

      {/* Species Filter Tabs */}
      <Tabs value={selectedSpecies} onValueChange={setSelectedSpecies} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          <TabsTrigger value="bass" className="text-xs">Bass</TabsTrigger>
          <TabsTrigger value="pike" className="text-xs">Pike</TabsTrigger>
          <TabsTrigger value="walleye" className="text-xs">Walleye</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSpecies} className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-3 text-center">
              <p className="text-lg font-bold text-primary">{filteredCatches.length}</p>
              <p className="text-xs text-muted-foreground">Catches</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-lg font-bold text-accent">22.0"</p>
              <p className="text-xs text-muted-foreground">Biggest</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-lg font-bold text-secondary-foreground">3</p>
              <p className="text-xs text-muted-foreground">Spots</p>
            </Card>
          </div>

          {/* Catches List */}
          <div className="space-y-4">
            {filteredCatches.map((catch_) => (
              <Card key={catch_.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  {/* Fish Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <Fish className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  {/* Catch Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-foreground">{catch_.species}</h3>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(catch_.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Ruler className="w-3 h-3" />
                        {catch_.size}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{catch_.weight}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {catch_.location}
                      </span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {catch_.lure}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredCatches.length === 0 && (
            <div className="text-center py-8">
              <Fish className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No catches found for this species</p>
              <p className="text-sm text-muted-foreground mt-1">Go fishing and start building your collection!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CatchesTab;
