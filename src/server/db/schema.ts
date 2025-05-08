import { pgTable, serial, text, timestamp, boolean, integer, date, real, primaryKey, uuid } from 'drizzle-orm/pg-core';

// Users table (will be connected to Clerk for auth)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Maps to Clerk user ID
  email: text('email').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  profileImageUrl: text('profile_image_url'),
  age: integer('age'),
  gender: text('gender'),
  locationCoordinates: text('location_coordinates'), // For geo-based matching
  lastActive: timestamp('last_active'), // Last user activity timestamp
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User profile with pickleball-specific details
export const playerProfiles = pgTable('player_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  skillLevel: text('skill_level').notNull(), // e.g., '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'
  preferredPlayStyle: text('preferred_play_style'), // e.g., 'singles', 'doubles', 'mixed doubles'
  yearsPlaying: integer('years_playing'),
  preferredLocation: text('preferred_location'),
  bio: text('bio'),
  availability: text('availability'), // JSON string of availability schedule
  maxTravelDistance: integer('max_travel_distance'), // in miles/km
  isAvailableToPlay: boolean('is_available_to_play').default(true),
  videoIntroUrl: text('video_intro_url'), // For 60-second introduction videos
  gameplayVideos: text('gameplay_videos').array(), // For 60-second gameplay footage
  equipmentIds: text('equipment_ids').array(), // References to current equipment
  strengths: text('strengths').array(), // Player's pickleball strengths
  weaknesses: text('weaknesses').array(), // Player's areas for improvement
  playingFrequency: text('playing_frequency'), // 'daily', 'weekly', 'monthly'
  preferredTimes: text('preferred_times'), // JSON structure of preferred playing times
  travelWillingness: boolean('travel_willingness').default(false),
  matchTypes: text('match_types').array(), // Types of matches interested in
  duprId: text('dupr_id'), // DUPR ID for API integration
  primaryPaddleId: uuid('primary_paddle_id').references(() => equipments.id),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Match requests
export const matchRequests = pgTable('match_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  requesterId: text('requester_id').references(() => users.id).notNull(),
  recipientId: text('recipient_id').references(() => users.id).notNull(),
  status: text('status').default('pending').notNull(), // 'pending', 'accepted', 'declined'
  proposedTime: timestamp('proposed_time').notNull(),
  proposedLocation: text('proposed_location'),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Scheduled matches
export const matches = pgTable('matches', {
  id: uuid('id').defaultRandom().primaryKey(),
  matchRequestId: uuid('match_request_id').references(() => matchRequests.id),
  status: text('status').default('scheduled').notNull(), // 'scheduled', 'completed', 'cancelled'
  scheduledTime: timestamp('scheduled_time').notNull(),
  location: text('location').notNull(),
  playerIds: text('player_ids').array().notNull(), // Array of user IDs
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


// Updated messages table with conversation reference
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
  senderId: text('sender_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  type: text('type').default('text'), // 'text', 'photo', 'location', 'request'
  recipientId: text('recipient_id').references(() => users.id).notNull(),
  read: boolean('read').default(false),
  readBy: text('read_by').array(), // Array of user IDs who've read the message
  matchRequestId: uuid('match_request_id').references(() => matchRequests.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User ratings and reviews after matches
export const ratings = pgTable('ratings', {
  id: uuid('id').defaultRandom().primaryKey(),
  raterId: text('rater_id').references(() => users.id).notNull(),
  ratedUserId: text('rated_user_id').references(() => users.id).notNull(),
  matchId: uuid('match_id').references(() => matches.id).notNull(),
  rating: integer('rating').notNull(), // e.g., 1-5
  review: text('review'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}); 

// Travel System
export const travelPlans = pgTable('travel_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  destination: text('destination').notNull(),
  arrivalDate: date('arrival_date').notNull(),
  departureDate: date('departure_date').notNull(),
  purpose: text('purpose').array(), // 'casual', 'tournament', 'drilling'
  visibilitySettings: text('visibility_settings').default('public'),
  lookingFor: text('looking_for').array(), // What the traveler is seeking
  localNotifications: boolean('local_notifications').default(true), // Whether to notify locals
  visibilityLevel: text('visibility_level').default('public'), // Control who can see the travel plan
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tournament System
export const tournaments = pgTable('tournaments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  skillLevels: text('skill_levels').array(),
  description: text('description'),
  registrationUrl: text('registration_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tournamentPartners = pgTable('tournament_partners', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  tournamentId: uuid('tournament_id').references(() => tournaments.id),
  eventType: text('event_type').notNull(), // 'mens', 'womens', 'mixed'
  skillLevel: text('skill_level').notNull(),
  status: text('status').default('seeking'),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Community Features
export const communities = pgTable('communities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'city', 'interest', 'club'
  location: text('location'),
  description: text('description'),
  createdBy: text('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const communityMembers = pgTable('community_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  communityId: uuid('community_id').references(() => communities.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  role: text('role').default('member'), // 'admin', 'moderator', 'member'
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  communityId: uuid('community_id').references(() => communities.id),
  authorId: text('author_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  type: text('type').default('discussion'), // 'discussion', 'event', 'announcement'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Equipment Tracking
export const equipments = pgTable('equipments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // 'paddle', 'shoes', 'ball'
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  purchaseDate: date('purchase_date'),
  replacementDate: date('replacement_date'),
  isCurrentlyUsed: boolean('is_currently_used').default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const equipmentReviews = pgTable('equipment_reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  equipmentId: uuid('equipment_id').references(() => equipments.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(), // 1-5
  review: text('review'),
  affiliateLink: text('affiliate_link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Subscription Management
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  plan: text('plan').notNull(), // 'premium', 'elite'
  status: text('status').notNull(), // 'active', 'canceled', 'expired'
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  paymentProvider: text('payment_provider'),
  paymentProviderId: text('payment_provider_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
// Enhanced dating profiles to ensure complete separation
export const datingProfiles = pgTable('dating_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  isActive: boolean('is_active').default(true),
  bio: text('bio'),
  height: integer('height'), // In cm
  bodyType: text('body_type'),
  education: text('education'),
  occupation: text('occupation'),
  lookingFor: text('looking_for').array(), // 'relationship', 'casual', 'friendship'
  interestedIn: text('interested_in').array(), // 'men', 'women', 'nonbinary'
  relationshipStatus: text('relationship_status'),
  hasChildren: boolean('has_children'),
  wantsChildren: boolean('wants_children'),
  religion: text('religion'),
  drinking: text('drinking'), // 'never', 'socially', 'regularly'
  smoking: text('smoking'), // 'never', 'socially', 'regularly'
  personalityType: text('personality_type'),
  interests: text('interests').array(), // Non-pickleball interests
  showInDating: boolean('show_in_dating').default(true),
  hideFromRegular: boolean('hide_from_regular').default(false),
  verificationLevel: text('verification_level').default('basic'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Dating-specific photos (separate from regular profile photos)
export const datingPhotos = pgTable('dating_photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  datingProfileId: uuid('dating_profile_id').references(() => datingProfiles.id).notNull(),
  photoUrl: text('photo_url').notNull(),
  order: integer('order').default(0),
  isDefault: boolean('is_default').default(false),
  approvalStatus: text('approval_status').default('pending'), // 'pending', 'approved', 'rejected'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Dating-specific messaging
export const datingConversations = pgTable('dating_conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId1: text('user_id_1').references(() => users.id).notNull(),
  userId2: text('user_id_2').references(() => users.id).notNull(),
  status: text('status').default('active'), // 'active', 'archived', 'blocked'
  lastMessageAt: timestamp('last_message_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Dating messages
export const datingMessages = pgTable('dating_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id').references(() => datingConversations.id).notNull(),
  senderId: text('sender_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // 'match', 'message', 'travel', etc.
  content: text('content').notNull(),
  relatedId: text('related_id'), // ID of related entity
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notificationSettings = pgTable('notification_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // 'match', 'message', 'travel', etc.
  email: boolean('email').default(true),
  push: boolean('push').default(true),
  inApp: boolean('in_app').default(true),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Swipe Mechanics & Matching
export const swipeActions = pgTable('swipe_actions', {
  id: uuid('id').defaultRandom().primaryKey(),
  swiperId: text('swiper_id').references(() => users.id).notNull(),
  swipedUserId: text('swiped_user_id').references(() => users.id).notNull(),
  action: text('action').notNull(), // 'like', 'pass', 'superlike'
  matchType: text('match_type').notNull(), // 'casual', 'tournament', 'drilling', 'travel', 'dating'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reachOutLists = pgTable('reach_out_lists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  targetUserId: text('target_user_id').references(() => users.id).notNull(),
  matchType: text('match_type').notNull(),
  status: text('status').default('pending'), // 'pending', 'contacted', 'archived'
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Preferences
export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  ageRangeMin: integer('age_range_min'),
  ageRangeMax: integer('age_range_max'),
  skillRangeMin: text('skill_range_min'),
  skillRangeMax: text('skill_range_max'),
  genderPreference: text('gender_preference').array(),
  maxDistance: integer('max_distance'), // in miles/km
  matchTypesInterested: text('match_types_interested').array(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Availability Calendar
export const availabilities = pgTable('availabilities', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  dayOfWeek: integer('day_of_week').notNull(), // 0-6 for Sunday-Saturday
  startTime: text('start_time').notNull(), // '09:00', '14:30', etc.
  endTime: text('end_time').notNull(),
  recurring: boolean('recurring').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Single-day specific availability
export const specificAvailabilities = pgTable('specific_availabilities', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  date: date('date').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Courts and Venues
export const venues = pgTable('venues', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state'),
  country: text('country').notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  courtCount: integer('court_count'),
  indoorOutdoor: text('indoor_outdoor'), // 'indoor', 'outdoor', 'both'
  website: text('website'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const venueReviews = pgTable('venue_reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  venueId: uuid('venue_id').references(() => venues.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(), // 1-5
  review: text('review'),
  courtConditions: text('court_conditions'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Clubs
export const clubs = pgTable('clubs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  venueId: uuid('venue_id').references(() => venues.id),
  description: text('description'),
  website: text('website'),
  foundedYear: integer('founded_year'),
  membershipInfo: text('membership_info'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clubMembers = pgTable('club_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  clubId: uuid('club_id').references(() => clubs.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  role: text('role').default('member'), // 'admin', 'organizer', 'member'
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// Events
export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  venueId: uuid('venue_id').references(() => venues.id),
  clubId: uuid('club_id').references(() => clubs.id),
  organizerId: text('organizer_id').references(() => users.id).notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  maxParticipants: integer('max_participants'),
  eventType: text('event_type').notNull(), // 'social', 'tournament', 'clinic', 'drill'
  skillLevel: text('skill_level').array(), // ['2.5', '3.0', etc.]
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const eventParticipants = pgTable('event_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  status: text('status').default('registered'), // 'registered', 'waitlisted', 'canceled'
  registeredAt: timestamp('registered_at').defaultNow().notNull(),
});

// Enhanced dating features
export const datingPreferences = pgTable('dating_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  ageRangeMin: integer('age_range_min'),
  ageRangeMax: integer('age_range_max'),
  interestedIn: text('interested_in').array(), // ['men', 'women', 'nonbinary']
  relationshipGoals: text('relationship_goals').array(), // ['casual', 'serious', 'friends'] 
  maxDistance: integer('max_distance'),
  hideFromRegular: boolean('hide_from_regular').default(false),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const datingMatches = pgTable('dating_matches', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId1: text('user_id_1').references(() => users.id).notNull(),
  userId2: text('user_id_2').references(() => users.id).notNull(),
  status: text('status').default('matched'), // 'matched', 'chatting', 'met', 'unmatched'
  matchedAt: timestamp('matched_at').defaultNow().notNull(),
});

// Travel host program
export const travelHosts = pgTable('travel_hosts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  city: text('city').notNull(),
  state: text('state'),
  country: text('country').notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  verificationStatus: text('verification_status').default('pending'), // 'pending', 'verified', 'rejected'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Local court information
export const courtTips = pgTable('court_tips', {
  id: uuid('id').defaultRandom().primaryKey(),
  venueId: uuid('venue_id').references(() => venues.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  tip: text('tip').notNull(),
  tipType: text('tip_type').default('general'), // 'general', 'parking', 'best times', 'amenities'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tournament teams
export const tournamentTeams = pgTable('tournament_teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  tournamentId: uuid('tournament_id').references(() => tournaments.id).notNull(),
  player1Id: text('player_1_id').references(() => users.id).notNull(),
  player2Id: text('player_2_id').references(() => users.id).notNull(),
  teamName: text('team_name'),
  division: text('division').notNull(), // 'mens', 'womens', 'mixed'
  skillLevel: text('skill_level').notNull(),
  registrationStatus: text('registration_status').default('registered'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tournament results
export const tournamentResults = pgTable('tournament_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  tournamentId: uuid('tournament_id').references(() => tournaments.id).notNull(),
  teamId: uuid('team_id').references(() => tournamentTeams.id),
  division: text('division').notNull(),
  placement: integer('placement'), // 1 = 1st place, 2 = 2nd place, etc.
  medalType: text('medal_type'), // 'gold', 'silver', 'bronze'
  notes: text('notes'),
  verifiedBy: text('verified_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blocked users (for safety/moderation)
export const blockedUsers = pgTable('blocked_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  blockerId: text('blocker_id').references(() => users.id).notNull(),
  blockedUserId: text('blocked_user_id').references(() => users.id).notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Reports (for moderation)
export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  reporterId: text('reporter_id').references(() => users.id).notNull(),
  reportedUserId: text('reported_user_id').references(() => users.id).notNull(),
  reason: text('reason').notNull(),
  details: text('details'),
  status: text('status').default('pending'), // 'pending', 'reviewed', 'actioned', 'dismissed'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Media management
export const userMedias = pgTable('user_medias', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // 'profile_photo', 'intro_video', 'gameplay_video', 'drilling_video', 'dating_photo', 'court_photo', 'dating_video'
  url: text('url').notNull(),
  order: integer('order').default(0), // For ordering multiple photos/videos
  isDefault: boolean('is_default').default(false),
  caption: text('caption'),
  durationSeconds: integer('duration_seconds'), // For videos
  thumbnailUrl: text('thumbnail_url'), // For videos
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Conversations (for organizing messages)
export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  participants: text('participants').array().notNull(), // Array of user IDs
  type: text('type').default('direct'), // 'direct', 'group'
  lastActivity: timestamp('last_activity').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Device management for notifications
export const userDevices = pgTable('user_devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  deviceToken: text('device_token').notNull(),
  deviceType: text('device_type').notNull(), // 'ios', 'android', 'web'
  deviceName: text('device_name'),
  lastActive: timestamp('last_active').defaultNow().notNull(),
  notificationsEnabled: boolean('notifications_enabled').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payment history
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
  amount: real('amount').notNull(),
  currency: text('currency').default('USD').notNull(),
  status: text('status').notNull(), // 'succeeded', 'failed', 'refunded'
  paymentProvider: text('payment_provider').notNull(), // 'stripe', 'paypal'
  paymentIntentId: text('payment_intent_id'),
  billingPeriodStart: timestamp('billing_period_start'),
  billingPeriodEnd: timestamp('billing_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Rating history
export const duprHistories = pgTable('dupr_histories', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  oldRating: text('old_rating'),
  newRating: text('new_rating').notNull(),
  changeDate: timestamp('change_date').defaultNow().notNull(),
  source: text('source').default('dupr_api'), // 'dupr_api', 'self_reported', 'verified_tournament'
  notes: text('notes'),
});

// User activity tracking
export const userActivities = pgTable('user_activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  activityType: text('activity_type').notNull(), // 'login', 'match_created', 'message_sent', 'profile_view', etc.
  metadata: text('metadata'), // JSON string with activity details
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Court conditions updates
export const courtConditions = pgTable('court_conditions', {
  id: uuid('id').defaultRandom().primaryKey(),
  venueId: uuid('venue_id').references(() => venues.id).notNull(),
  reporterId: text('reporter_id').references(() => users.id).notNull(),
  condition: text('condition').notNull(), // 'excellent', 'good', 'fair', 'poor'
  details: text('details'),
  issueTags: text('issue_tags').array(), // ['cracks', 'net_issues', 'lighting']
  photoUrl: text('photo_url'),
  reportDate: timestamp('report_date').defaultNow().notNull(),
});

// Community challenges
export const challenges = pgTable('challenges', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  creatorId: text('creator_id').references(() => users.id).notNull(),
  communityId: uuid('community_id').references(() => communities.id),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  challengeType: text('challenge_type').notNull(), // 'skill', 'participation', 'streak'
  rewards: text('rewards'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const challengeParticipants = pgTable('challenge_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  challengeId: uuid('challenge_id').references(() => challenges.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  progress: integer('progress').default(0),
  completed: boolean('completed').default(false),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// Feature flags - for controlling access to features by plan
export const featureFlags = pgTable('feature_flags', {
  id: uuid('id').defaultRandom().primaryKey(),
  feature: text('feature').notNull(), // 'unlimited_swipes', 'video_messaging', etc.
  planRequired: text('plan_required'), // null, 'premium', 'elite'
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User saved searches and filters
export const savedFilters = pgTable('saved_filters', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  filterData: text('filter_data').notNull(), // JSON string with filter settings
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// DUPR API integration settings
export const duprApiSettings = pgTable('dupr_api_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  duprId: text('dupr_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiry: timestamp('token_expiry'),
  autoSync: boolean('auto_sync').default(true),
  lastSyncDate: timestamp('last_sync_date'),
  syncFrequency: text('sync_frequency').default('daily'), // 'daily', 'weekly', 'manual'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// DUPR sync log
export const duprSyncLog = pgTable('dupr_sync_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  syncStarted: timestamp('sync_started').defaultNow().notNull(),
  syncCompleted: timestamp('sync_completed'),
  status: text('status').default('in_progress'), // 'in_progress', 'completed', 'failed'
  matchesAdded: integer('matches_added').default(0),
  ratingUpdated: boolean('rating_updated').default(false),
  errorMessage: text('error_message'),
});

// DUPR Match History Table (matches the DUPR import CSV format)
export const duprMatches = pgTable('dupr_matches', {
  id: uuid('id').defaultRandom().primaryKey(),
  matchType: text('match_type').notNull(), // 'S' for singles, 'D' for doubles
  event: text('event').notNull(), // Event name including division info
  date: date('date').notNull(),
  // Team A players
  playerA1Id: text('player_a1_id').references(() => users.id),
  playerA1DuprId: text('player_a1_dupr_id'),
  playerA2Id: text('player_a2_id').references(() => users.id), // Null for singles
  playerA2DuprId: text('player_a2_dupr_id'), // Null for singles
  // Team B players
  playerB1Id: text('player_b1_id').references(() => users.id),
  playerB1DuprId: text('player_b1_dupr_id'),
  playerB2Id: text('player_b2_id').references(() => users.id), // Null for singles
  playerB2DuprId: text('player_b2_dupr_id'), // Null for singles
  // Scores for up to 5 games
  teamAGame1: integer('team_a_game1'),
  teamBGame1: integer('team_b_game1'),
  teamAGame2: integer('team_a_game2'),
  teamBGame2: integer('team_b_game2'),
  teamAGame3: integer('team_a_game3'),
  teamBGame3: integer('team_b_game3'),
  teamAGame4: integer('team_a_game4'),
  teamBGame4: integer('team_b_game4'),
  teamAGame5: integer('team_a_game5'),
  teamBGame5: integer('team_b_game5'),
  // Match result calculation
  teamAWon: boolean('team_a_won'),
  // Additional metadata
  eventCategory: text('event_category'), // 'tournament', 'league', 'casual', 'drill'
  importedAt: timestamp('imported_at').defaultNow().notNull(),
  importedBy: text('imported_by').references(() => users.id),
  source: text('source').default('dupr_import'), // 'dupr_import', 'manual_entry', 'scraped'
});

// Player Partnerships Analysis Table
export const playerPartnerships = pgTable('player_partnerships', {
  id: uuid('id').defaultRandom().primaryKey(),
  player1Id: text('player1_id').references(() => users.id).notNull(),
  player2Id: text('player2_id').references(() => users.id).notNull(),
  // Overall stats
  matchesPlayed: integer('matches_played').default(0),
  matchesWon: integer('matches_won').default(0),
  matchesLost: integer('matches_lost').default(0),
  winPercentage: real('win_percentage').default(0),
  // Tournament stats
  tournamentMatchesPlayed: integer('tournament_matches_played').default(0),
  tournamentMatchesWon: integer('tournament_matches_won').default(0),
  tournamentWinPercentage: real('tournament_win_percentage').default(0),
  // League stats
  leagueMatchesPlayed: integer('league_matches_played').default(0),
  leagueMatchesWon: integer('league_matches_won').default(0),
  leagueWinPercentage: real('league_win_percentage').default(0),
  // Casual stats
  casualMatchesPlayed: integer('casual_matches_played').default(0),
  casualMatchesWon: integer('casual_matches_won').default(0),
  casualWinPercentage: real('casual_win_percentage').default(0),
  // Timing
  firstPlayedDate: date('first_played_date'),
  lastPlayedDate: date('last_played_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Player vs Player History
export const playerVsPlayerHistory = pgTable('player_vs_player_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamAPlayer1Id: text('team_a_player1_id').references(() => users.id).notNull(),
  teamAPlayer2Id: text('team_a_player2_id').references(() => users.id),
  teamBPlayer1Id: text('team_b_player1_id').references(() => users.id).notNull(),
  teamBPlayer2Id: text('team_b_player2_id').references(() => users.id),
  matchesPlayed: integer('matches_played').default(0),
  teamAWins: integer('team_a_wins').default(0),
  teamBWins: integer('team_b_wins').default(0),
  lastPlayedDate: date('last_played_date'),
  eventCategories: text('event_categories').array(), // Which categories have they played in
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Supported languages
export const supportedLanguages = pgTable('supported_languages', {
  id: uuid('id').defaultRandom().primaryKey(),
  languageCode: text('language_code').notNull().unique(), // 'en', 'es', 'fr', etc.
  languageName: text('language_name').notNull(),
  nativeName: text('native_name').notNull(),
  isActive: boolean('is_active').default(true),
  isDefault: boolean('is_default').default(false),
  rtl: boolean('rtl').default(false), // Right-to-left script
  dateFormat: text('date_format').default('YYYY-MM-DD'),
  timeFormat: text('time_format').default('HH:mm'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User language preferences
export const userLanguagePreferences = pgTable('user_language_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  preferredLanguage: text('preferred_language').references(() => supportedLanguages.languageCode).notNull(),
  secondaryLanguages: text('secondary_languages').array(),
  translationEnabled: boolean('translation_enabled').default(true),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Translated content
export const contentTranslations = pgTable('content_translations', {
  id: uuid('id').defaultRandom().primaryKey(),
  contentType: text('content_type').notNull(), // 'ui_element', 'email', 'notification', 'system_message'
  contentKey: text('content_key').notNull(), // Identifier for the content
  languageCode: text('language_code').references(() => supportedLanguages.languageCode).notNull(),
  translatedContent: text('translated_content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Regional settings
export const regionalSettings = pgTable('regional_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  countryCode: text('country_code').notNull().unique(),
  countryName: text('country_name').notNull(),
  defaultLanguage: text('default_language').references(() => supportedLanguages.languageCode),
  defaultCurrency: text('default_currency'),
  timeZone: text('time_zone'),
  dateFormat: text('date_format'),
  measurementSystem: text('measurement_system'), // 'metric', 'imperial'
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Ad campaigns
export const adCampaigns = pgTable('ad_campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  advertiser: text('advertiser').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  status: text('status').default('draft'), // 'draft', 'active', 'paused', 'completed'
  budget: real('budget'),
  spentToDate: real('spent_to_date').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Ad creatives
export const adCreatives = pgTable('ad_creatives', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => adCampaigns.id).notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'banner', 'native', 'video', 'text'
  mediaUrl: text('media_url'),
  headline: text('headline'),
  description: text('description'),
  ctaText: text('cta_text'), // Call to action
  destinationUrl: text('destination_url').notNull(),
  dimensions: text('dimensions'), // e.g. '300x250'
  language: text('language').default('en'),
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Ad targeting
export const adTargeting = pgTable('ad_targeting', {
  id: uuid('id').defaultRandom().primaryKey(),
  creativeId: uuid('creative_id').references(() => adCreatives.id).notNull(),
  countries: text('countries').array(), // Country codes to target
  languages: text('languages').array(), // Language codes to target
  ageMin: integer('age_min'),
  ageMax: integer('age_max'),
  genders: text('genders').array(),
  skillLevels: text('skill_levels').array(), // Target specific DUPR ranges
  userTypes: text('user_types').array(), // 'premium', 'free', 'dating_enabled'
  deviceTypes: text('device_types').array(), // 'mobile', 'desktop', 'tablet'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Ad impressions
export const adImpressions = pgTable('ad_impressions', {
  id: uuid('id').defaultRandom().primaryKey(),
  creativeId: uuid('creative_id').references(() => adCreatives.id).notNull(),
  userId: text('user_id').references(() => users.id),
  sessionId: text('session_id'),
  placementLocation: text('placement_location'), // Where the ad appeared
  ipAddress: text('ip_address'),
  country: text('country'),
  deviceType: text('device_type'),
  browser: text('browser'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// Ad clicks
export const adClicks = pgTable('ad_clicks', {
  id: uuid('id').defaultRandom().primaryKey(),
  impressionId: uuid('impression_id').references(() => adImpressions.id).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// Ad conversions
export const adConversions = pgTable('ad_conversions', {
  id: uuid('id').defaultRandom().primaryKey(),
  clickId: uuid('click_id').references(() => adClicks.id),
  conversionType: text('conversion_type').notNull(), // 'signup', 'premium_subscription', 'store_purchase'
  conversionValue: real('conversion_value'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// Referral program
export const referrals = pgTable('referrals', {
  id: uuid('id').defaultRandom().primaryKey(),
  referrerId: text('referrer_id').references(() => users.id).notNull(),
  referralCode: text('referral_code').notNull(),
  referralUrl: text('referral_url'),
  rewardAmount: real('reward_amount'),
  rewardType: text('reward_type'), // 'credit', 'premium_days', 'cash'
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const referralSignups = pgTable('referral_signups', {
  id: uuid('id').defaultRandom().primaryKey(),
  referralId: uuid('referral_id').references(() => referrals.id).notNull(),
  referredUserId: text('referred_user_id').references(() => users.id).notNull(),
  status: text('status').default('pending'), // 'pending', 'qualified', 'rewarded'
  rewardPaid: boolean('reward_paid').default(false),
  signupDate: timestamp('signup_date').defaultNow().notNull(),
  qualificationDate: timestamp('qualification_date'),
});

// Official equipment catalog
export const equipmentCatalog = pgTable('equipment_catalog', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(), // 'paddle', 'shoes', 'ball', 'apparel', 'accessories'
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  description: text('description'),
  specifications: text('specifications'), // JSON string with specs
  msrp: real('msrp'), // Manufacturer suggested retail price
  releaseDate: date('release_date'),
  isActive: boolean('is_active').default(true),
  featuredRanking: integer('featured_ranking'), // For store display priority
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Official equipment reviews by site/experts
export const officialEquipmentReviews = pgTable('official_equipment_reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  equipmentCatalogId: uuid('equipment_catalog_id').references(() => equipmentCatalog.id).notNull(),
  authorId: text('author_id').references(() => users.id), // If reviewer is a user/expert
  authorName: text('author_name'), // If external reviewer
  rating: real('rating').notNull(), // 1-5 scale with decimals
  reviewTitle: text('review_title').notNull(),
  reviewContent: text('review_content').notNull(),
  pros: text('pros').array(),
  cons: text('cons').array(),
  videoReviewUrl: text('video_review_url'),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Affiliate links and tracking
export const affiliateLinks = pgTable('affiliate_links', {
  id: uuid('id').defaultRandom().primaryKey(),
  equipmentCatalogId: uuid('equipment_catalog_id').references(() => equipmentCatalog.id),
  retailer: text('retailer').notNull(), // 'amazon', 'pickleballcentral', etc.
  affiliateUrl: text('affiliate_url').notNull(),
  affiliateCode: text('affiliate_code'),
  commissionRate: real('commission_rate'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Affiliate link clicks
export const affiliateClicks = pgTable('affiliate_clicks', {
  id: uuid('id').defaultRandom().primaryKey(),
  affiliateLinkId: uuid('affiliate_link_id').references(() => affiliateLinks.id).notNull(),
  userId: text('user_id').references(() => users.id),
  referralSource: text('referral_source'), // page or section where click originated
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  clickedAt: timestamp('clicked_at').defaultNow().notNull(),
});

// Affiliate conversions/purchases
export const affiliateConversions = pgTable('affiliate_conversions', {
  id: uuid('id').defaultRandom().primaryKey(),
  affiliateLinkId: uuid('affiliate_link_id').references(() => affiliateLinks.id).notNull(),
  userId: text('user_id').references(() => users.id),
  orderId: text('order_id'),
  orderValue: real('order_value'),
  commissionEarned: real('commission_earned'),
  status: text('status').default('pending'), // 'pending', 'confirmed', 'paid'
  conversionDate: timestamp('conversion_date').defaultNow().notNull(),
});

// Store orders (if implementing our own store)
export const storeOrders = pgTable('store_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  orderTotal: real('order_total').notNull(),
  status: text('status').default('pending'), // 'pending', 'processing', 'shipped', 'delivered', 'canceled'
  shippingAddress: text('shipping_address'),
  billingAddress: text('billing_address'),
  paymentMethod: text('payment_method'),
  paymentStatus: text('payment_status').default('pending'),
  shippingMethod: text('shipping_method'),
  trackingNumber: text('tracking_number'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => storeOrders.id).notNull(),
  equipmentCatalogId: uuid('equipment_catalog_id').references(() => equipmentCatalog.id).notNull(),
  quantity: integer('quantity').notNull(),
  pricePerUnit: real('price_per_unit').notNull(),
  discountAmount: real('discount_amount').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});