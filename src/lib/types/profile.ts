// Types matching the database schema

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
  age?: number | null;
  gender?: string | null;
  locationCoordinates?: string | null;
  lastActive?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

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
  gameplayVideos?: string[] | null;
  equipmentIds?: string[] | null;
  strengths?: string[] | null;
  weaknesses?: string[] | null;
  playingFrequency?: string | null;
  preferredTimes?: string | null;
  travelWillingness?: boolean | null;
  matchTypes?: string[] | null;
  duprId?: string | null;
  primaryPaddleId?: string | null;
  updatedAt: Date;
}

// API response type from the profiles.getCurrent query
export interface ProfileData {
  user: User | null;
  playerProfile: PlayerProfile | null;
}