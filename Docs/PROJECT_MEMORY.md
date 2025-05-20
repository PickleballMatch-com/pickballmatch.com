# Project Memory - Pickleball Match

**Version:** 1.0
**Last Updated:** 2024-05-16 (by AI Assistant)

## 1. Project Overview

Pickleball Match is a web-first Progressive Web App (PWA) aimed at becoming the #1 global platform for pickleball players. It facilitates connections for various play types (casual, tournament, travel, drilling), community engagement, and an optional dating feature. The core goal is to make finding compatible pickleball partners intuitive and comprehensive.

*   **Key Reference:** [Project Charter](./00_PROJECT_CHARTER.md)
*   **Key Reference:** [Product Requirements Document](./01_PRODUCT_REQUIREMENTS.md)

## 2. Current Status (as of 2024-05-16)

*   **Overall Phase:** Phase 1: Core MVP Features - User Authentication & Profile Foundation (In Progress)
*   **Last Major Work Completed:**
    *   Initial project setup (Next.js, TypeScript, Clerk, Drizzle, tRPC, Tailwind, shadcn/ui).
    *   Core database schema defined and migrated for users, player profiles, and initial feature set.
    *   Basic authentication flow implemented and working.
    *   Initial User Profile API endpoints (sync, get current, update basic player profile fields) implemented.
    *   Client-side profile management (`useProfileSync`, Profile Edit/View pages) for basic fields.
    *   Profile Completion System (utilities, components, guard) implemented.
*   **Current Focus:** Advancing the "User Authentication & Profile Foundation" section, specifically moving towards more advanced profile features like media management and DUPR integration.
*   **Key Reference:** [Tasks and Progress](./TASKS_AND_PROGRESS.md)
*   **Key Reference:** [Roadmap](./ROADMAP.md)

## 3. Key Architectural & Technical Decisions (ADRs)

This section will log significant decisions made during the project.

### 3.1. ADR-001: Technology Stack Selection
*   **Date:** Initial Project Setup (Pre 2024-05-10)
*   **Decision:**
    *   **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui.
    *   **API:** tRPC for primary client-server communication.
    *   **Authentication:** Clerk.
    *   **Database:** PostgreSQL with Drizzle ORM.
    *   **Real-time (Planned):** Socket.io.
*   **Rationale:**
    *   Next.js App Router for modern React development and performance.
    *   TypeScript and tRPC for end-to-end type safety.
    *   Clerk for rapid, secure authentication implementation.
    *   PostgreSQL/Drizzle for robust relational data storage and a pleasant ORM experience.
    *   Tailwind/shadcn/ui for efficient and customizable UI development.
*   **Status:** Implemented. Documented in [System Architecture](./03_SYSTEM_ARCHITECTURE.md).

### 3.2. ADR-002: User & Player Profile Data Separation
*   **Date:** Initial Schema Design (Pre 2024-05-10)
*   **Decision:** User data split into two main tables: `users` (basic info, synced from Clerk) and `playerProfiles` (pickleball-specific details).
*   **Rationale:**
    *   `users` table directly maps to Clerk user IDs and stores essential auth-related data.
    *   `playerProfiles` table keeps sport-specific data separate, allowing for more complex fields without cluttering the core user table.
    *   Clear separation of concerns for authentication identity vs. application-specific profile.
*   **Status:** Implemented. Schema in `src/server/db/schema.ts`.

### 3.3. ADR-003: tRPC Transformer Removal (Temporary)
*   **Date:** ~2024-05-10 (Inferred from `NEXT_AGENT_PROMPT.md`)
*   **Decision:** Temporarily removed SuperJSON transformer from tRPC setup to resolve serialization issues.
*   **Rationale:** To unblock development and ensure basic tRPC functionality while investigating the root cause of serialization problems, particularly with Date objects or other complex types that SuperJSON handles.
*   **Consequences & Follow-up:**
    *   Currently, only basic JSON-serializable types can be reliably passed via tRPC without issues (e.g., Dates might be strings).
    *   This needs to be revisited. SuperJSON (or another transformer) is generally recommended with tRPC for handling complex data types like Dates, BigInts, etc., correctly.
    *   **Action Item:** Investigate and re-integrate a tRPC transformer (SuperJSON or alternative) and ensure all data types are handled correctly across client/server.
*   **Status:** Implemented (transformer removed). Follow-up needed.

