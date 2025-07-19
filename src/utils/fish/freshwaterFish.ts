
import { FishSpecies } from './types';

export const FRESHWATER_FISH: FishSpecies[] = [
  // Common Freshwater Fish
  {
    id: 'largemouth-bass',
    name: 'Largemouth Bass',
    scientificName: 'Micropterus salmoides',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Bass',
    averageLength: 12,
    maxLength: 29,
    rarity: 'common',
    habitat: ['lakes', 'rivers', 'ponds']
  },
  {
    id: 'smallmouth-bass',
    name: 'Smallmouth Bass',
    scientificName: 'Micropterus dolomieu',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Smallmouth',
    averageLength: 10,
    maxLength: 25,
    rarity: 'common',
    habitat: ['lakes', 'rivers', 'streams']
  },
  {
    id: 'bluegill',
    name: 'Bluegill',
    scientificName: 'Lepomis macrochirus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Bluegill',
    averageLength: 6,
    maxLength: 12,
    rarity: 'common',
    habitat: ['lakes', 'ponds', 'slow streams']
  },
  {
    id: 'channel-catfish',
    name: 'Channel Catfish',
    scientificName: 'Ictalurus punctatus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Catfish',
    averageLength: 16,
    maxLength: 40,
    rarity: 'common',
    habitat: ['rivers', 'lakes', 'reservoirs']
  },
  
  // Uncommon Freshwater Fish
  {
    id: 'rainbow-trout',
    name: 'Rainbow Trout',
    scientificName: 'Oncorhynchus mykiss',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Trout',
    averageLength: 14,
    maxLength: 30,
    rarity: 'uncommon',
    habitat: ['streams', 'lakes']
  },
  {
    id: 'brown-trout',
    name: 'Brown Trout',
    scientificName: 'Salmo trutta',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Brown+Trout',
    averageLength: 15,
    maxLength: 32,
    rarity: 'uncommon',
    habitat: ['streams', 'rivers', 'cold lakes']
  },
  {
    id: 'walleye',
    name: 'Walleye',
    scientificName: 'Sander vitreus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Walleye',
    averageLength: 16,
    maxLength: 35,
    rarity: 'uncommon',
    habitat: ['lakes', 'rivers']
  },
  {
    id: 'crappie',
    name: 'Black Crappie',
    scientificName: 'Pomoxis nigromaculatus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Crappie',
    averageLength: 9,
    maxLength: 19,
    rarity: 'uncommon',
    habitat: ['lakes', 'ponds', 'slow rivers']
  },
  
  // Rare Freshwater Fish
  {
    id: 'northern-pike',
    name: 'Northern Pike',
    scientificName: 'Esox lucius',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Pike',
    averageLength: 24,
    maxLength: 58,
    rarity: 'rare',
    habitat: ['lakes', 'rivers']
  },
  {
    id: 'muskie',
    name: 'Muskellunge',
    scientificName: 'Esox masquinongy',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Muskie',
    averageLength: 36,
    maxLength: 72,
    rarity: 'rare',
    habitat: ['large lakes', 'rivers']
  },
  {
    id: 'lake-trout',
    name: 'Lake Trout',
    scientificName: 'Salvelinus namaycush',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Lake+Trout',
    averageLength: 18,
    maxLength: 50,
    rarity: 'rare',
    habitat: ['deep cold lakes']
  },
  {
    id: 'steelhead',
    name: 'Steelhead Trout',
    scientificName: 'Oncorhynchus mykiss',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Steelhead',
    averageLength: 20,
    maxLength: 45,
    rarity: 'rare',
    habitat: ['rivers', 'great lakes']
  }
];
