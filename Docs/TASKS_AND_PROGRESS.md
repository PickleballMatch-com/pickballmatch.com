# Tasks and Progress - Pickleball Match

**Version:** 1.0
**Last Updated:** 2024-05-16 (by AI Assistant)

This document tracks the tasks and progress for the Pickleball Match application.
Status Legend:
- `[ ]` To Do
- `[x]` Done
- `[~]` In Progress
- `[!]` Blocked

---

## Phase 0: Planning & Setup (Completed)

This phase focused on initial planning, documentation, and setting up the foundational technical infrastructure.

### 0.1. Documentation & Planning
- [x] Initial Concept Discussion & PRD v1 Creation
- [x] Refine PRD with Travel/Dating Features (Resulting in PRD v2)
- [x] Create Technical PRD v2.0 (Now `Docs/01_PRODUCT_REQUIREMENTS.md`)
- [x] Create Project Tracker (This document supersedes parts of it)
- [x] Create Detailed User Flows (Now `Docs/02a_USER_FLOWS_DETAIL.md`)
- [x] Create Wireframes/Mockups (Located in `Docs/wireframes and mockups/`)
- [x] Finalize Tech Stack Decisions (Now part of `Docs/03_SYSTEM_ARCHITECTURE.md`)
- [x] Create Project Charter (`Docs/00_PROJECT_CHARTER.md`)
- [x] Create Development Standards (`Docs/05_DEVELOPMENT_STANDARDS.md`)
- [x] Create High-Level Roadmap (`Docs/ROADMAP.md`)

### 0.2. Technical Setup
- [x] Set up Development Environment
- [x] Initialize Git Repository & Branch Structure (`main`, `develop`, `feature/*`)
- [x] Set up Project Structure (Next.js App Router, TypeScript)
- [x] Configure Next.js with TypeScript (`next.config.ts`, `tsconfig.json`)
- [x] Set up PostgreSQL Database (Drizzle ORM, schema `src/server/db/schema.ts`)
    - [x] Create initial Drizzle schema (User, PlayerProfile, etc.)
    - [x] Implement initial migrations
    - [x] Database connection utility (`src/server/db/index.ts`)
- [x] Configure Clerk Authentication
    - [x] Set up Clerk Provider (`src/app/layout.tsx`)
    *   [x] Configure Authentication Middleware (`src/middleware.ts`)
    *   [x] Basic Sign-in/Sign-up Pages (`src/app/(auth)/...`)
    *   [x] Custom Auth UI (AuthModal, UserDropdown)
- [x] Set up tRPC
    *   [x] tRPC Initialization (`src/server/trpc/index.ts`)
    *   [x] Root Router (`src/server/api/root.ts`)
    *   [x] API Handler (`src/app/api/trpc/[trpc]/route.ts`)
    *   [x] Client Provider (`src/lib/trpc/provider.tsx`)
- [x] Configure Tailwind CSS & shadcn/ui
    *   [x] `tailwind.config.ts`, `postcss.config.mjs`
    *   [x] `globals.css` with brand colors
    *   [x] Install core shadcn/ui components (Button, Card, Input, etc.)
    *   [x] Create common UI components (`src/components/common/`)
- [ ] Set up Testing Framework (Jest/React Testing Library)
    - [x] Initial setup
    - [ ] Configure for unit tests
    - [ ] Configure for integration tests
    - [ ] Configure for component tests
- [x] ESLint and Prettier Configuration

### 0.3. Third-party Accounts Setup (Assumed Initiated / In Progress by User)
- [~] Create Clerk account
- [~] Set up PostgreSQL provider (e.g., Railway)
- [ ] Create Stripe account
- [ ] Get DUPR API access
- [ ] Set up Google Cloud (Maps, Storage, Translate)
- [ ] Set up email service (e.g., SendGrid)
- [ ] Set up real-time service (e.g., Socket.io hosting or Pusher/Ably)


---

## Phase 1: Core MVP Features

This phase focuses on building the essential features for users to create profiles, find matches, and communicate.

### 1.1. User Authentication & Profile Foundation (Partially Done)
    *   **Status:** Authentication setup mostly done. Profile foundation in progress.
    *   **Files:** `src/app/(auth)/`, `src/middleware.ts`, `src/components/auth/`, `src/server/api/routers/users.ts`, `src/server/api/routers/profiles.ts`, `src/lib/hooks/useProfileSync.ts`, `src/components/profile/`

#### 1.1.1. Database Schema for Users & Profiles
- [x] Define `users` table schema (`src/server/db/schema.ts`)
- [x] Define `playerProfiles` table schema (`src/server/db/schema.ts`)
- [x] Define relationships between `users` and `playerProfiles`
- [x] Create and run migrations for these tables