### 3.4. ADR-004: Profile Completion Logic
*   **Date:** ~2024-05-15 (Inferred from `NEXT_AGENT_PROMPT.md` and task list)
*   **Decision:** Implemented a weighted profile completion system. Key fields in `users` and `playerProfiles` are assigned weights to calculate a completion percentage. A threshold (e.g., 70%) determines if a profile is "complete" for accessing certain features.
*   **Rationale:**
    *   Encourages users to fill out their profiles thoroughly.
    *   Provides a quantifiable measure of profile completeness.
    *   Allows gating features based on profile completeness to ensure a better experience (e.g., matching requires sufficient info).
*   **Status:** Implemented. Utilities in `src/lib/utils/profileUtils.ts`, components in `src/components/profile/`.

## 4. Challenges Encountered & Resolutions

*   **Challenge (Resolved): tRPC Serialization Issues with Profile Updates**
    *   **Description:** Profile update functionality was not working correctly, possibly due to issues serializing/deserializing data (especially Dates or complex objects) between client and server with the tRPC transformer (likely SuperJSON).
    *   **Resolution (Initial):** The tRPC transformer (SuperJSON) was temporarily removed. Data transmission was simplified, and error handling was enhanced in the `profiles.updatePlayerProfile` mutation.
    *   **Impact:** Profile updates for basic fields are now working.
    *   **Next Steps:** Re-evaluate the need for a transformer and address any underlying data type issues. See ADR-003.

*   **Challenge (Ongoing): Efficient Task & Progress Tracking for AI Collaboration**
    *   **Description:** Initial proliferation of many separate task documents led to confusion and difficulty in maintaining a clear overview of progress.
    *   **Resolution (In Progress):**
        *   Consolidated detailed tasks into `Docs/TASKS_AND_PROGRESS.md`.
        *   Established this `PROJECT_MEMORY.md` for historical context and decisions.
        *   Refining `NEXT_AGENT_PROMPT.md` for focused, actionable handoffs.
    *   **Impact:** Aims to streamline documentation and improve clarity for both human and AI developers.
    *   **Next Steps:** Continuously maintain these core documents.

## 5. Requirements Clarifications & Evolution

*   **"Singles" Terminology:**
    *   **Initial Confusion:** The term "Singles" could refer to a match play format (one player vs. one player) or the dating feature.
    *   **Clarification (2024-05-16):** These must be clearly distinguished.
        *   **"Singles Play / Doubles Play / Mixed Doubles Play":** Refers to pickleball match formats.
        *   **"Singles Feature / Court Connections (Dating)":** Refers to the optional, premium dating functionality.
    *   **Action:** Update PRD, User Flows, Wireframes, and UI text to reflect this distinction. Add to `Docs/GLOSSARY.md`.
    *   **Impact:** Clearer user understanding and more precise feature implementation.

*   *(Add more entries here as requirements are clarified or evolve over time)*

## 6. Agent Contributions Log

*   **Agent-0 (Initial Setup & Planning):**
    *   Established initial project structure, documentation framework.
    *   Defined core features and initial PRD concepts.
*   **Agent-1 (You/Human Developer - up to 2024-05-16):**
    *   Implemented Next.js, Clerk, Drizzle, tRPC foundations.
    *   Created initial database schema.
    *   Developed basic User and Player Profile API endpoints and UI for create/edit.
    *   Implemented the Profile Completion system (utilities, components, guard).
    *   Fixed profile update tRPC issues.
    *   Set up initial project documentation and wireframes.
*   **Agent-2 (AI Assistant - 2024-05-16):**
    *   Assisted in reorganizing project documentation.
    *   Generated consolidated document templates (`PROJECT_CHARTER.md`, `TASKS_AND_PROGRESS.md` parts 1 & 2, this `PROJECT_MEMORY.md`, `SYSTEM_ARCHITECTURE.md`, `USER_FLOWS_AND_WIREFRAMES_OVERVIEW.md`).
    *   Drafted `GLOSSARY.md`.

## 7. Current Development Focus (from `NEXT_AGENT_PROMPT.md`)

*   Enriching the profile system:
    *   Media Management (Photo Upload, Video Embedding)
    *   DUPR Integration
    *   Advanced Profile Features (Equipment Tracking, Travel Preferences, Public Profile View)
*   **Key Reference:** [NEXT_AGENT_PROMPT.md](../NEXT_AGENT_PROMPT.md) (or its new location if moved to `Docs/`)

---

This document should be updated regularly, especially after major features are completed, key decisions are made, or significant challenges are overcome.