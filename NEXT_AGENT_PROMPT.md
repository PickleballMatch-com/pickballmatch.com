# Next Agent Prompt

## Current Status and Recent Work

We've been working on the Pickleball Match platform, focusing on the core infrastructure and user profile functionality. Here's a summary of recent work:

### 1. Project Setup & Authentication
- Set up Next.js 15 with App Router
- Implemented Clerk authentication
- Created Drizzle ORM schema with PostgreSQL
- Established tRPC for type-safe API calls
- Created basic UI with Tailwind CSS and shadcn/ui

### 2. User Profile Work
- **Recently Fixed**: Profile update functionality was broken due to tRPC serialization issues
- **Solution Applied**: Simplified data transmission and enhanced error handling
- **Current Status**: Basic profile creation and updating work correctly
- User profiles are automatically synced with Clerk authentication
- Users can update their profile information through the edit profile page

### 3. Current Architecture
- Backend: PostgreSQL database with Drizzle ORM for schema management
- API: tRPC for type-safe API calls between client and server
- Authentication: Clerk for user management
- Frontend: Next.js with React server components and client components
- Styling: Tailwind CSS with shadcn/ui components

## Immediate Next Steps

The next phase of work involves enriching the profile system based on the wireframes and schema. Specifically:

1. **Profile Completion Features**:
   - Create profile completion indicator
   - Add "complete your profile" prompts
   - Implement redirects for incomplete profiles

2. **Media Management**:
   - Implement profile photo upload (integrate with Google Cloud Storage)
   - Add video embedding from YouTube links
   - Create photo gallery functionality

3. **DUPR Integration**:
   - Research DUPR API capabilities
   - Create a DUPR client service
   - Implement DUPR rating verification and sync

4. **Enhanced Profile Features**:
   - Add equipment tracking
   - Implement travel preferences
   - Create public profile viewing with privacy controls

## Key Files and Directories

- `/src/app/profile/` - Profile-related pages
- `/src/app/profile/edit/page.tsx` - Profile edit page
- `/src/server/api/routers/profiles.ts` - Profile API endpoints
- `/src/lib/hooks/useProfileSync.ts` - Hook for syncing user data with Clerk
- `/src/server/db/schema.ts` - Database schema including user and profile tables

## Important Documents to Review

To understand the full scope of the project and the profile system requirements:

1. `Docs/01-pickleball-match-project-core-intro.md` - Project overview
2. `Docs/02-pickleball-match-prd-v2.md` - Product requirements document
3. `Docs/04-pickleball-match-user-flows.md` - User flows
4. `Docs/05-pickleball-match-branding-guide.md` - Branding Guide
4. `Docs/wireframes and mockups/wireframe-profile-view.html` - Profile view wireframe
5. `Docs/wireframes and mockups/wireframe-profile-edit.html` - Profile edit wireframe
6. `Docs/wireframes and mockups/wireframe-profile-setup-wizard.html` - Profile setup wizard wireframe
7. `Docs/Roadmap & Tasks/03-tasks-profiles-updated.md` - Profile feature task tracking
8. `Docs/Roadmap & Tasks/03-tasks-profiles-updated.md` - Profile feature task tracking
## Notes on Database Schema

The user profiles in the database are split between two tables:

1. `users` table - Basic user information synced from Clerk:
   - id (from Clerk)
   - email, firstName, lastName
   - profileImageUrl
   - age, gender, locationCoordinates

2. `playerProfiles` table - Pickleball-specific details:
   - skillLevel, preferredPlayStyle, yearsPlaying
   - bio, availability, strengths, weaknesses
   - equipment references, video links, etc.

When working with user profiles, both tables need to be considered as they contain different aspects of the user's information.

## Known Issues or Limitations

1. The current implementation doesn't have file upload capabilities yet.
2. The profile edit page handles basic fields but doesn't yet support the full feature set shown in wireframes.
3. The transformer issue with tRPC was fixed by removing the SuperJSON transformer - this may need to be properly resolved if complex data types become necessary.

This document will be updated as we make progress to provide continuity between development sessions.

As you complete tasks, be sure to update the tasks docs and progress tracker so future agents can stay on track. 