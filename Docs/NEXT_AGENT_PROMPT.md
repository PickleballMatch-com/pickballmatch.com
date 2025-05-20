# Pickleball Match - Next Agent Prompt

**Project:** Pickleball Match Platform
**Current Phase:** Phase 1: Core MVP Features - Advanced Profile Features
**Last Updated:** 2024-05-20 (By AI Assistant, with user's Vercel deployment notes)
**Task Management:** See `Docs/TASKS_AND_PROGRESS.md`

## 1. Project Context & Overview

Pickleball Match is a web-first Progressive Web App (PWA) designed to be the #1 global platform for pickleball players. It facilitates connections for various play types (casual, tournament, travel, drilling), community engagement, and an optional dating feature. The core goal is to make finding compatible pickleball partners intuitive and comprehensive.

*   **Key Objective:** To build out the core MVP features, focusing next on enriching the user profile system.
*   **Core Vision Document:** [Project Charter](./Docs/00_PROJECT_CHARTER.md)
*   **Detailed Requirements:** [Product Requirements Document](./Docs/01_PRODUCT_REQUIREMENTS.md)
*   **System Architecture:** [System Architecture](./Docs/03_SYSTEM_ARCHITECTURE.md)

## 2. Current Project Status & Recent Work

The foundational infrastructure is largely in place:
*   Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
*   Clerk for authentication.
*   PostgreSQL with Drizzle ORM for the database.
*   tRPC for type-safe API calls.

**Recent Work Completed (by User/Previous Agent):**
*   Basic authentication flow (Clerk) integrated.
*   Initial User and Player Profile API endpoints (`profiles.syncFromClerk`, `profiles.getCurrent`, basic `profiles.updatePlayerProfile`).
*   Client-side profile management (`useProfileSync` hook, basic Profile Edit/View pages).
*   Profile Completion System implemented (utilities, components, guard).
*   **Documentation Reorganization**: Streamlined project documentation into a core set of focused documents.
*   **Profile System Fixes**: Implemented fixes for profile completion percentage calculation, date handling, and array normalization. Added extensive debugging and fallback mechanisms.

**Current Deployment Status:**
*   The application is deployed to Vercel with the `develop` branch connected for preview deployments.
*   **Local Development**: Profile system works correctly on localhost:3000 - profile data displays properly and can be edited/updated.
*   **Vercel Deployment**: Issues persist with the profile system:
    1. When visiting the profile page, browser console logs show profile data is being fetched successfully, but it's not displaying on the screen.
    2. The profile edit page doesn't allow saving changes.
    3. The focus for the next agent should be ensuring the profile system works correctly on Vercel, not just in local development.

**Key Files for Current Work:**
*   Profile Pages: `src/app/profile/`, `src/app/profile/edit/page.tsx`
*   Profile API: `src/server/api/routers/profiles.ts`
*   Profile Sync Hook: `src/lib/hooks/useProfileSync.ts`
*   Database Schema: `src/server/db/schema.ts`
*   Profile Types: `src/lib/types/profile.ts`
*   Debug Utilities: `src/server/debug-log.ts`
*   API Routes: `src/app/api/trpc/[trpc]/route.ts`, `src/app/api/trpc/[trpc]/cors-middleware.ts`
*   Database Test Endpoint: `src/app/api/db-test/route.ts`

## 3. Your Immediate Tasks: Advanced Profile Features

Your primary focus for this work session is to continue building out the **Advanced Profile Features** as detailed in `Docs/TASKS_AND_PROGRESS.md` under section `1.2. Advanced Profile Features`.

**Priority Order for Implementation:**

1.  **Media Management - Profile Photo Upload:**
    *   **Goal:** Allow users to upload and manage their main profile photo.
    *   **Tasks:**
        *   Implement a UI component for photo uploading on `src/app/profile/edit/page.tsx`.
        *   Develop backend logic (likely a new tRPC procedure or API route) for generating signed URLs for direct upload to Google Cloud Storage (GCS).
        *   Create another endpoint/webhook to confirm successful upload and update the `users.profileImageUrl` field in the database.
        *   Ensure the `users.profileImageUrl` is updated in the Clerk user object as well, or that our application consistently uses the DB version.
    *   **Key References:**
        *   `Docs/03_SYSTEM_ARCHITECTURE.md` (notes on GCS integration)
        *   `Docs/wireframes and mockups/wireframe-profile-edit.html`
        *   `Docs/TASKS_AND_PROGRESS.md` (Section 1.2)

2.  **Media Management - Video URL Integration:**
    *   **Goal:** Allow users to add YouTube/Vimeo links for an introduction video and gameplay footage.
    *   **Tasks:**
        *   Add input fields for `videoIntroUrl` and `gameplayVideos` (array of URLs) on the profile edit page.
        *   Update the `playerProfiles` schema and `profiles.updatePlayerProfile` mutation if needed to store these.
        *   Create UI components to display embedded videos on the profile view page (`src/app/profile/page.tsx` and the public profile view).
    *   **Key References:**
        *   `Docs/wireframes and mockups/wireframe-profile-edit.html`
        *   `Docs/wireframes and mockups/wireframe-profile-view.html`
        *   `Docs/TASKS_AND_PROGRESS.md` (Section 1.2)

3.  **DUPR Integration (Begin Research & Scaffolding if time permits):**
    *   **Goal:** Allow users to connect their DUPR account to verify their skill level.
    *   **Tasks (Focus on initial steps):**
        *   Thoroughly research DUPR API capabilities, authentication methods (OAuth likely), and access requirements. Document findings in `Docs/PROJECT_MEMORY.md` under a new ADR or a "Research Notes" section.
        *   Scaffold a DUPR client service module (e.g., `src/lib/services/duprService.ts`).
        *   Outline the UI flow for DUPR connection on the profile edit page.
    *   **Key References:**
        *   `Docs/01_PRODUCT_REQUIREMENTS.md` (mentions DUPR)
        *   `Docs/TASKS_AND_PROGRESS.md` (Section 1.2)

**Important Note on "Singles":**
Remember the distinction:
*   **"Singles Play"**: Match format (1v1). This should be an option in `playerProfiles.preferredPlayStyle` and match filters.
*   **"Singles Feature / Court Connections (Dating)"**: A separate, premium feature for romantic connections. This is **not** part of the current MVP focus but ensure schema and profile fields for play style don't conflict with future dating feature terminology. Refer to `Docs/GLOSSARY.md`.

## 4. Agent Work Process & Logging Guidelines

**Before Starting a Task:**
1.  **Identify Yourself:** At the beginning of your session, state your agent identifier (e.g., "Agent-2: ProfileEnhancer").
2.  **Update This Document (NEXT_AGENT_PROMPT.md):**
    *   Briefly state which specific sub-task(s) from the "Immediate Tasks" list you are about to work on.
    *   Outline your high-level implementation plan for that sub-task (e.g., "For Profile Photo Upload, I will first create the frontend component, then the signed URL API endpoint...").

**During Implementation:**
1.  **Adhere to Standards:** Follow guidelines in `Docs/05_DEVELOPMENT_STANDARDS.md` (coding, Git, testing).
2.  **Refer to Docs:** Use the PRD, System Architecture, User Flows, and Wireframes as guides.
3.  **Modular Code:** Write clean, modular, and well-commented TypeScript.
4.  **Error Handling:** Implement robust error handling.
5.  **Testing:** Write unit tests for new logic. Update existing tests if applicable.

**After Completing a Task (or at the end of your session):**
1.  **Test Thoroughly:** Ensure your changes work as expected and don't break existing functionality. Run `npm run lint` and `npm run test`.
2.  **Commit Changes:** Use Conventional Commits. If a task is partially complete, make that clear in your commit message (e.g., `feat(profile): implement UI for photo upload (WIP)`).
3.  **Update Task Status:** Mark completed or in-progress tasks in `Docs/TASKS_AND_PROGRESS.md`.
4.  **Update Project Memory:**
    *   Add entries to `Docs/PROJECT_MEMORY.md` for:
        *   Any significant new architectural decisions made (ADRs).
        *   Challenges encountered and how they were resolved.
        *   Important clarifications or changes to requirements.
        *   A brief summary of the work accomplished in your session under "Agent Contributions Log".
5.  **Update This Document (NEXT_AGENT_PROMPT.md):**
    *   Update the "Current Project Status & Recent Work" section with a summary of what you *just completed*.
    *   Update the "Your Immediate Tasks" section, clearly indicating what the *next* agent should pick up. If a task is partially done, specify what remains.
    *   Refresh the "Last Updated" field at the top of this document with the current date and your agent identifier.

**If Your Work is Interrupted (e.g., context window limit):**
*   Before the interruption, try to quickly update `NEXT_AGENT_PROMPT.md` with the *exact state* of your work (what was finished, what file you were editing, what was the immediate next micro-step).
*   The next agent will start by reviewing `NEXT_AGENT_PROMPT.md` and `Docs/PROJECT_MEMORY.md` to understand the context and resume work.

This disciplined approach to updating documentation ensures continuity and allows the project to progress efficiently even with multiple AI agent handoffs.

---

**Agent, please begin by identifying yourself and stating which of the "Immediate Tasks" you will start with, along with your high-level plan.**