#### 1.1.2. Authentication Flow (Clerk Integration)
- [x] Basic Sign-Up Page (`src/app/(auth)/sign-up/...`)
- [x] Basic Sign-In Page (`src/app/(auth)/sign-in/...`)
- [x] SSO Callback Page (`src/app/(auth)/sso-callback/...`)
- [x] Protected Routes Layout (`src/app/(protected)/layout.tsx`)
- [x] Auth Navigation Components (`AuthNav.tsx`, `UserDropdown.tsx`)
- [x] Custom Auth Modal (`AuthModal.tsx`)

#### 1.1.3. User Profile API (tRPC)
- [x] `profiles.getCurrent`: Endpoint to get current authenticated user's full profile (user + playerProfile)
- [ ] `profiles.getById`: Endpoint to get a user's public profile by ID
    - [ ] Write unit tests for profiles.getById procedure
- [x] `profiles.syncFromClerk`: Mutation to create/update `users` table entry from Clerk data
    - [ ] Write unit tests for profiles.syncFromClerk mutation
- [x] `profiles.updatePlayerProfile`: Mutation to update `playerProfiles` data
    - [ ] Write unit tests for profiles.updatePlayerProfile mutation

#### 1.1.4. Client-Side Profile Management
- [x] `useProfileSync` hook for client-side data fetching and Clerk sync initiation
- [x] Profile Edit Page (`src/app/profile/edit/page.tsx`)
    - [x] Form for basic `playerProfiles` fields (skillLevel, yearsPlaying, preferredPlayStyle, bio, etc.)
    - [x] Submit logic to call `profiles.updatePlayerProfile`
    - [x] Integration with `useProfileSync` for initial data
- [x] Profile View Page (`src/app/profile/page.tsx`)
    - [x] Display user and player profile information
    - [x] Link to edit profile page

#### 1.1.5. Profile Completion System
- [x] `calculateProfileCompletionPercentage` utility (`src/lib/utils/profileUtils.ts`)
- [x] `getMissingProfileFields` utility (`src/lib/utils/profileUtils.ts`)
- [x] `isProfileComplete` utility (`src/lib/utils/profileUtils.ts`)
- [x] `ProfileCompletionIndicator` component (`src/components/profile/ProfileCompletionIndicator.tsx`)
- [x] `ProfileCompletionPrompt` component (`src/components/profile/ProfileCompletionPrompt.tsx`)
- [x] `ProfileCompletionGuard` component (`src/components/profile/ProfileCompletionGuard.tsx`) for route protection
- [x] Integrate indicators and prompts into Dashboard and Profile pages
- [x] Implement redirects for incomplete profiles via `ProfileCompletionGuard` (e.g., to `/profile/edit`)

### 1.2. Advanced Profile Features
    *   **Status:** Mostly To Do
    *   **Files:** `src/app/profile/edit/page.tsx`, `src/server/api/routers/profiles.ts`, `src/server/db/schema.ts`, potentially new components in `src/components/profile/`

- [ ] **Media Management:**
    - [ ] Profile Photo Upload UI component
    - [ ] Backend logic for handling photo uploads (e.g., to Google Cloud Storage)
        - [ ] API endpoint for generating signed URLs for upload
        - [ ] API endpoint/webhook for confirming upload and updating `users.profileImageUrl`
    - [ ] Video URL Integration (YouTube/Vimeo embeds)
        - [ ] Input fields for video URLs in profile edit form
        - [ ] Component to display embedded videos on profile view
        - [ ] Store video URLs in `playerProfiles.videoIntroUrl` / `playerProfiles.gameplayVideos`
- [ ] **DUPR Integration (Research & Implement):**
    - [ ] Research DUPR API capabilities and access requirements
    - [ ] Create DUPR API client service (`src/lib/duprService.ts` or similar)
    - [ ] UI for connecting DUPR account (OAuth or ID input)
    - [ ] Backend logic to verify DUPR ID and fetch rating
    - [ ] Store DUPR ID and verified rating in `playerProfiles.duprId` and potentially `playerProfiles.skillLevel`
    - [ ] Cron job or webhook for periodic DUPR rating sync (Advanced)
