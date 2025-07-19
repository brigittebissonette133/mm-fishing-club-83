
export interface UserData {
  catches: any[];
  personalBests: any[];
  achievements: any[];
  lures: any[];
  locations: any[];
  profile: {
    name: string;
    avatar?: string;
    joinDate: string;
    totalCatches: number;
    level: number;
    experience: number;
  };
  preferences: {
    units: 'metric' | 'imperial';
    notifications: boolean;
    theme: string;
    autoSave: boolean;
  };
}
