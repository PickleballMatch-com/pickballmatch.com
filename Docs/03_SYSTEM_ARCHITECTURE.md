# System Architecture - Pickleball Match

**Version:** 1.0
**Date:** 2024-05-16
**Author:** Project Team (Compiled by AI Assistant)
**Primary Source(s):** `Docs/Archive/03-pickleball-match-final-tech-stack.md`, `CLAUDE.md`

## 1. Overview

Pickleball Match is a web-first Progressive Web App (PWA) designed to connect pickleball players. The architecture prioritizes a modern, scalable, and type-safe development experience using Next.js for the frontend and API layers, tRPC for type-safe communication, Clerk for authentication, and a PostgreSQL database managed with Drizzle ORM.

## 2. Core Technology Stack

### 2.1. Frontend Technologies

*   **Framework:** Next.js 15+ (using App Router)
    *   **Key Features:** Server Components, Client Components, API Route Handlers, Edge Runtime potential.
    *   **Notes:** App Router (`src/app/`) is used for all routing and layouts.
*   **UI Library:** React 19+
*   **Styling:** Tailwind CSS
    *   **Configuration:** `tailwind.config.ts`
    *   **Notes:** Utility-first approach. Custom brand colors (`primary: #FFD700`, `secondary: #000000`) are defined.
*   **Component Library:** shadcn/ui
    *   **Notes:** Components are copied into the codebase (`src/components/ui/`) and customized. Built on Radix UI primitives for accessibility.
*   **Form Handling:** React Hook Form + Zod
    *   **Notes:** Zod for schema validation, `@hookform/resolvers` for integration.

### 2.2. Backend & API Technologies

*   **API Layer:** Next.js API Route Handlers & tRPC
    *   **tRPC:** Primary method for type-safe client-server communication.
        *   Router definitions in `src/server/api/routers/`.
        *   tRPC handler in `src/app/api/trpc/[trpc]/route.ts`.
    *   **Next.js API Routes:** Used for specific needs like webhook handling or where tRPC might not be suitable (e.g., database test route `src/app/api/db-test/route.ts`).
*   **Programming Language:** TypeScript

### 2.3. Database & ORM

*   **Database:** PostgreSQL (hosted on Railway, but adaptable to any PostgreSQL provider)
*   **ORM:** Drizzle ORM
    *   **Schema Definition:** `src/server/db/schema.ts`
    *   **Migrations:** Managed by `drizzle-kit`.
    *   **Connection:** `src/server/db/index.ts` initializes the Drizzle client with `postgres-js`.

### 2.4. Authentication & Authorization

*   **Provider:** Clerk
    *   **Integration:** `@clerk/nextjs` SDK.
    *   **Features Leveraged:** User registration, login, session management, social logins (configurable), multi-factor authentication (user-configurable).
    *   **Middleware:** Clerk middleware (`src/middleware.ts`) for route protection.
    *   **Profile Sync:** User data from Clerk is synced to the application's `users` table.

### 2.5. Real-time Communication (Planned)

*   **Technology:** Socket.io
    *   **Purpose:** Real-time messaging and notifications.
    *   **Notes:** This is part of the planned features and not yet fully implemented in the current codebase.

### 2.6. State Management

