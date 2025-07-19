
import { FishSpecies } from './types';
import { FISH_SPECIES } from '../fishData';

export const getFishBySpecies = (speciesName: string): FishSpecies | undefined => {
  return FISH_SPECIES.find(fish => 
    fish.name.toLowerCase().includes(speciesName.toLowerCase()) ||
    fish.id === speciesName.toLowerCase().replace(/\s+/g, '-')
  );
};

export const getFishById = (id: string): FishSpecies | undefined => {
  return FISH_SPECIES.find(fish => fish.id === id);
};

export const getRandomFish = (): FishSpecies => {
  return FISH_SPECIES[Math.floor(Math.random() * FISH_SPECIES.length)];
};

export const getFishByRarity = (rarity: FishSpecies['rarity']): FishSpecies[] => {
  return FISH_SPECIES.filter(fish => fish.rarity === rarity);
};

export const getFishByHabitat = (habitat: string): FishSpecies[] => {
  return FISH_SPECIES.filter(fish => 
    fish.habitat.some(h => h.toLowerCase().includes(habitat.toLowerCase()))
  );
};
