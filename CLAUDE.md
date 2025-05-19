# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pickleball Match is a web application for connecting pickleball players, scheduling matches, and building a community around the sport. The platform allows users to create profiles, send match requests, communicate with other players, and organize their pickleball activities.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **API**: tRPC for type-safe API calls
- **Authentication**: Clerk for user authentication and management
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time**: Socket.io for real-time messaging and notifications

## Common Commands

### Development

```bash
# Install dependencies
npm install

# Start the development server with Turbopack
npm run dev

# Build for production
npm run build

# Start the production server
npm run start

# Lint code
npm run lint

# Format code (using prettier configured in eslint.config.mjs)
npx prettier --write .
```

### Database

```bash
# Push schema changes to database (apply migrations)
npx drizzle-kit push:pg

# Generate migration files
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate
```

## Architecture

### Core Architecture

The application follows a Next.js App Router architecture with React server components and client components where needed:

1. **App Router Structure** (`/src/app`):
   - Contains page components organized by route
   - Uses the new Next.js App Router pattern with layouts and pages

2. **Server API** (`/src/server`):
   - Uses tRPC for type-safe APIs
   - Defines routes in `/src/server/api/routers`
   - Contains database schema and connections in `/src/server/db`

3. **Components** (`/src/components`):
   - Organized by feature domain:
     - `/auth`: Authentication-related components
     - `/common`: Shared/reusable components
     - `/matching`: Match-making related components
     - `/messaging`: Communication components
     - `/profile`: User profile components
     - `/travel`: Travel and location components

4. **Utilities** (`/src/lib`):
   - Contains hooks, utility functions, and type definitions
   - tRPC client setup

### Database Schema

The database schema is comprehensive and includes tables for:

- Users and player profiles
- Match requests and scheduled matches
- Messaging and conversations
- Player ratings and reviews
- Community features and tournaments
- Equipment tracking
- Travel planning
- and more specialized features

The schema is defined in `/src/server/db/schema.ts` using Drizzle ORM with PostgreSQL.

### Authentication

Authentication is handled by Clerk, integrated with Next.js:
- `ClerkProvider` wraps the application in `/src/app/layout.tsx`
- Auth middleware controls route protection
- tRPC procedures can be protected with the `protectedProcedure` wrapper

### API Layer

The API uses tRPC for type-safe endpoints:
- Root router defined in `/src/server/api/root.ts`
- Feature-specific routers in `/src/server/api/routers/`
- Client setup in `/src/lib/trpc/`

## Environment Setup

The application requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- Clerk authentication keys (as required by Clerk)

Create a `.env.local` file with these variables to run the application locally.