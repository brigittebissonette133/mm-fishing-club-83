
import React from 'react';
import { MapPin, Fish } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FishingSpotsSection = () => {
  const previousCatches = [
    { id: 1, lat: 43.6532, lng: -79.3832, species: 'Largemouth Bass', date: '2024-01-15', location: 'Lake Ontario' },
    { id: 2, lat: 44.2619, lng: -76.5197, species: 'Northern Pike', date: '2024-01-10', location: 'Kingston Lake' },
    { id: 3, lat: 46.3014, lng: -84.1694, species: 'Walleye', date: '2024-01-05', location: 'Lake Superior' },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Your Fishing Spots</h2>
        </div>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 border-2 border-blue-200 h-64 mb-6">
          <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
            {/* Simplified Ontario lakes */}
            <ellipse cx="80" cy="200" rx="30" ry="15" fill="hsl(var(--water-blue))" opacity="0.6" />
            <ellipse cx="150" cy="180" rx="25" ry="12" fill="hsl(var(--water-blue))" opacity="0.6" />
            <ellipse cx="220" cy="160" rx="35" ry="18" fill="hsl(var(--water-blue))" opacity="0.6" />
            <ellipse cx="300" cy="120" rx="40" ry="20" fill="hsl(var(--water-blue))" opacity="0.6" />
          </svg>

          {/* Catch pins */}
          {previousCatches.map((catchItem, index) => (
            <div
              key={catchItem.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 20}%`,
              }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <Fish className="w-3 h-3 text-white" />
              </div>
            </div>
          ))}
        </Card>

        {/* Recent catches list */}
        <div className="space-y-3">
          {previousCatches.slice(0, 2).map((catchItem) => (
            <Card key={catchItem.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                  <Fish className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{catchItem.species}</p>
                  <p className="text-sm text-muted-foreground">{catchItem.location} • {catchItem.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FishingSpotsSection;
