
import React from 'react';
import { User, Camera, Trophy } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'account', label: 'Profile', icon: User },
    { id: 'capture', label: 'Catch', icon: Camera },
    { id: 'trophies', label: 'Trophies', icon: Trophy },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-white/90 backdrop-blur-xl border-t border-border/50 shadow-2xl">
      {/* Decorative water wave effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60"></div>
      
      <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto relative">
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="particle w-1 h-1"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCapture = tab.id === 'capture';
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 ease-out rounded-2xl relative group ${
                isCapture 
                  ? 'py-2 px-4 min-w-0 transform' + (isActive ? ' scale-110' : ' scale-105')
                  : 'py-3 px-3 min-w-0'
              } ${
                isActive 
                  ? 'text-white transform scale-110' 
                  : 'text-muted-foreground hover:text-primary hover:scale-105'
              }`}
            >
              {/* Active glow effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl opacity-20 blur-sm scale-110"></div>
              )}
              
              {/* Active indicator wave */}
              {isActive && (
                <div className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg"></div>
              )}
              
              {/* Special styling for capture button */}
              {isCapture ? (
                <div className={`relative p-4 rounded-full transition-all duration-300 group-hover:scale-105 ${
                  isActive 
                    ? 'game-button text-white shadow-xl' 
                    : 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary hover:from-primary/30 hover:to-accent/30 border-2 border-primary/20'
                }`}>
                  <Icon className={`transition-all duration-300 ${
                    isCapture ? 'w-7 h-7' : 'w-6 h-6'
                  } ${isActive ? 'stroke-2 drop-shadow-sm' : 'stroke-1.5'}`} />
                  
                  {/* Shimmer effect on capture button */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full shimmer-effect"></div>
                  )}
                </div>
              ) : (
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg' 
                    : 'hover:bg-primary/10'
                }`}>
                  <Icon className={`w-6 h-6 mb-1 transition-all duration-300 ${
                    isActive ? 'stroke-2 drop-shadow-sm' : 'stroke-1.5'
                  }`} />
                </div>
              )}
              
              {/* Label with game-like styling */}
              <span className={`text-xs font-semibold transition-all duration-300 ${
                isCapture ? 'mt-2' : 'mt-1'
              } ${
                isActive 
                  ? 'text-primary font-bold drop-shadow-sm' 
                  : 'text-muted-foreground group-hover:text-primary'
              }`}>
                {tab.label}
              </span>

              {/* Ripple effect on tap */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