- [ ] **Equipment Tracking:**
    *   **DB Schema:**
        - [x] `equipments` table (type, brand, model, purchaseDate, etc.)
        - [x] `equipmentReviews` table (rating, review text, linked to `equipments` and `users`)
        - [x] Link `playerProfiles.primaryPaddleId` to `equipments`
    *   **API Endpoints (new `equipments.ts` router):**
        - [ ] `equipments.add`: Add new equipment for a user
        - [ ] `equipments.update`: Update user's equipment details
        - [ ] `equipments.remove`: Remove equipment from user's list
        - [ ] `equipments.listByUser`: Get all equipment for a user
        - [ ] `equipments.setPrimaryPaddle`: Set primary paddle
        - [ ] `equipmentReviews.add`: Add a review for an equipment
        - [ ] `equipmentReviews.getByEquipment`: Get reviews for a specific equipment
    *   **UI (Profile Edit Page & Equipment Section):**
        - [ ] Interface to add/edit/delete equipment in user's profile
        - [ ] Display current and past equipment
        - [ ] Interface to write/view reviews for equipment
- [ ] **Travel Preferences:**
    *   **DB Schema:**
        - [x] `playerProfiles.maxTravelDistance` (integer)
        - [x] `playerProfiles.travelWillingness` (boolean)
    *   **UI (Profile Edit Page):**
        - [ ] Input for `maxTravelDistance`
        - [ ] Toggle for `travelWillingness`
