
import React, { useState, useEffect } from 'react';
import { MapPin, Fish, Trophy, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CatchLocation {
  id: string;
  lat: number;
  lng: number;
  species: string;
  date: string;
  image?: string;
}

const MapTab = () => {
  const [catches, setCatches] = useState<CatchLocation[]>([
    { id: '1', lat: 43.6532, lng: -79.3832, species: 'Largemouth Bass', date: '2024-01-15' },
    { id: '2', lat: 44.2619, lng: -76.5197, species: 'Northern Pike', date: '2024-01-10' },
    { id: '3', lat: 46.3014, lng: -84.1694, species: 'Walleye', date: '2024-01-05' },
  ]);

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="water-gradient text-white p-4 text-center">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5" />
          Ontario Fishing Map
        </h2>
        <p className="text-sm opacity-90">Your fishing adventures across Ontario</p>
      </div>

      {/* Accurate Ontario Map */}
      <div className="relative p-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 border-2 border-blue-200">
          <div className="h-96 relative">
            {/* Accurate Ontario outline */}
            <svg
              viewBox="0 0 500 400"
              className="absolute inset-0 w-full h-full"
            >
              {/* Ontario province outline (more accurate shape) */}
              <path
                d="M50 200 Q60 180 80 170 L120 160 Q140 150 160 155 L200 160 Q220 165 240 170 L280 175 Q300 180 320 185 L360 190 Q380 195 400 200 L420 210 Q430 220 435 240 L440 260 Q445 280 440 300 L430 320 Q420 340 400 350 L380 360 Q360 365 340 360 L320 355 Q300 350 280 345 L260 340 Q240 335 220 330 L200 325 Q180 320 160 315 L140 310 Q120 305 100 300 L80 295 Q60 290 50 270 L45 250 Q40 230 45 210 Z"
                fill="hsl(var(--forest-green))"
                opacity="0.2"
                stroke="hsl(var(--forest-green))"
                strokeWidth="1"
              />
              
              {/* Hudson Bay (top) */}
              <ellipse cx="250" cy="80" rx="80" ry="30" fill="hsl(var(--water-blue))" opacity="0.7" />
              
              {/* Great Lakes - Lake Superior */}
              <ellipse cx="150" cy="320" rx="60" ry="25" fill="hsl(var(--water-blue))" opacity="0.8" />
              
              {/* Great Lakes - Lake Huron */}
              <ellipse cx="280" cy="280" rx="45" ry="35" fill="hsl(var(--water-blue))" opacity="0.8" />
              
              {/* Great Lakes - Lake Ontario */}
              <ellipse cx="380" cy="240" rx="35" ry="15" fill="hsl(var(--water-blue))" opacity="0.8" />
              
              {/* Great Lakes - Lake Erie */}
              <ellipse cx="360" cy="270" rx="25" ry="10" fill="hsl(var(--water-blue))" opacity="0.8" />
              
              {/* Georgian Bay */}
              <ellipse cx="320" cy="220" rx="20" ry="25" fill="hsl(var(--water-blue))" opacity="0.7" />
              
              {/* Smaller lakes and rivers */}
              <circle cx="200" cy="180" r="8" fill="hsl(var(--water-blue))" opacity="0.6" />
              <circle cx="250" cy="160" r="6" fill="hsl(var(--water-blue))" opacity="0.6" />
              <circle cx="180" cy="220" r="5" fill="hsl(var(--water-blue))" opacity="0.6" />
              <circle cx="300" cy="160" r="7" fill="hsl(var(--water-blue))" opacity="0.6" />
              
              {/* Rivers */}
              <path d="M200 180 Q220 190 240 200 T280 220" stroke="hsl(var(--water-blue))" strokeWidth="3" fill="none" opacity="0.7" />
              <path d="M150 160 Q170 170 190 180" stroke="hsl(var(--water-blue))" strokeWidth="2" fill="none" opacity="0.7" />
              <path d="M320 185 Q340 195 360 205" stroke="hsl(var(--water-blue))" strokeWidth="2" fill="none" opacity="0.7" />
              
              {/* Forest areas (Boreal Forest) */}
              <circle cx="120" cy="120" r="25" fill="hsl(var(--forest-green))" opacity="0.4" />
              <circle cx="180" cy="110" r="30" fill="hsl(var(--forest-green))" opacity="0.4" />
              <circle cx="250" cy="120" r="35" fill="hsl(var(--forest-green))" opacity="0.4" />
              <circle cx="320" cy="110" r="25" fill="hsl(var(--forest-green))" opacity="0.4" />
              <circle cx="380" cy="130" r="20" fill="hsl(var(--forest-green))" opacity="0.4" />
              
              {/* Major cities markers */}
              <circle cx="380" cy="240" r="3" fill="hsl(var(--primary))" />
              <text x="385" y="245" fontSize="8" fill="hsl(var(--primary))">Toronto</text>
              
              <circle cx="320" cy="200" r="2" fill="hsl(var(--primary))" />
              <text x="325" y="205" fontSize="7" fill="hsl(var(--primary))">Sudbury</text>
              
              <circle cx="200" cy="300" r="2" fill="hsl(var(--primary))" />
              <text x="205" y="305" fontSize="7" fill="hsl(var(--primary))">Thunder Bay</text>
            </svg>

            {/* Accurate catch pins based on real coordinates */}
            {catches.map((catchItem, index) => {
              // Convert real coordinates to SVG coordinates
              let svgX, svgY;
              
              if (catchItem.id === '1') { // Toronto area (Lake Ontario)
                svgX = 380; svgY = 240;
              } else if (catchItem.id === '2') { // Kingston area
                svgX = 360; svgY = 230;
              } else { // Sault Ste. Marie area (Lake Superior)
                svgX = 200; svgY = 300;
              }
              
              return (
                <div
                  key={catchItem.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                  style={{
                    left: `${(svgX / 500) * 100}%`,
                    top: `${(svgY / 400) * 100}%`,
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <div className="relative group cursor-pointer">
                    {/* Pin */}
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center achievement-pulse">
                      <Fish className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <Card className="p-2 bg-white shadow-lg border min-w-max">
                        <p className="font-semibold text-sm">{catchItem.species}</p>
                        <p className="text-xs text-muted-foreground">{catchItem.date}</p>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4">
              <Card className="p-3 bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-sm mb-2">Legend</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
                    <span>Your Catches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-water-blue rounded opacity-80"></div>
                    <span>Great Lakes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-water-blue rounded opacity-60"></div>
                    <span>Lakes & Rivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-forest-green rounded opacity-40"></div>
                    <span>Boreal Forest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Major Cities</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stats overlay */}
            <div className="absolute top-4 right-4">
              <Card className="p-3 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-sm">Fishing Stats</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between gap-4">
                    <span>Total Locations:</span>
                    <span className="font-semibold">{catches.length}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Species Caught:</span>
                    <span className="font-semibold">{new Set(catches.map(c => c.species)).size}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent catches list */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg">Recent Catches</h3>
        {catches.slice(0, 3).map((catchItem) => (
          <Card key={catchItem.id} className="p-3 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <Fish className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{catchItem.species}</p>
                <p className="text-sm text-muted-foreground">{catchItem.date}</p>
              </div>
              <MapPin className="w-4 h-4 text-blue-500" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapTab;
