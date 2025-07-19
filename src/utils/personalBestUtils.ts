
import { PersonalBest, CatchRecord } from '@/types/achievements';
import { getFishBySpecies } from '@/utils/fishData';

export const checkForPersonalBest = (
  personalBests: PersonalBest[],
  newRecord: {
    type: PersonalBest['type'];
    value: number;
    date: string;
    location?: string;
    species?: string;
    details?: string;
  }
): { updated: PersonalBest[]; isNewRecord: boolean } => {
  const existingBest = personalBests.find(pb => pb.type === newRecord.type);
  
  if (!existingBest || newRecord.value > existingBest.value) {
    let fishImage = undefined;
    if (newRecord.species) {
      const fishData = getFishBySpecies(newRecord.species);
      fishImage = fishData?.imageUrl;
    }

    const updatedBests = personalBests.map(pb => {
      if (pb.type === newRecord.type) {
        return {
          ...pb,
          value: newRecord.value,
          date: newRecord.date,
          location: newRecord.location || pb.location,
          species: newRecord.species || pb.species,
          details: newRecord.details || `New record: ${newRecord.value} ${pb.unit}`,
          fishImage: fishImage || pb.fishImage
        };
      }
      return pb;
    });
    
    return { updated: updatedBests, isNewRecord: true };
  }
  
  return { updated: personalBests, isNewRecord: false };
};

export const checkLongestFish = (
  personalBests: PersonalBest[],
  length: number,
  species: string,
  location: string,
  date: string = new Date().toISOString()
) => {
  return checkForPersonalBest(personalBests, {
    type: 'longest_fish',
    value: length,
    date,
    location,
    species,
    details: `${species} - ${length}" at ${location}`
  });
};

export const checkMostFishInDay = (
  personalBests: PersonalBest[],
  count: number,
  date: string = new Date().toISOString(),
  location?: string
) => {
  return checkForPersonalBest(personalBests, {
    type: 'most_fish_day',
    value: count,
    date,
    location,
    details: `${count} fish caught in one day`
  });
};

export const checkMostSpeciesInDay = (
  personalBests: PersonalBest[],
  count: number,
  date: string = new Date().toISOString(),
  location?: string
) => {
  return checkForPersonalBest(personalBests, {
    type: 'most_species_day',
    value: count,
    date,
    location,
    details: `${count} different species in one day`
  });
};

export const checkMostLuresLostInDay = (
  personalBests: PersonalBest[],
  count: number,
  date: string = new Date().toISOString(),
  location?: string
) => {
  return checkForPersonalBest(personalBests, {
    type: 'most_lures_lost_day',
    value: count,
    date,
    location,
    details: `${count} lures lost in one day`
  });
};
