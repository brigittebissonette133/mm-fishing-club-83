
import React from 'react';
import { Fish, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface HeroSectionProps {
  onCameraOpen: () => void;
}

const HeroSection = ({ onCameraOpen }: HeroSectionProps) => {
  return (
    <section className="water-gradient min-h-screen flex flex-col justify-center items-center px-4 text-center relative">
      {/* Animated fish background */}
      <div className="absolute inset-0 opacity-10">
        <Fish className="absolute top-20 left-10 w-8 h-8 text-white animate-bounce" style={{ animationDelay: '0s' }} />
        <Fish className="absolute top-40 right-20 w-6 h-6 text-white animate-bounce" style={{ animationDelay: '1s' }} />
        <Fish className="absolute bottom-40 left-20 w-10 h-10 text-white animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 space-y-8">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center fish-jump backdrop-blur-sm">
            <Fish className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ready to Fish?</h1>
          <p className="text-white/90 text-lg max-w-md">Cast your line and catch something amazing in Ontario's waters!</p>
        </div>

        {/* Main Catch Button */}
        <button
          onClick={onCameraOpen}
          className="relative bg-white hover:bg-gray-50 active:scale-95 transform transition-all duration-200 
                     rounded-2xl shadow-2xl hover:shadow-white/30 
                     w-80 h-20 flex items-center justify-center group mx-auto"
        >
          <div className="flex items-center gap-4">
            <Camera className="w-8 h-8 text-primary" />
            <span className="text-primary font-bold text-2xl">
              Caught One!
            </span>
          </div>
          
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 max-w-sm mx-auto">
          <Card className="text-center p-3 bg-white/10 backdrop-blur-sm border-white/20">
            <p className="text-xl font-bold text-white">12</p>
            <p className="text-xs text-white/80">Catches</p>
          </Card>
          <Card className="text-center p-3 bg-white/10 backdrop-blur-sm border-white/20">
            <p className="text-xl font-bold text-white">7</p>
            <p className="text-xs text-white/80">Species</p>
          </Card>
          <Card className="text-center p-3 bg-white/10 backdrop-blur-sm border-white/20">
            <p className="text-xl font-bold text-white">3</p>
            <p className="text-xs text-white/80">Locations</p>
          </Card>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
