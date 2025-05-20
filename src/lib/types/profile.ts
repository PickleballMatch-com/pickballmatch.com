// Types matching the database schema

/**
 * User types: DB uses Date objects, but over the network, these become
 * string ISO dates, so we need to accommodate both types.
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
  age?: number | null;
  gender?: string | null;
  locationCoordinates?: string | null;
  lastActive?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * PlayerProfile types: Arrays may be serialized differently across environments,
 * and dates may come as strings from the API.
 */
export interface PlayerProfile {
  id: string;
  userId: string;
  skillLevel: string;
  preferredPlayStyle?: string | null;
  yearsPlaying?: number | null;
  preferredLocation?: string | null;
  bio?: string | null;
  availability?: string | null;
  maxTravelDistance?: number | null;
  isAvailableToPlay?: boolean | null;
  videoIntroUrl?: string | null;
  gameplayVideos?: string[] | null | any; // Handle different serializations
  equipmentIds?: string[] | null | any; // Handle different serializations
  strengths?: string[] | null | any; // Handle different serializations
  weaknesses?: string[] | null | any; // Handle different serializations
  playingFrequency?: string | null;
  preferredTimes?: string | null;
  travelWillingness?: boolean | null;
  matchTypes?: string[] | null | any; // Handle different serializations
  duprId?: string | null;
  primaryPaddleId?: string | null;
  updatedAt: Date | string;
}

// API response type from the profiles.getCurrent query
export interface ProfileData {
  user: User | null;
  playerProfile: PlayerProfile | null;
}