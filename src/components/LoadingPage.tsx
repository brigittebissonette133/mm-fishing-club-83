
import React, { useEffect, useState } from 'react';
import { Fish, Waves } from 'lucide-react';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

const LoadingPage = ({ onLoadingComplete }: LoadingPageProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const fishingTips = [
    "Loading your tackle box...",
    "Checking weather conditions...", 
    "Scanning Ontario lakes...",
    "Preparing your fishing rod...",
    "Ready to cast your line!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 300);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % fishingTips.length);
    }, 1000);

    return () => clearInterval(tipInterval);
  }, [fishingTips.length]);

  return (
    <div className="min-h-screen water-gradient flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-20">
        <Waves className="absolute top-20 left-10 w-8 h-8 text-white animate-bounce" style={{ animationDelay: '0s' }} />
        <Waves className="absolute top-40 right-20 w-6 h-6 text-white animate-bounce" style={{ animationDelay: '1s' }} />
        <Waves className="absolute bottom-40 left-20 w-10 h-10 text-white animate-bounce" style={{ animationDelay: '2s' }} />
        <Waves className="absolute bottom-20 right-10 w-7 h-7 text-white animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main content */}
      <div className="text-center z-10 space-y-8">
        {/* Animated fish logo */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center fish-jump backdrop-blur-sm">
            <Fish className="w-16 h-16 text-white" />
          </div>
          {/* Ripple effect */}
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-white/30 ripple-effect"></div>
        </div>

        {/* App title */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg tracking-wide">
            MM Fishing Club
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Your Ultimate Fishing Companion
          </p>
        </div>

        {/* Loading progress */}
        <div className="w-80 mx-auto space-y-4">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Loading percentage */}
          <div className="text-white/90 font-semibold text-lg">
            {progress}%
          </div>
        </div>

        {/* Fishing tips */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-white/80 text-base animate-fade-in font-medium">
            {fishingTips[currentTip]}
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
