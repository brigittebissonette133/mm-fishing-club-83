
import { UserData } from '@/types/userData';

export const defaultUserData: UserData = {
  catches: [],
  personalBests: [],
  achievements: [],
  lures: [
    { 
      id: '1', 
      name: 'Spinnerbait Silver', 
      type: 'Spinnerbait', 
      color: 'Silver/Blue', 
      image: null, 
      timesUsed: 0, 
      catches: [],
      totalCatches: 0
    },
    { 
      id: '2', 
      name: 'Jig Head 1/4oz', 
      type: 'Jig', 
      color: 'Green', 
      image: null, 
      timesUsed: 0, 
      catches: [],
      totalCatches: 0
    },
    { 
      id: '3', 
      name: 'Crankbait Deep Diver', 
      type: 'Crankbait', 
      color: 'Fire Tiger', 
      image: null, 
      timesUsed: 0, 
      catches: [],
      totalCatches: 0
    },
    { 
      id: '4', 
      name: 'Soft Plastic Worm', 
      type: 'Soft Bait', 
      color: 'Watermelon', 
      image: null, 
      timesUsed: 0, 
      catches: [],
      totalCatches: 0
    },
  ],
  locations: [],
  profile: {
    name: 'Angler',
    joinDate: new Date().toISOString(),
    totalCatches: 0,
    level: 1,
    experience: 0
  },
  preferences: {
    units: 'imperial',
    notifications: true,
    theme: 'ocean',
    autoSave: true
  }
};
