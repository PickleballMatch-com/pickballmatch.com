import type { PlayerProfile, User } from '@/lib/types/profile';

// Define profile field requirements
interface ProfileFieldRequirement {
  field: string;
  weight: number;
}

// Basic user fields required for a complete profile
const userRequirements: ProfileFieldRequirement[] = [
  { field: 'firstName', weight: 10 },
  { field: 'lastName', weight: 10 },
  { field: 'profileImageUrl', weight: 15 },
];

// Player profile fields required for a complete profile
const playerProfileRequirements: ProfileFieldRequirement[] = [
  { field: 'skillLevel', weight: 15 },
  { field: 'preferredPlayStyle', weight: 5 },
  { field: 'yearsPlaying', weight: 5 },
  { field: 'bio', weight: 10 },
  { field: 'playingFrequency', weight: 5 },
  { field: 'strengths', weight: 5 }, // Arrays are checked for length > 0
  { field: 'weaknesses', weight: 5 }, // Arrays are checked for length > 0
  { field: 'preferredLocation', weight: 5 },
  { field: 'maxTravelDistance', weight: 5 },
  { field: 'isAvailableToPlay', weight: 5 },
];

// Total weight of all requirements
const totalWeight = userRequirements.reduce((sum, req) => sum + req.weight, 0) +
  playerProfileRequirements.reduce((sum, req) => sum + req.weight, 0);

/**
 * Calculates the completion percentage of a user profile
 * 
 * @param user The user object from the database
 * @param playerProfile The player profile object from the database
 * @returns A number between 0 and 100 representing the completion percentage
 */
export function calculateProfileCompletionPercentage(user: User | null | undefined, playerProfile: PlayerProfile | null | undefined): number {
  if (!user) return 0;
  
  let completedWeight = 0;
  
  // Check user fields
  userRequirements.forEach(req => {
    const value = user[req.field as keyof typeof user];
    if (value !== undefined && value !== null && value !== '') {
      completedWeight += req.weight;
    }
  });
  
  // Check player profile fields if available
  if (playerProfile) {
    playerProfileRequirements.forEach(req => {
      const value = playerProfile[req.field as keyof typeof playerProfile];
      
      // Special handling for array fields
      if (Array.isArray(value)) {
        if (value.length > 0) {
          completedWeight += req.weight;
        }
      } 
      // Special handling for boolean fields
      else if (typeof value === 'boolean') {
        completedWeight += req.weight;
      }
      // Handle normal fields
      else if (value !== undefined && value !== null && value !== '') {
        completedWeight += req.weight;
      }
    });
  }
  
  // Calculate percentage and round to nearest integer
  const percentage = (completedWeight / totalWeight) * 100;
  return Math.round(percentage);
}

/**
 * Determines if a profile is considered complete based on a threshold
 * 
 * @param user The user object from the database
 * @param playerProfile The player profile object from the database
 * @param threshold The completion percentage threshold to be considered complete (default: 70%)
 * @returns True if the profile is considered complete, false otherwise
 */
export function isProfileComplete(user: User | null | undefined, playerProfile: PlayerProfile | null | undefined, threshold = 70): boolean {
  const completionPercentage = calculateProfileCompletionPercentage(user, playerProfile);
  return completionPercentage >= threshold;
}

/**
 * Get a list of missing profile fields that are important for completion
 * 
 * @param user The user object from the database
 * @param playerProfile The player profile object from the database
 * @returns Array of field names that are missing
 */
export function getMissingProfileFields(user: User | null | undefined, playerProfile: PlayerProfile | null | undefined): string[] {
  if (!user) return ['All profile information'];
  
  const missingFields: string[] = [];
  
  // Check user fields
  userRequirements.forEach(req => {
    const value = user[req.field as keyof typeof user];
    if (value === undefined || value === null || value === '') {
      // Convert camelCase to readable format (e.g., firstName -> First Name)
      const readableField = req.field
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      
      missingFields.push(readableField);
    }
  });
  
  // Check player profile fields or report entire playerProfile missing
  if (!playerProfile) {
    missingFields.push('Player profile information');
  } else {
    playerProfileRequirements.forEach(req => {
      const value = playerProfile[req.field as keyof typeof playerProfile];
      
      let isMissing = false;
      
      // Special handling for array fields
      if (Array.isArray(value)) {
        if (value.length === 0) {
          isMissing = true;
        }
      } 
      // Handle normal fields (except booleans which are always considered filled)
      else if (typeof value !== 'boolean' && (value === undefined || value === null || value === '')) {
        isMissing = true;
      }
      
      if (isMissing) {
        // Convert camelCase to readable format (e.g., preferredPlayStyle -> Preferred Play Style)
        const readableField = req.field
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        
        missingFields.push(readableField);
      }
    });
  }
  
  return missingFields;
}