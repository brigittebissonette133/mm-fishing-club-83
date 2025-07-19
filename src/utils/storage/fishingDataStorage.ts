import { CoreStorage } from './coreStorage';

export class FishingDataStorage {
  static saveFishingData(data: any): void {
    CoreStorage.setItem('user_data', data);
  }

  static loadFishingData(): any {
    return CoreStorage.getItem('user_data') || {};
  }

  static saveUserPreferences(preferences: any): void {
    CoreStorage.setItem('preferences', preferences);
  }

  static loadUserPreferences(): any {
    return CoreStorage.getItem('preferences') || {
      units: 'imperial',
      notifications: true,
      theme: 'ocean'
    };
  }
}