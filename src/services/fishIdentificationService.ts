import { getFishBySpecies, FishSpecies, FISH_SPECIES } from '@/utils/fishData';
import { Logger } from '@/utils/logger';

export interface FishIdentificationResult {
  species: string;
  confidence: number;
  size: string;
  weight: string;
  rarity: FishSpecies['rarity'];
  habitat: string[];
  scientificName: string;
}

export interface LocationData {
  name: string;
  coordinates: string;
  province?: string;
  country?: string;
}

export class FishIdentificationService {
  private static readonly API_TIMEOUT = 8000; // 8 seconds timeout
  private static readonly ANALYSIS_TIMEOUT = 10000; // 10 seconds for complete analysis
  private static readonly MAX_RETRIES = 2;

  static async identifyFish(imageDataUrl: string): Promise<FishIdentificationResult> {
    // Check network status first
    if (!navigator.onLine) {
      Logger.warn('Attempting fish identification while offline');
      throw new Error('No internet connection. Fish identification requires an internet connection.');
    }

    return this.withTimeout(
      this.performFishIdentification(imageDataUrl),
      this.ANALYSIS_TIMEOUT,
      'Fish identification timed out after 10 seconds'
    );
  }

  static async getCurrentLocation(): Promise<LocationData> {
    // Graceful degradation for offline location
    if (!navigator.onLine) {
      Logger.info('Getting cached location while offline');
      return this.getOfflineLocation();
    }

    return this.withTimeout(
      this.performLocationDetection(),
      this.API_TIMEOUT,
      'Location detection timed out'
    );
  }

  private static async performFishIdentification(imageDataUrl: string): Promise<FishIdentificationResult> {
    let retries = 0;
    
    while (retries <= this.MAX_RETRIES) {
      try {
        // Additional network check before each attempt
        if (!navigator.onLine) {
          throw new Error('Lost internet connection during analysis');
        }

        Logger.info(`Fish identification attempt ${retries + 1}/${this.MAX_RETRIES + 1}`, { 
          imageSize: Math.round(imageDataUrl.length / 1024) + 'KB' 
        });
        
        // Simulate AI processing with potential for timeout
        await this.simulateAIProcessing(retries);
        
        // Get a random fish species based on realistic probability distribution
        const identifiedSpecies = this.getRandomFishByProbability();
        
        // Generate realistic measurements based on the species
        const measurements = this.generateRealisticMeasurements(identifiedSpecies);
        
        const result: FishIdentificationResult = {
          species: identifiedSpecies.name,
          confidence: Math.floor(Math.random() * 15) + 85, // 85-99% confidence
          size: measurements.size,
          weight: measurements.weight,
          rarity: identifiedSpecies.rarity,
          habitat: identifiedSpecies.habitat,
          scientificName: identifiedSpecies.scientificName
        };
        
        Logger.info('Fish identification completed successfully', { 
          species: result.species, 
          confidence: result.confidence,
          attempt: retries + 1
        });
        return result;
        
      } catch (error) {
        retries++;
        Logger.warn(`Fish identification attempt ${retries} failed`, { error, retries });
        
        // If we lost connection, don't retry
        if (!navigator.onLine) {
          throw new Error('Lost internet connection. Please check your network and try again.');
        }
        
        if (retries > this.MAX_RETRIES) {
          Logger.error('All fish identification attempts failed', { error });
          throw new Error('Failed to identify fish after multiple attempts. Please check your connection and try again.');
        }
        
        // Brief delay before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    throw new Error('Failed to identify fish. Please check your connection and try again.');
  }

  private static async performLocationDetection(): Promise<LocationData> {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation not supported');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Location request timed out'));
        }, this.API_TIMEOUT);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timeoutId);
            resolve(position);
          },
          (error) => {
            clearTimeout(timeoutId);
            reject(error);
          },
          {
            enableHighAccuracy: false,
            timeout: this.API_TIMEOUT - 1000, // Slightly less than our timeout
            maximumAge: 300000 // 5 minute cache
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Common fishing locations for demo
      const mockLocations = [
        { name: "Lake Simcoe", province: "Ontario" },
        { name: "Muskoka Lake", province: "Ontario" },
        { name: "Georgian Bay", province: "Ontario" },
        { name: "Lake Huron", province: "Ontario" },
        { name: "Rideau River", province: "Ontario" },
        { name: "Ottawa River", province: "Ontario" }
      ];
      
      const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      
      return {
        name: randomLocation.name,
        coordinates: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° W`,
        province: randomLocation.province,
        country: "Canada"
      };
      
    } catch (error) {
      Logger.warn('Location detection failed, using fallback', { error });
      return this.getOfflineLocation();
    }
  }

  private static getOfflineLocation(): LocationData {
    // Try to get cached location from localStorage
    const cachedLocation = localStorage.getItem('lastKnownLocation');
    if (cachedLocation) {
      try {
        const parsed = JSON.parse(cachedLocation);
        Logger.info('Using cached location');
        return parsed;
      } catch (error) {
        Logger.warn('Failed to parse cached location');
      }
    }

    // Fallback to generic location
    return {
      name: "Unknown Location (Offline)",
      coordinates: "Location not available",
      country: "Canada"
    };
  }

  private static async simulateAIProcessing(retryAttempt: number = 0): Promise<void> {
    // Simulate AI processing with occasional longer delays to test timeout
    // Reduce delay on retries to give better chance of success
    const baseDelay = retryAttempt > 0 ? 500 : 1000;
    const processingTime = Math.random() < 0.1 
      ? Math.random() * 8000 + 3000 // 10% chance of 3-11 second delay (to test timeout)
      : Math.random() * baseDelay + baseDelay; // Normal delay, shorter on retries
    
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }

  private static async withTimeout<T>(
    promise: Promise<T>, 
    timeoutMs: number, 
    timeoutMessage: string
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(timeoutMessage));
      }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }

  private static getRandomFishByProbability(): FishSpecies {
    // Weighted probability based on rarity
    const rarityWeights = {
      'common': 50,
      'uncommon': 30,
      'rare': 15,
      'epic': 4,
      'legendary': 1
    };

    const weightedFish: FishSpecies[] = [];
    
    FISH_SPECIES.forEach(fish => {
      const weight = rarityWeights[fish.rarity];
      for (let i = 0; i < weight; i++) {
        weightedFish.push(fish);
      }
    });

    return weightedFish[Math.floor(Math.random() * weightedFish.length)];
  }

  private static generateRealisticMeasurements(species: FishSpecies): { size: string; weight: string } {
    // Generate size within realistic range for the species
    const minSize = Math.max(4, species.averageLength * 0.6);
    const maxSize = Math.min(species.maxLength, species.averageLength * 1.8);
    const size = Math.random() * (maxSize - minSize) + minSize;
    
    // Estimate weight based on size (rough formula for fish)
    const estimatedWeight = Math.pow(size, 2.8) / 180;
    const weight = Math.max(0.1, estimatedWeight + (Math.random() - 0.5) * estimatedWeight * 0.3);

    return {
      size: `${size.toFixed(1)}`,
      weight: weight < 1 ? `${(weight * 16).toFixed(1)} oz` : `${weight.toFixed(1)} lbs`
    };
  }
}