*   **Local Component State:** React `useState` and `useReducer`.
*   **Server State & Caching:** React Query (via tRPC's `@trpc/react-query` integration).
*   **Global Client State:** Initially minimal. If complex global state is needed, Zustand or Jotai may be considered. React Context for simple shared state.

## 3. Application Architecture

### 3.1. Frontend Architecture (Next.js App Router)

*   **Directory Structure:**
    *   `src/app/`: Contains page components, layouts, and route groups.
        *   `(auth)`: Route group for authentication pages (sign-in, sign-up).
        *   `(protected)`: Route group for routes requiring authentication, wrapped with `ProfileCompletionGuard`.
    *   `src/components/`: Reusable React components.
        *   `ui/`: shadcn/ui components.
        *   `common/`: Custom reusable UI primitives (Button, Card, etc.).
        *   `layout/`: Global layout components (Header, Footer, Navbar).
        *   Feature-specific components (e.g., `profile/`, `auth/`).
    *   `src/lib/`: Shared utilities, hooks, type definitions, and tRPC client setup.
*   **Component Strategy:**
    *   **Server Components:** Used by default for data fetching and rendering static or server-rendered parts of pages.
    *   **Client Components (`"use client"`):** Used for interactive UI elements, event handlers, and stateful logic requiring browser APIs.
*   **Styling:** Primarily Tailwind CSS utility classes directly in JSX. Global styles in `src/app/globals.css`.

### 3.2. Backend Architecture (API Layer)

*   **tRPC:**
    *   **Context Creation:** In `src/app/api/trpc/[trpc]/route.ts`, context provides `auth` (from Clerk), `user` (Clerk's currentUser), and `db` (Drizzle instance) to tRPC procedures.
    *   **Routers:** Defined in `src/server/api/routers/`. Each router typically corresponds to a data model or feature area (e.g., `profiles.ts`, `users.ts`, `matchRequests.ts`).
    *   **Root Router:** `src/server/api/root.ts` combines all sub-routers.
    *   **Procedures:**
        *   `publicProcedure`: For endpoints accessible without authentication.
        *   `protectedProcedure`: For endpoints requiring authentication (uses Clerk session verification).
    *   **Input Validation:** Zod schemas are used for validating inputs to tRPC procedures.
*   **Error Handling:**
    *   Standardized error formatting in tRPC setup (`src/server/trpc/index.ts`).
    *   Zod errors are flattened and included in responses.
    *   Custom `TRPCError` for specific error conditions.

### 3.3. Database Architecture

*   **Schema Definition:** Located in `src/server/db/schema.ts`. This file is the single source of truth for the database structure.
*   **Key Tables:**
    *   `users`: Stores basic user information, synced from Clerk. Clerk User ID is the primary key.
    *   `playerProfiles`: Stores pickleball-specific profile details, linked to the `users` table via `userId`.
    *   `matchRequests`: Manages requests for matches between players.
    *   `matches`: Stores details of scheduled or completed matches.
    *   Other tables for features like messages, ratings, travel plans, tournaments, equipment, etc., as defined in `schema.ts`.
*   **Relationships:** Foreign key relationships are defined within the Drizzle schema to maintain data integrity.
*   **Querying:** Drizzle ORM's query builder is used for all database interactions in API routes and tRPC procedures.
*   **Migrations:** `drizzle-kit` is used to generate and apply SQL migrations based on changes to `schema.ts`. The `drizzle.config.ts` file configures `drizzle-kit`.

### 3.4. Authentication Flow

1.  User navigates to sign-in/sign-up pages (`src/app/(auth)/...`).
2.  Clerk's Next.js components (`<SignIn>`, `<SignUp>`) handle the authentication UI and process with Clerk's backend.
3.  Upon successful authentication, Clerk manages the user session (cookies, tokens).
4.  Clerk middleware (`src/middleware.ts`) protects routes based on authentication status.
5.  A custom hook `useProfileSync` (`src/lib/hooks/useProfileSync.ts`) is used on the client-side to:
    *   Fetch the user's profile data from the application's database using `api.profiles.getCurrent`.
    *   If the user exists in Clerk but not in the application's `users` table (e.g., first-time sign-in after registration), it triggers a `api.profiles.syncFromClerk` mutation to create/update the user record in the application database with basic info from Clerk.
6.  Protected tRPC procedures (`protectedProcedure`) use `ctx.auth.userId` from Clerk to identify the authenticated user for server-side operations.
7.  The `ProfileCompletionGuard` (`src/components/profile/ProfileCompletionGuard.tsx`) checks if a user has filled out essential parts of their `playerProfiles` record before allowing access to certain features (e.g., finding matches).

## 4. Key Integrations

*   **Clerk:** For comprehensive user authentication and management.
*   **Railway (PostgreSQL):** For cloud-hosted PostgreSQL database.
*   **Google Cloud Storage (Planned):** For file uploads like profile photos and videos.
*   **DUPR API (Planned):** For DUPR rating verification and match history syncing.
*   **Stripe (Planned):** For payment processing for premium features.

## 5. Data Flow Example (Profile Update)

1.  User interacts with the profile edit form (`src/app/profile/edit/page.tsx`).
2.  Client-side validation (potentially using Zod with React Hook Form) occurs.
3.  On submit, the `updatePlayerProfile` tRPC mutation is called via the `api` client (`src/lib/trpc/client.ts`).
4.  The request hits the tRPC handler (`src/app/api/trpc/[trpc]/route.ts`).
5.  Clerk's `getAuth` verifies authentication. The user's ID is passed in the context.
6.  The `profilesRouter` (`src/server/api/routers/profiles.ts`) handles the `updatePlayerProfile` procedure.
7.  Input data is validated server-side using the Zod schema defined for the procedure.
8.  The procedure interacts with the database via Drizzle ORM (`ctx.db`) to update the `playerProfiles` table.
9.  The result (success/error) is returned to the client.
10. The client updates its UI based on the mutation result (e.g., shows a success message, refetches profile data).

## 6. Scalability and Performance Considerations

*   **Serverless Functions:** Next.js API routes and tRPC procedures deploy as serverless functions on Vercel, allowing for automatic scaling.
*   **Database:** Railway (or chosen PostgreSQL provider) offers scalable database solutions. Proper indexing is crucial and managed via Drizzle schema.
*   **Caching:**
    *   React Query (via tRPC) provides client-side caching.
    *   Vercel provides CDN and server-side caching capabilities for static assets and API responses if configured.
    *   Future consideration: Redis for application-level caching.
*   **Code Splitting:** Next.js automatically handles code splitting for pages and components.
*   **Image Optimization:** Next.js Image component (`next/image`) for optimized image delivery (though `unoptimized` is used for Clerk images due to external domains). For user-uploaded images, a dedicated image optimization strategy will be needed (e.g., via Google Cloud Storage services or a third-party like Cloudinary).

## 7. Security Considerations

*   **Authentication:** Handled by Clerk, a specialized auth provider.
*   **Authorization:** `protectedProcedure` in tRPC ensures endpoints are accessed by authenticated users. Role-based access control can be added later.
*   **Input Validation:** Zod schemas for all tRPC inputs provide robust server-side validation.
*   **SQL Injection:** Prevented by using Drizzle ORM's query builder.
*   **XSS:** React's default JSX rendering and Next.js help mitigate XSS. Care is needed with `dangerouslySetInnerHTML` (avoid if possible).
*   **CSRF:** Next.js and tRPC offer some inherent protection. Clerk's components also handle CSRF for auth actions.
*   **Secrets Management:** Environment variables managed via Vercel and `.env.local` (not committed).

---

This document provides a snapshot of the Pickleball Match system architecture. It will be updated as the project evolves and new architectural decisions are made.