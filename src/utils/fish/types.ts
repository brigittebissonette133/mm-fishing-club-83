
export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  imageUrl: string;
  averageLength: number; // in inches
  maxLength: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  habitat: string[];
}
