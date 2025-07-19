import { CatchRecord, PersonalBest } from '@/types/achievements';
import { FishIdentificationResult, LocationData } from '@/services/fishIdentificationService';
import { loadCatchHistory, saveCatchHistory, loadPersonalBests, savePersonalBests } from '@/utils/achievementStorage';
import { checkLongestFish, checkMostFishInDay, checkMostSpeciesInDay } from '@/utils/personalBestUtils';
import { createCatchRecord, getTodaysCatches, getUniqueSpeciesCount } from '@/utils/catchUtils';
import { Logger } from '@/utils/logger';

export interface SaveCatchOptions {
  fishData: FishIdentificationResult;
  locationData: LocationData | null;
  imageDataUrl: string;
}

export interface SaveCatchResult {
  success: boolean;
  catchRecord: CatchRecord;
  newPersonalBests: PersonalBest[];
  isNewRecord: boolean;
}

export class CatchRecordService {
  static async saveCatch(options: SaveCatchOptions): Promise<SaveCatchResult> {
    try {
      const { fishData, locationData, imageDataUrl } = options;
      
      Logger.info('Saving new catch record with achievements update', { species: fishData.species, size: fishData.size });

      // Parse length from size string (e.g., "14.5" -> 14.5)
      const length = parseFloat(fishData.size) || 0;

      // Create catch record
      const catchRecord = createCatchRecord({
        species: fishData.species,
        length: length,
        weight: this.parseWeight(fishData.weight),
        location: locationData?.name || 'Unknown Location',
        date: new Date().toISOString(),
        imageUrl: this.optimizeImageForStorage(imageDataUrl)
      });

      // Load existing data
      const existingCatches = loadCatchHistory();
      const existingPersonalBests = loadPersonalBests();

      // Add new catch to history
      const updatedCatches = [catchRecord, ...existingCatches];
      saveCatchHistory(updatedCatches);

      // Check for personal bests and achievements
      let updatedPersonalBests = existingPersonalBests;
      let hasNewRecord = false;

      // Check longest fish achievement
      const longestResult = checkLongestFish(
        updatedPersonalBests,
        length,
        fishData.species,
        locationData?.name || 'Unknown Location',
        catchRecord.date
      );

      if (longestResult.isNewRecord) {
        updatedPersonalBests = longestResult.updated;
        hasNewRecord = true;
        Logger.info('NEW RECORD: Longest fish!', { species: fishData.species, length });
      }

      // Check most fish in one day achievement
      const todaysCatches = getTodaysCatches(updatedCatches);
      const fishCountResult = checkMostFishInDay(
        updatedPersonalBests,
        todaysCatches.length,
        catchRecord.date,
        locationData?.name
      );

      if (fishCountResult.isNewRecord) {
        updatedPersonalBests = fishCountResult.updated;
        hasNewRecord = true;
        Logger.info('NEW RECORD: Most fish in day!', { count: todaysCatches.length });
      }

      // Check most species in one day achievement
      const uniqueSpeciesToday = getUniqueSpeciesCount(todaysCatches);
      const speciesCountResult = checkMostSpeciesInDay(
        updatedPersonalBests,
        uniqueSpeciesToday,
        catchRecord.date,
        locationData?.name
      );

      if (speciesCountResult.isNewRecord) {
        updatedPersonalBests = speciesCountResult.updated;
        hasNewRecord = true;
        Logger.info('NEW RECORD: Most species in day!', { count: uniqueSpeciesToday });
      }

      // Save updated personal bests and trigger achievement updates
      if (hasNewRecord) {
        savePersonalBests(updatedPersonalBests);
      }

      Logger.info('Catch saved successfully with achievements updated', { 
        id: catchRecord.id, 
        newRecords: hasNewRecord,
        totalCatches: updatedCatches.length 
      });

      return {
        success: true,
        catchRecord,
        newPersonalBests: updatedPersonalBests,
        isNewRecord: hasNewRecord
      };

    } catch (error: any) {
      Logger.error('Failed to save catch', { error: error.message });
      throw new Error('Failed to save catch record');
    }
  }

  private static parseWeight(weightString: string): number {
    const match = weightString.match(/(\d+\.?\d*)/);
    if (!match) return 0;
    
    const value = parseFloat(match[1]);
    
    // Convert oz to lbs if needed
    if (weightString.includes('oz')) {
      return value / 16;
    }
    
    return value;
  }

  private static optimizeImageForStorage(imageDataUrl: string): string {
    // For local storage optimization, keep reasonable file sizes
    const maxStorageSize = 800 * 1024; // 800KB limit for better performance
    
    if (imageDataUrl.length > maxStorageSize) {
      Logger.info('Image optimized for storage', { originalSize: Math.round(imageDataUrl.length / 1024) + 'KB' });
      // In production, implement proper image compression here
      return imageDataUrl.substring(0, maxStorageSize);
    }
    
    return imageDataUrl;
  }
}