- [ ] **Public Profile View Enhancements:**
    - [ ] Ensure `profiles.getById` fetches all necessary public data
    - [ ] Design and implement the public view page (`src/app/profile/[userId]/page.tsx`) based on `wireframe-profile-view.html`
    - [ ] Implement privacy controls (what's shown on public profile vs. to connections)

### 1.3. Matching System
    *   **Status:** To Do
    *   **Files:** New `matching.ts` router, new components in `src/components/matching/`, new page in `src/app/(protected)/matches/page.tsx` (currently a placeholder).

- [ ] **Database Schema for Matching:**
    - [x] `swipeActions` table (swiperId, swipedUserId, action, matchType)
    - [x] `reachOutLists` table (userId, targetUserId, matchType, status)
    - [x] `userPreferences` table (for storing filter criteria like ageRange, skillRange, etc.)
    - [x] `matches` table already has `matchRequestId` and `playerIds`, can be used for confirmed matches
    - [ ] Refine schema if needed based on matching algorithm requirements
- [ ] **Matching Algorithm Implementation (Server-Side):**
    - [ ] Develop core logic to find potential matches based on:
        - [ ] Skill level (DUPR/self-reported) proximity
        - [ ] Location proximity (using `users.locationCoordinates`)
        - [ ] Availability compatibility (from `playerProfiles.availability` or `availabilities` table)
        - [ ] Playing style preferences
        - [ ] Age range preferences
        - [ ] Gender preferences (if applicable)
        - [ ] Mutual interests/tags (future enhancement)
    - [ ] Logic to exclude already swiped/passed users
    - [ ] Logic to exclude blocked users
- [ ] **API Endpoints (new `matching.ts` router):**
    - [ ] `matching.getPotentialMatches`: Fetch a batch of potential matches for the current user, applying their filters/preferences.
    - [ ] `matching.swipeAction`: Record a swipe (like, pass) and handle mutual like logic (create a "connection" or add to reach-out list).
    - [ ] `matching.getReachOutList`: Fetch users the current user has liked.
    - [ ] `matching.updatePreferences`: Allow user to save their matching filter preferences.
- [ ] **UI Components:**
    - [ ] Swipe Card UI (based on `wireframe-swipe-interface.html`)
        - [ ] Display player photo, name, age, DUPR, distance, seeking type.
        - [ ] Travel badge display if applicable.
    - [ ] Filter Panel (based on `wireframe-filters-panel.html`)
        - [ ] Controls for location radius, DUPR range, age range, match type, etc.
    - [ ] Reach-Out List UI (based on `wireframe-reach-out-list.html`)
        - [ ] Display users liked by the current user.
        - [ ] Option to message or remove from list.
- [ ] **Main Matching Page (`src/app/(protected)/matches/page.tsx`):**
    - [ ] Integrate swipe cards, filter panel.
    - [ ] Handle "end of stack" scenario.
    - [ ] Link to reach-out list.

### 1.4. Messaging System
    *   **Status:** To Do
    *   **Files:** New `messaging.ts` router, new components in `src/components/messaging/`, new page in `src/app/(protected)/messages/page.tsx`.

- [ ] **Database Schema for Messaging:**
    - [x] `conversations` table (participants, lastActivity)
    - [x] `messages` table (conversationId, senderId, recipientId, content, timestamp, readStatus)
- [ ] **Real-time Setup (Socket.io - Planned):**
    - [ ] Research/Confirm Socket.io deployment strategy on Vercel or alternative
    - [ ] Configure Socket.io server-side (e.g., in a Next.js custom server or separate Node.js process if Vercel limitations are an issue).
    - [ ] Socket event handlers for sending/receiving messages, typing indicators, read receipts.
- [ ] **API Endpoints (new `messaging.ts` router):**
    - [ ] `messaging.getConversations`: List all conversations for the current user.
    - [ ] `messaging.getMessages`: Get messages for a specific conversation (with pagination).
    - [ ] `messaging.sendMessage`: Send a new message (persists to DB and emits via socket).
    - [ ] `messaging.markAsRead`: Update read status of messages.
- [ ] **UI Components:**
    - [ ] Chat Interface (based on `wireframe-chat-interface.html`)
        - [ ] Conversation list sidebar.
        - [ ] Message display area (bubbles, timestamps).
        - [ ] Message input field.
    - [ ] Message List / Inbox (based on `wireframe-messages-list.html`)
    - [ ] New Message Composer (if initiating from profile, `wireframe-new-message-composer.html`)
- [ ] **Functionality:**
    - [ ] Real-time message sending and receiving.
    - [ ] Typing indicators.
    - [ ] Read receipts.
    - [ ] Unread message counts.
    - [ ] Block/report user from chat.
    - [ ] Basic notifications for new messages (in-app, potentially email/push later).

## Phase 1.5: Enhanced Features (Weeks 9-12)

This phase focuses on adding significant value-add features beyond the core MVP.

### 1.5.1. Travel System (Week 9)
    *   **Status:** To Do
    *   **Files:** New `travel.ts` router, new components in `src/components/travel/`, new page in `src/app/(protected)/travel/page.tsx`.
    *   **DB Schema:** `travelPlans` table.

- [ ] **Database Schema for Travel:**
    - [x] `travelPlans` table (userId, destination, dates, purpose, visibility, etc.)
    - [ ] Refine travelPlans schema if needed for advanced search filters
- [ ] **API Endpoints (new `travel.ts` router):**
    - [ ] `travel.createPlan`: Create a new travel plan.
    - [ ] `travel.getUserPlans`: Get travel plans for the current user.
    - [ ] `travel.updatePlan`: Update an existing travel plan.
    - [ ] `travel.deletePlan`: Delete a travel plan.
    - [ ] `travel.searchTravelers`: Find players traveling to a specific destination during a date range.
    - [ ] `travel.getNearbyUsers` (if different from general matching, for travelers).
- [ ] **UI Components:**
    - [ ] Travel Plans Creator/Editor Form (based on `wireframe-travel-plans-creator.html`)
        - [ ] Destination input (with city/country autocomplete if possible).
        - [ ] Date range picker for arrival/departure.
        - [ ] Purpose selection (casual, tournament, drilling).
        - [ ] Visibility settings.
    - [ ] Travel Badge Display on profiles (based on `wireframe-travel-badge-display.html`).
    - [ ] City Bulletin Board Interface (based on `wireframe-city-bulletin-board.html`)
        - [ ] Display travel announcements for a city.
        - [ ] Allow posting to the bulletin board.
    - [ ] Destination Browser (based on `wireframe-destination-browser.html`)
        - [ ] Interface to explore players/courts/events in a travel destination.
- [ ] **Functionality:**
    - [ ] Logic to display travel badge on user profiles when they have an active travel plan.
    - [ ] System to notify opted-in local players about incoming travelers.
    - [ ] Temporary inclusion of travelers in the destination city's player pool for matching.
    - [ ] Travel-specific filters in the main matching interface.

### 1.5.2. Community Features (Week 10)
    *   **Status:** To Do
    *   **Files:** New `communities.ts`, `posts.ts` routers, new components in `src/components/community/`, new pages in `src/app/(protected)/community/...`.
    *   **DB Schema:** `communities`, `communityMembers`, `posts` tables.

- [ ] **Database Schema for Community:**
    - [x] `communities` table (name, type, location, description).
    - [x] `communityMembers` table (communityId, userId, role).
    - [x] `posts` table (communityId, authorId, title, content, type).
    - [ ] Define `comments` table schema in `schema.ts` (postId, authorId, content)
    - [ ] Define `reactions` table schema in `schema.ts` (postId/commentId, userId, reactionType)
    - [ ] Run migrations for new community tables
- [ ] **API Endpoints (new `communities.ts`, `posts.ts` routers):**
    - [ ] **Communities:**
        - [ ] `communities.create`: Create a new community/club.
        - [ ] `communities.getById`: Fetch details of a specific community.
        - [ ] `communities.join`: Join a community.
        - [ ] `communities.leave`: Leave a community.
        - [ ] `communities.list`: List/search communities.
    - [ ] **Posts & Discussions:**
        - [ ] `posts.create`: Create a new post in a community.
        - [ ] `posts.getByCommunity`: Fetch posts for a community (with pagination).
        - [ ] `posts.addComment`: Add a comment to a post.
        - [ ] `posts.reactToPost`: Add a reaction to a post.
- [ ] **UI Components:**
    - [ ] Community Hub/Dashboard (based on `wireframe-community-hub.html`).
    - [ ] Discussion Board Interface (based on `wireframe-discussion-board.html`).
        - [ ] Post list item.
        - [ ] Post detail view with comments.
        - [ ] New post/comment forms.
    - [ ] Club Page (based on `wireframe-club-page.html`).
        - [ ] Club info, member list, club-specific posts/events.
    - [ ] Event Page (based on `wireframe-event-page.html`).
        - [ ] Event details, attendee list, RSVP functionality.
- [ ] **Functionality:**
    - [ ] City/region-based groups.
    - [ ] Public discussion boards within groups.
    - [ ] Event creation and announcements.
    - [ ] Club registration and management (basic admin roles).
    - [ ] Following clubs/communities.
    - [ ] Local tips and court information sharing (potentially as post types).

### 1.5.3. Equipment System (Week 11)
    *   **Status:** To Do
    *   **Files:** New `equipments.ts` router, new components in `src/components/equipment/`, new pages in `src/app/(protected)/equipment/...`.
    *   **DB Schema:** `equipments`, `equipmentReviews`, `equipmentCatalog`, `officialEquipmentReviews`, `affiliateLinks`, `affiliateClicks`, `affiliateConversions`.

- [ ] **Database Schema for Equipment:**
    - [x] `equipments` table (user-specific equipment: type, brand, model, purchaseDate, etc.)
    - [x] `equipmentReviews` table (user reviews: rating, review text, linked to `equipments` and `users`)
    - [x] `equipmentCatalog` table (official list of equipment items)
    - [x] `officialEquipmentReviews` table (expert/site reviews for catalog items)
    - [x] `affiliateLinks` table (links for catalog items)
    - [x] `affiliateClicks`, `affiliateConversions` tables (for tracking)
- [ ] **API Endpoints (new `equipments.ts` router):**
    - [ ] `equipments.addToUserInventory`: Add equipment to a user's profile.
    - [ ] `equipments.getUserInventory`: List equipment for a user.
    - [ ] `equipments.reviewUserEquipment`: Allow user to review their own equipment.
    - [ ] `equipments.listCatalog`: Browse official equipment catalog.
    - [ ] `equipments.getCatalogItemDetails`: View details of a catalog item, including user and official reviews.
    - [ ] `affiliate.trackClick`: Endpoint to track an affiliate link click.
- [ ] **UI Components:**
    - [ ] Equipment List/Browser (based on `wireframe-equipment-list.html`).
    - [ ] Equipment Detail Page (based on `wireframe-equipment-detail.html`).
    - [ ] Equipment Review Form (based on `wireframe-equipment-review-form.html`).
    - [ ] User's "My Equipment" section in profile.
- [ ] **Functionality:**
    - [ ] Users can track their equipment history (paddles, shoes, etc.).
    - [ ] Users can write and read reviews for equipment they own/use.
    - [ ] Display official/expert reviews alongside user reviews for catalog items.
    - [ ] Affiliate link integration for purchasing equipment (display links, track clicks).
    - [ ] Basic product database for common equipment.

### 1.5.4. Premium & Dating Features (Week 12)
    *   **Status:** To Do
    *   **Files:** Update `profiles.ts`, new `subscriptions.ts` router, new components in `src/components/premium/` and `src/components/dating/`, new pages in `src/app/(protected)/premium/` and `src/app/(protected)/dating/`.
    *   **DB Schema:** `subscriptions`, `payments`, `datingProfiles`, `datingPhotos`, `datingConversations`, `datingMessages`, `datingPreferences`, `datingMatches`, `featureFlags`.

- [ ] **Stripe Subscription Integration:**
    - [ ] Setup Stripe account and products (Free, Premium, Singles Add-on).
    - [ ] API endpoint for creating Stripe checkout sessions.
    - [ ] Webhook handler for Stripe events (payment success, subscription updates, cancellations).
    - [ ] `subscriptions` table in DB to store user subscription status.
    - [ ] `payments` table for payment history.
- [ ] **Premium Tier Implementation:**
    - [ ] Logic to gate features based on `subscriptions.plan` (e.g., unlimited swipes, advanced filters).
    - [ ] UI for Premium Upgrade page (based on `wireframe-premium-upgrade.html`).
    - [ ] Subscription Management UI (based on `wireframe-subscription-management.html`).
- [ ] **Dating Profile System:**
    - [ ] Separate `datingProfiles` table for dating-specific information.
    - [ ] UI for Dating Profile Setup (based on `wireframe-dating-profile.html`).
    - [ ] Logic to ensure dating profile is distinct from main player profile, respecting `hideFromRegular` flag.
    - [ ] `datingPhotos` table and upload mechanism.
- [ ] **Dating Matching & Communication:**
    - [ ] Modified matching algorithm for dating preferences (`datingPreferences` table).
    - [ ] Separate Dating Pool Interface (based on `wireframe-singles-pool-interface.html`).
    *   [ ] Separate `datingConversations` and `datingMessages` tables for dating chats.
    *   [ ] UI for dating-specific chat.
- [ ] **Feature Flagging:**
    - [x] `featureFlags` table to manage access to features based on subscription plans.
    - [ ] Middleware or checks to enforce feature flags.

### 1.5.5. Tournament System & Partner Finding
    *   **Status:** To Do
    *   **Files:** New `tournaments.ts` tRPC router, new components in `src/components/tournaments/`, new pages in `src/app/(protected)/tournaments/...`.
    *   **DB Schema:** `tournaments`, `tournamentPartners` tables from `src/server/db/schema.ts`.
    *   **User Flow Reference:** `Docs/02a_USER_FLOWS_DETAIL.md` - Section 8.

- [ ] **Database Schema Updates for Tournaments & Venues:**
    - [x] Define `venues` table (core fields: name, address, city, state, country, etc.) - *Enhanced in schema.ts*
    - [x] Define `tournaments` table (core fields: name, dates, skillLevels, description, registrationUrl) - *Exists in schema.ts*
        - [ ] Add `venueId` to `tournaments` table (linking to `venues` table) in `schema.ts`. (possibly complete)
        - [ ] Add `updatedAt` to `tournaments` table in `schema.ts`. (possibly complete)
        - [ ] *(Decision)* Decide if the old `tournaments.location` (simple text) field should be kept or removed now that `venueId` provides structured location. (For now, schema has it commented out).
    - [x] Define `tournamentPartners` table (core fields: userId, tournamentId, eventType, skillLevel (seeker's), status, message) - *Exists in schema.ts*
        - [ ] Add `desiredPartnerSkillMin`, `desiredPartnerSkillMax`, `desiredPartnerGender` to `tournamentPartners` table in `schema.ts`.
        - [ ] Add `updatedAt` to `tournamentPartners` table in `schema.ts`.
        - [ ] Ensure `tournamentId` in `tournamentPartners` is `notNull`.
    - [ ] *(Optional but Recommended)* Add `venueId` to `events` table (linking to `venues` table) in `schema.ts` for general community events. Decide if nullable.
    - [~] Run Drizzle migrations to apply all schema changes to the database. *(Mark as in progress or done after you run it)*
    - [ ] **Develop Venue Management System (Admin CRUD):**
        - [ ] API Endpoints (new `venues.ts` tRPC router): `venues.create`, `venues.getById`, `venues.list`, `venues.update`, `venues.delete`.
        - [ ] Basic Admin UI (e.g., in `/admin/venues`) for managing venue data.

- [ ] **API Endpoints (new `tournaments.ts` tRPC router):**
    - [ ] `tournaments.list`: Fetch and filter tournaments.
        - [ ] Implement server-side filtering (by date range, location text search, skill level array overlap).
    - [ ] `tournaments.getById`: Fetch details for a specific tournament.
        - [ ] Procedure should also fetch associated `tournamentPartners` entries for that tournament.
    - [ ] `tournamentPartners.create`: Allow a user to declare they are "seeking a partner".
        - [ ] Input: `tournamentId`, `eventType`, `skillLevel` (seeker's for this event), `message`, `desiredPartnerSkillMin`, `desiredPartnerSkillMax`, `desiredPartnerGender`.
        - [ ] Ensure user can only have one active "seeking" entry per `tournamentId` and `eventType`.
    - [ ] `tournamentPartners.update`: Allow user to update their "seeking" status or message (e.g., change status to 'partner_found' or edit message/desired criteria).
    - [ ] `tournamentPartners.delete`: Allow user to remove their "seeking partner" entry.
    - [ ] *(Admin/Future)* `tournaments.create`: (For admin initially) Allow adding new tournaments to the system.
    - [ ] *(Admin/Future)* `tournaments.update`: (For admin) Allow editing existing tournament details.

- [ ] **UI Components (`src/components/tournaments/`):**
    - [ ] `TournamentListItem.tsx`: Displays a single tournament in a list (name, dates, location, brief summary).
    - [ ] `TournamentFilterPanel.tsx`: UI controls for filtering the tournament list.
    - [ ] `TournamentDetailDisplay.tsx`: Component to show full details of a selected tournament (description, registration link, skill levels, organizer info etc.).
    - [ ] `PartnerSeekerCard.tsx`: Displays information for a user who is seeking a partner for a specific tournament event (their skill, event type, desired partner criteria, message).
        - [ ] Include a "Contact" or "View Profile" button.
    - [ ] `SeekPartnerForm.tsx`: Modal or inline form for users to fill out when they want to declare themselves as "seeking a partner" for an event within a tournament.

- [ ] **Pages (`src/app/(protected)/tournaments/...`):**
    - [ ] `/tournaments/page.tsx`: Main tournament listing and search page.
        - [ ] Displays list of tournaments using `TournamentListItem`.
        - [ ] Integrates `TournamentFilterPanel`.
        - [ ] Handles pagination or infinite scroll for tournament list.
        - [ ] Links to individual tournament detail pages.
    - [ ] `/tournaments/[tournamentId]/page.tsx`: Tournament detail page.
        - [ ] Displays full tournament information using `TournamentDetailDisplay`.
        - [ ] Shows a list of users seeking partners for events in *this* tournament (using `PartnerSeekerCard`), filterable by event type (e.g., Men's Doubles 4.0, Mixed Doubles 3.5).
        - [ ] Provides a clear CTA (e.g., "Find/Seek a Partner for this Tournament") that likely opens the `SeekPartnerForm` pre-filled with the current `tournamentId`.
    - [ ] `/profile/my-tournament-requests/page.tsx` (or similar route): A page where users can view and manage their own active "seeking partner" entries across all tournaments.

- [ ] **Functionality & Integration:**
    - [ ] Users can browse, search, and filter listed tournaments.
    - [ ] Users can view detailed information about a tournament and link to its external registration page.
    *   [ ] On a tournament's detail page, users can see a list of other platform users who are "seeking partners" for specific events within that tournament.
    *   [ ] Users can submit a "seeking partner" request for a specific tournament event, detailing their skill for that event and the criteria for their desired partner.
    *   [ ] Users can edit or delete their own "seeking partner" requests.
    *   [ ] Users viewing a "partner seeker's" card can easily navigate to that seeker's profile or initiate contact (e.g., via the messaging system).

---

## Phase 2: Polish & Launch (Weeks 13-16)

This phase involves refining the application, thorough testing, and preparing for launch.

### 2.1. Performance & Security (Week 13)
    *   **Status:** To Do

- [ ] **Performance Optimization:**
    - [ ] Database query optimization (review slow queries, add indexes).
    - [ ] Frontend bundle size analysis and optimization.
    - [ ] Image optimization (compression, responsive images, lazy loading for user-uploaded content).
    - [ ] Implement caching strategies (client-side, server-side, CDN if applicable).
    - [ ] Code splitting and lazy loading for components/pages.
- [ ] **Security Audit & Hardening:**
    - [ ] Review authentication and authorization flows for vulnerabilities.
    - [ ] Ensure proper input validation on all API endpoints (already part of tRPC/Zod).
    - [ ] Check for common web vulnerabilities (XSS, CSRF - Next.js/tRPC provide some protection).
    - [ ] Implement rate limiting for sensitive APIs (login, message sending, etc.).
    - [ ] Set up security headers.
- [ ] **Content Moderation (Basic):**
    - [ ] Implement basic profanity filtering for user-generated content (bios, messages, posts).
    - [ ] User reporting mechanism for profiles/content (`reports` table).
    - [ ] Admin interface (basic) for reviewing reports.

### 2.2. Testing & QA (Week 14)
    *   **Status:** To Do

- [ ] **Unit Test Coverage:**
    - [ ] Increase unit test coverage for critical utility functions and business logic.
    - [ ] Test tRPC procedures (input validation, success/error cases).
- [ ] **Integration Tests:**
    - [ ] Test interactions between key components and API services.
    - [ ] Test authentication flow with profile sync.
    - [ ] Test matching and messaging flows.
- [ ] **End-to-End (E2E) Testing (e.g., Playwright/Cypress - consider for critical paths):**
    - [ ] User registration and login.
    - [ ] Profile creation and editing.
    - [ ] Core matching and messaging flow.
    - [ ] Premium upgrade flow.
- [ ] **Manual & Exploratory Testing:**
    - [ ] Test on multiple browsers (Chrome, Firefox, Safari).
    - [ ] Test on multiple devices (desktop, tablet, mobile - responsive checks).
    - [ ] User Acceptance Testing (UAT) with a small group if possible.
- [ ] **Accessibility (a11y) Audit:**
    - [ ] Basic checks for keyboard navigation, ARIA attributes, color contrast.

### 2.3. Beta Launch (Week 15)
    *   **Status:** To Do

- [ ] **Deployment to Staging/Production Environment:**
    - [ ] Finalize Vercel deployment configuration for production.
    - [ ] Set up environment variables for production.
    - [ ] Test database migrations in a production-like environment.
- [ ] **Beta User Onboarding:**
    - [ ] Recruit a small group of beta testers.
    - [ ] Provide instructions for accessing the beta.
- [ ] **Monitoring & Analytics Setup (Basic):**
    - [ ] Integrate basic error tracking (e.g., Sentry).
    - [ ] Set up basic analytics (e.g., Vercel Analytics, or a simple setup with a privacy-focused tool).
    - [ ] `userActivities` table for logging key actions.
- [ ] **Feedback Collection System:**
    - [ ] Implement a way for beta users to submit feedback and bug reports (e.g., a simple form, dedicated email).
- [ ] **Iterate based on Beta Feedback:**
    - [ ] Prioritize and fix critical bugs found during beta.
    - [ ] Address major usability issues.

### 2.4. Launch Preparation (Week 16)
    *   **Status:** To Do

- [ ] **Marketing & Communication:**
    - [ ] Prepare marketing website/landing page (if `src/app/page.tsx` isn't already serving this).
    - [ ] Draft launch announcements (email, social media).
- [ ] **Legal & Documentation:**
    - [ ] Finalize Terms of Service and Privacy Policy.
    - [ ] Create User Guide / Help Center (based on `wireframe-help-support.html`).
        - [x] `notificationSettings` table for user preferences.
- [ ] **Customer Support Plan:**
    - [ ] Define process for handling user inquiries and support requests.
- [ ] **Final System Checks:**
    - [ ] Ensure all third-party services (Clerk, DB, Stripe, etc.) are configured for production.
    - [ ] Perform final performance and security checks.
- [ ] **Launch Go/No-Go Decision.**

---

### 2.5. Progressive Web App (PWA) & Mobile Optimization (Overlaps with Polish, can be iterative)
    *   **Status:** To Do
    *   **Files:** `next.config.ts`, `public/manifest.json`, service worker files.

- [ ] **PWA Implementation (`next-pwa` or similar):**
    - [ ] Configure `next.config.ts` for PWA.
    - [ ] Create `manifest.json` with app icons, theme color, etc.
    - [ ] Implement service worker for basic offline caching (e.g., app shell, static assets).
    - [ ] Create an offline fallback page.
    - [ ] Add install prompt for PWA.
- [ ] **Mobile Responsiveness & Optimization:**
    - [ ] Thoroughly test and refine UI on various mobile screen sizes.
    - [ ] Optimize touch interactions.
    - [ ] Ensure good performance on mobile devices (Lighthouse scores).

### 2.6. Monitoring & Advanced Analytics (Post-MVP / Iterative)
    *   **Status:** To Do
    *   **DB Schema:** `adCampaigns`, `adCreatives`, etc. (if ads are planned), `duprSyncLog`, `userActivities`, `courtConditions`, `challenges`.

- [ ] **Advanced Error Tracking & Logging:**
    - [ ] Configure Sentry for more detailed error reporting and performance monitoring.
    - [ ] Implement structured logging for server-side operations.
- [ ] **Performance Monitoring:**
    - [ ] Set up frontend Real User Monitoring (RUM).
    - [ ] Monitor API response times and database query performance.
- [ ] **Analytics Integration (e.g., Mixpanel, Amplitude, Plausible):**
    - [ ] Define Key Performance Indicators (KPIs).
    - [ ] Track user acquisition, engagement, retention, and monetization metrics.
    - [ ] Create dashboards for visualizing metrics.

### 2.7. Internationalization (i18n) & Localization (L10n) (Post-MVP / Iterative)
    *   **Status:** To Do
    *   **DB Schema:** `supportedLanguages`, `userLanguagePreferences`, `contentTranslations`, `regionalSettings`.

- [ ] **Framework Setup (`next-intl` or similar):**
    - [ ] Configure i18n routing.
    - [ ] Set up message files (e.g., `en.json`, `es.json`).
- [ ] **UI Translation:**
    - [ ] Extract all UI strings into message files.
    - [ ] Implement language switcher component.
- [ ] **Content Localization:**
    - [ ] Strategy for localizing user-generated content (if needed).
    - [ ] Localize date, time, and number formats.
- [ ] **RTL Support (if targeting RTL languages).**

---    