
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PersonalBest, CatchRecord } from '@/types/achievements';
import { 
  loadPersonalBests, 
  loadCatchHistory, 
  savePersonalBests, 
  saveCatchHistory 
} from '@/utils/achievementStorage';
import {
  checkForPersonalBest,
  checkLongestFish,
  checkMostFishInDay,
  checkMostSpeciesInDay,
  checkMostLuresLostInDay
} from '@/utils/personalBestUtils';
import {
  createCatchRecord,
  sortCatchesByDate,
  getTopCatches,
  getTodaysCatches,
  getUniqueSpeciesCount
} from '@/utils/catchUtils';

export const useAchievements = () => {
  const [personalBests, setPersonalBests] = useState<PersonalBest[]>([]);
  const [catchHistory, setCatchHistory] = useState<CatchRecord[]>([]);
  const { toast } = useToast();

  // Load data from SecureStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    savePersonalBests(personalBests);
  }, [personalBests]);

  useEffect(() => {
    saveCatchHistory(catchHistory);
  }, [catchHistory]);

  const loadData = () => {
    setPersonalBests(loadPersonalBests());
    setCatchHistory(loadCatchHistory());
  };

  const addCatch = (catchData: Omit<CatchRecord, 'id'>) => {
    const newCatch = createCatchRecord(catchData);
    setCatchHistory(prev => [newCatch, ...prev]);
    
    // Check for personal bests
    const longestResult = checkLongestFish(personalBests, catchData.length, catchData.species, catchData.location, catchData.date);
    if (longestResult.isNewRecord) {
      setPersonalBests(longestResult.updated);
      showPersonalBestToast('longest_fish', catchData.length);
    }
    
    // Check daily totals
    const todayCatches = getTodaysCatches(catchHistory);
    const fishCountResult = checkMostFishInDay(personalBests, todayCatches.length + 1, catchData.date, catchData.location);
    if (fishCountResult.isNewRecord) {
      setPersonalBests(fishCountResult.updated);
      showPersonalBestToast('most_fish_day', todayCatches.length + 1);
    }
    
    const todaySpeciesCount = getUniqueSpeciesCount([...todayCatches, newCatch]);
    const speciesResult = checkMostSpeciesInDay(personalBests, todaySpeciesCount, catchData.date, catchData.location);
    if (speciesResult.isNewRecord) {
      setPersonalBests(speciesResult.updated);
      showPersonalBestToast('most_species_day', todaySpeciesCount);
    }

    return newCatch;
  };

  const showPersonalBestToast = (type: PersonalBest['type'], value: number) => {
    const recordType = personalBests.find(pb => pb.type === type);
    toast({
      title: "🏆 Personal Best!",
      description: `New ${recordType?.title}: ${value} ${recordType?.unit}!`,
      duration: 5000,
    });
  };

  const handlePersonalBestCheck = (newRecord: {
    type: PersonalBest['type'];
    value: number;
    date: string;
    location?: string;
    species?: string;
    details?: string;
  }) => {
    const result = checkForPersonalBest(personalBests, newRecord);
    if (result.isNewRecord) {
      setPersonalBests(result.updated);
      showPersonalBestToast(newRecord.type, newRecord.value);
      return true;
    }
    return false;
  };

  const getPersonalBest = (type: PersonalBest['type']) => {
    return personalBests.find(pb => pb.type === type);
  };

  const getAllPersonalBests = () => {
    return personalBests.sort((a, b) => b.value - a.value);
  };

  const getCatchHistory = () => {
    return sortCatchesByDate(catchHistory);
  };

  const getTopCatchesFromHistory = (limit: number = 5) => {
    return getTopCatches(catchHistory, limit);
  };

  // Helper functions for easy record checking
  const checkLongestFishRecord = (length: number, species: string, location: string, date: string = new Date().toISOString()) => {
    return handlePersonalBestCheck({
      type: 'longest_fish',
      value: length,
      date,
      location,
      species,
      details: `${species} - ${length}" at ${location}`
    });
  };

  const checkMostFishInDayRecord = (count: number, date: string = new Date().toISOString(), location?: string) => {
    return handlePersonalBestCheck({
      type: 'most_fish_day',
      value: count,
      date,
      location,
      details: `${count} fish caught in one day`
    });
  };

  const checkMostSpeciesInDayRecord = (count: number, date: string = new Date().toISOString(), location?: string) => {
    return handlePersonalBestCheck({
      type: 'most_species_day',
      value: count,
      date,
      location,
      details: `${count} different species in one day`
    });
  };

  const checkMostLuresLostInDayRecord = (count: number, date: string = new Date().toISOString(), location?: string) => {
    return handlePersonalBestCheck({
      type: 'most_lures_lost_day',
      value: count,
      date,
      location,
      details: `${count} lures lost in one day`
    });
  };

  return {
    personalBests,
    catchHistory,
    addCatch,
    checkForPersonalBest: handlePersonalBestCheck,
    getPersonalBest,
    getAllPersonalBests,
    getCatchHistory,
    getTopCatches: getTopCatchesFromHistory,
    checkLongestFish: checkLongestFishRecord,
    checkMostFishInDay: checkMostFishInDayRecord,
    checkMostSpeciesInDay: checkMostSpeciesInDayRecord,
    checkMostLuresLostInDay: checkMostLuresLostInDayRecord,
    loadData
  };
};
