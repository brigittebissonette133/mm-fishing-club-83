
export type { FishSpecies } from './fish/types';
export { FRESHWATER_FISH } from './fish/freshwaterFish';
export { SALTWATER_FISH } from './fish/saltwaterFish';
export {
  getFishBySpecies,
  getFishById,
  getRandomFish,
  getFishByRarity,
  getFishByHabitat
} from './fish/fishUtils';

import { FRESHWATER_FISH } from './fish/freshwaterFish';
import { SALTWATER_FISH } from './fish/saltwaterFish';

export const FISH_SPECIES = [...FRESHWATER_FISH, ...SALTWATER_FISH];
