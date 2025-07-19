
import { FishSpecies } from './types';

export const SALTWATER_FISH: FishSpecies[] = [
  // Common Saltwater Fish
  {
    id: 'striped-bass',
    name: 'Striped Bass',
    scientificName: 'Morone saxatilis',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Striper',
    averageLength: 24,
    maxLength: 70,
    rarity: 'common',
    habitat: ['ocean', 'coastal waters']
  },
  {
    id: 'red-snapper',
    name: 'Red Snapper',
    scientificName: 'Lutjanus campechanus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Snapper',
    averageLength: 16,
    maxLength: 39,
    rarity: 'common',
    habitat: ['ocean', 'reefs']
  },
  {
    id: 'flounder',
    name: 'Summer Flounder',
    scientificName: 'Paralichthys dentatus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Flounder',
    averageLength: 14,
    maxLength: 33,
    rarity: 'common',
    habitat: ['ocean', 'coastal waters']
  },
  
  // Uncommon Saltwater Fish
  {
    id: 'atlantic-salmon',
    name: 'Atlantic Salmon',
    scientificName: 'Salmo salar',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Salmon',
    averageLength: 20,
    maxLength: 36,
    rarity: 'uncommon',
    habitat: ['ocean', 'rivers']
  },
  {
    id: 'king-mackerel',
    name: 'King Mackerel',
    scientificName: 'Scomberomorus cavalla',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Mackerel',
    averageLength: 24,
    maxLength: 72,
    rarity: 'uncommon',
    habitat: ['ocean', 'offshore waters']
  },
  {
    id: 'grouper',
    name: 'Red Grouper',
    scientificName: 'Epinephelus morio',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Grouper',
    averageLength: 20,
    maxLength: 50,
    rarity: 'uncommon',
    habitat: ['ocean', 'reefs', 'offshore']
  },
  
  // Epic Fish
  {
    id: 'tarpon',
    name: 'Atlantic Tarpon',
    scientificName: 'Megalops atlanticus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Tarpon',
    averageLength: 48,
    maxLength: 96,
    rarity: 'epic',
    habitat: ['ocean', 'coastal waters']
  },
  {
    id: 'sailfish',
    name: 'Atlantic Sailfish',
    scientificName: 'Istiophorus platypterus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Sailfish',
    averageLength: 72,
    maxLength: 132,
    rarity: 'epic',
    habitat: ['ocean', 'offshore waters']
  },
  {
    id: 'yellowfin-tuna',
    name: 'Yellowfin Tuna',
    scientificName: 'Thunnus albacares',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Yellowfin',
    averageLength: 36,
    maxLength: 88,
    rarity: 'epic',
    habitat: ['ocean', 'deep waters']
  },
  {
    id: 'swordfish',
    name: 'Swordfish',
    scientificName: 'Xiphias gladius',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Swordfish',
    averageLength: 60,
    maxLength: 177,
    rarity: 'epic',
    habitat: ['ocean', 'deep waters']
  },
  
  // Legendary Fish
  {
    id: 'blue-marlin',
    name: 'Blue Marlin',
    scientificName: 'Makaira nigricans',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Marlin',
    averageLength: 72,
    maxLength: 180,
    rarity: 'legendary',
    habitat: ['ocean']
  },
  {
    id: 'giant-bluefin-tuna',
    name: 'Giant Bluefin Tuna',
    scientificName: 'Thunnus thynnus',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Bluefin',
    averageLength: 78,
    maxLength: 150,
    rarity: 'legendary',
    habitat: ['ocean', 'deep waters']
  },
  {
    id: 'great-white-shark',
    name: 'Great White Shark',
    scientificName: 'Carcharodon carcharias',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Shark',
    averageLength: 180,
    maxLength: 240,
    rarity: 'legendary',
    habitat: ['ocean', 'deep waters']
  },
  {
    id: 'giant-pacific-halibut',
    name: 'Giant Pacific Halibut',
    scientificName: 'Hippoglossus stenolepis',
    imageUrl: '/placeholder.svg?height=100&width=150&text=Halibut',
    averageLength: 72,
    maxLength: 144,
    rarity: 'legendary',
    habitat: ['ocean', 'deep waters']
  }
];
