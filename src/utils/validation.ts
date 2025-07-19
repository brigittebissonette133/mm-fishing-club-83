
import { z } from 'zod';

// User profile validation schemas
export const profileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')
});

// Fish catch validation
export const fishCatchSchema = z.object({
  species: z.string().min(1, 'Species is required').max(50, 'Species name too long'),
  weight: z.number().positive('Weight must be positive').max(1000, 'Weight seems unrealistic'),
  length: z.number().positive('Length must be positive').max(500, 'Length seems unrealistic'),
  location: z.string().max(100, 'Location name too long'),
  date: z.string().datetime('Invalid date format'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional()
});

// File upload validation
export const imageFileSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
  type: z.string().refine(
    (type: string) => ['image/jpeg', 'image/png', 'image/webp'].includes(type),
    'Only JPEG, PNG, and WebP images are allowed'
  ),
  name: z.string().max(255, 'Filename too long')
});

// Enhanced sanitization utilities - text-only processing
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .trim()
    .substring(0, 1000); // Limit length
};

// Safe text extraction using regex instead of DOM manipulation
export const extractSafeText = (content: string): string => {
  if (typeof content !== 'string') {
    return '';
  }
  
  // Use regex to strip HTML tags instead of DOM manipulation
  return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[^;]+;/g, '') // Remove HTML entities
    .trim();
};

// URL validation and sanitization
export const sanitizeUrl = (url: string): string => {
  if (typeof url !== 'string') {
    return '';
  }
  
  try {
    const parsedUrl = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return '';
    }
    return parsedUrl.toString();
  } catch {
    return '';
  }
};

// Rate limiting helper with better memory management and explicit types
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  // Cleanup old entries periodically
  const cleanup = (): void => {
    const now = Date.now();
    const cutoff = now - windowMs * 2;
    
    for (const [key, timestamps] of requests.entries()) {
      const validTimestamps = timestamps.filter((time: number) => time > cutoff);
      if (validTimestamps.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, validTimestamps);
      }
    }
  };
  
  // Run cleanup every 5 minutes
  const cleanupInterval = setInterval(cleanup, 5 * 60 * 1000);
  
  // Return cleanup function for memory management
  const rateLimiter = (identifier: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(identifier)) {
      requests.set(identifier, []);
    }
    
    const userRequests = requests.get(identifier)!;
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter((time: number) => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };

  // Add cleanup method to the returned function
  (rateLimiter as any).cleanup = () => {
    clearInterval(cleanupInterval);
    requests.clear();
  };

  return rateLimiter;
};

// Validation helper functions with enhanced security and explicit types
export const validateAndSanitize = {
  profile: (data: any) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid profile data');
    }
    
    const sanitized = {
      name: sanitizeInput(data.name || ''),
      username: sanitizeInput(data.username || ''),
      email: sanitizeInput(data.email || ''),
      password: data.password || ''
    };
    
    return profileSchema.parse(sanitized);
  },
  
  fishCatch: (data: any) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid catch data');
    }
    
    const sanitized = {
      ...data,
      species: sanitizeInput(data.species || ''),
      location: sanitizeInput(data.location || ''),
      notes: data.notes ? sanitizeInput(data.notes) : undefined
    };
    
    return fishCatchSchema.parse(sanitized);
  },
  
  imageFile: (file: File) => {
    if (!(file instanceof File)) {
      throw new Error('Invalid file object');
    }
    
    return imageFileSchema.parse({
      size: file.size,
      type: file.type,
      name: sanitizeInput(file.name)
    });
  }
};
