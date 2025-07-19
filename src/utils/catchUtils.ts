
import { CatchRecord } from '@/types/achievements';

export const createCatchRecord = (catchData: Omit<CatchRecord, 'id'>): CatchRecord => {
  return {
    ...catchData,
    id: Date.now().toString()
  };
};

export const sortCatchesByDate = (catches: CatchRecord[]): CatchRecord[] => {
  return catches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const sortCatchesByLength = (catches: CatchRecord[]): CatchRecord[] => {
  return catches.sort((a, b) => b.length - a.length);
};

export const getTopCatches = (catches: CatchRecord[], limit: number = 5): CatchRecord[] => {
  return sortCatchesByLength(catches).slice(0, limit);
};

export const getCatchesForDate = (catches: CatchRecord[], date: string): CatchRecord[] => {
  const targetDate = new Date(date).toDateString();
  return catches.filter(c => new Date(c.date).toDateString() === targetDate);
};

export const getTodaysCatches = (catches: CatchRecord[]): CatchRecord[] => {
  const today = new Date().toDateString();
  return catches.filter(c => new Date(c.date).toDateString() === today);
};

export const getUniqueSpeciesCount = (catches: CatchRecord[]): number => {
  const uniqueSpecies = new Set(catches.map(c => c.species));
  return uniqueSpecies.size;
};
