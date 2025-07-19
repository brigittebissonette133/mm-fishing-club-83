
import { SecureStorage } from '@/utils/secureStorage';
import { PersonalBest, CatchRecord } from '@/types/achievements';

export const STORAGE_KEYS = {
  PERSONAL_BESTS: 'personal_bests',
  CATCH_HISTORY: 'catch_history',
  ACHIEVEMENTS: 'achievements'
} as const;

export const getDefaultPersonalBests = (): PersonalBest[] => [
  {
    id: '1',
    type: 'longest_fish',
    title: 'Longest Fish',
    value: 0,
    unit: 'inches',
    date: new Date().toISOString(),
    details: 'No catches recorded yet'
  },
  {
    id: '2',
    type: 'most_fish_day',
    title: 'Most Fish in One Day',
    value: 0,
    unit: 'fish',
    date: new Date().toISOString(),
    details: 'No catches recorded yet'
  },
  {
    id: '3',
    type: 'most_species_day',
    title: 'Most Species in One Day',
    value: 0,
    unit: 'species',
    date: new Date().toISOString(),
    details: 'No catches recorded yet'
  },
  {
    id: '4',
    type: 'most_lures_lost_day',
    title: 'Most Lures Lost in One Day',
    value: 0,
    unit: 'lures',
    date: new Date().toISOString(),
    details: 'No catches recorded yet'
  }
];

export const loadPersonalBests = (): PersonalBest[] => {
  const savedBests = SecureStorage.getItem<PersonalBest[]>(STORAGE_KEYS.PERSONAL_BESTS);
  return savedBests && savedBests.length > 0 ? savedBests : getDefaultPersonalBests();
};

export const loadCatchHistory = (): CatchRecord[] => {
  const savedCatches = SecureStorage.getItem<CatchRecord[]>(STORAGE_KEYS.CATCH_HISTORY);
  return savedCatches || [];
};

export const savePersonalBests = (personalBests: PersonalBest[]): void => {
  if (personalBests.length > 0) {
    SecureStorage.setItem(STORAGE_KEYS.PERSONAL_BESTS, personalBests);
  }
};

export const saveCatchHistory = (catchHistory: CatchRecord[]): void => {
  if (catchHistory.length > 0) {
    SecureStorage.setItem(STORAGE_KEYS.CATCH_HISTORY, catchHistory);
  }
};
