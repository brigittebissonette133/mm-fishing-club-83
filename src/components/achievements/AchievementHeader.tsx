
import React from 'react';
import { Trophy, Waves } from 'lucide-react';

const AchievementHeader = () => {
  return (
    <div className="text-center relative">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="particle w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-4 achievement-pulse shadow-2xl border-4 border-white/30">
          <Trophy className="w-10 h-10 text-white drop-shadow-lg" />
          
          {/* Decorative waves around trophy */}
          <div className="absolute -top-2 -left-2">
            <Waves className="w-4 h-4 text-primary/60 animate-bounce" style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <Waves className="w-4 h-4 text-accent/60 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-primary mb-2 drop-shadow-sm">
          Trophy Collection
        </h1>
        <p className="text-muted-foreground font-medium">
          🎣 Track your legendary catches & milestones
        </p>
        
        {/* Decorative divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full"></div>
      </div>
    </div>
  );
};

export default AchievementHeader;
