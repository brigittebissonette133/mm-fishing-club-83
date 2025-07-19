
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAchievements } from '@/hooks/useAchievements';
import { getRandomFish } from '@/utils/fishData';

const PersonalBestDemo = () => {
  const { 
    addCatch,
    checkLongestFish, 
    checkMostFishInDay, 
    checkMostSpeciesInDay, 
    checkMostLuresLostInDay 
  } = useAchievements();

  const simulateRandomCatch = () => {
    const randomFish = getRandomFish();
    const length = Math.random() * (randomFish.maxLength - randomFish.averageLength) + randomFish.averageLength;
    const weight = length * 0.15 + Math.random() * 2; // Rough weight calculation
    
    addCatch({
      species: randomFish.name,
      length: Math.round(length * 10) / 10, // Round to 1 decimal
      weight: Math.round(weight * 10) / 10,
      location: 'Lake Ontario',
      date: new Date().toISOString(),
      imageUrl: randomFish.imageUrl
    });
  };

  const simulateLongestFish = () => {
    const length = Math.random() * 10 + 15; // Random length between 15-25 inches
    checkLongestFish(length, 'Largemouth Bass', 'Lake Ontario');
  };

  const simulateMostFishDay = () => {
    const count = Math.floor(Math.random() * 10) + 10; // Random count between 10-20
    checkMostFishInDay(count, new Date().toISOString(), 'Lake Ontario');
  };

  const simulateMostSpeciesDay = () => {
    const count = Math.floor(Math.random() * 5) + 3; // Random count between 3-8
    checkMostSpeciesInDay(count, new Date().toISOString(), 'Lake Ontario');
  };

  const simulateMostLuresLostDay = () => {
    const count = Math.floor(Math.random() * 3) + 1; // Random count between 1-4
    checkMostLuresLostInDay(count, new Date().toISOString(), 'Lake Ontario');
  };

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold mb-4">Test Personal Bests & Catches</h3>
      <div className="grid grid-cols-1 gap-2">
        <Button onClick={simulateRandomCatch} variant="default" size="sm">
          Add Random Catch
        </Button>
        <Button onClick={simulateLongestFish} variant="outline" size="sm">
          Test Longest Fish
        </Button>
        <Button onClick={simulateMostFishDay} variant="outline" size="sm">
          Test Most Fish/Day
        </Button>
        <Button onClick={simulateMostSpeciesDay} variant="outline" size="sm">
          Test Most Species/Day
        </Button>
        <Button onClick={simulateMostLuresLostDay} variant="outline" size="sm">
          Test Most Lures Lost/Day
        </Button>
      </div>
    </div>
  );
};

export default PersonalBestDemo;
