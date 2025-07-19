
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: string;
  target?: number;
  current?: number;
}

export interface PersonalBest {
  id: string;
  type: 'longest_fish' | 'most_fish_day' | 'most_species_day' | 'most_lures_lost_day';
  title: string;
  value: number;
  unit: string;
  date: string;
  location?: string;
  species?: string;
  details?: string;
  fishImage?: string;
}

export interface CatchRecord {
  id: string;
  species: string;
  length: number;
  weight?: number;
  location: string;
  date: string;
  imageUrl?: string;
}
