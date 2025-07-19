export const STORAGE_KEY_PREFIX = 'mm_fishing_demo_';

export interface StorageItem {
  value: any;
  timestamp: number;
  version: string;
}

export const STORAGE_VERSION = '1.0.0';
export const SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours