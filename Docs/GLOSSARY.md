# Pickleball Match - Glossary of Terms

**Version:** 1.0
**Date:** 2024-05-16
**Author:** Project Team (Compiled by AI Assistant)

This glossary defines key terms used within the Pickleball Match project documentation and application to ensure clarity and consistent understanding.

---

## A

*   **ADR (Architectural Decision Record):** A document that captures an important architectural decision made along with its context and consequences. Stored within `PROJECT_MEMORY.md`.
*   **Availability:** Refers to a player's general or specific times when they are free to play pickleball. Managed in their profile.

## B

*   **Bio:** A short description a user writes about themselves in their profile.
*   **Blocked User:** A user whom another user has chosen to prevent from contacting them or seeing their profile (depending on implementation).
*   **Bulletin Board (City):** A feature within a specific city's community page where users (especially travelers) can post announcements, look for games, or share local court information.

## C

*   **Casual Play:** Non-competitive pickleball games played for fun, practice, or social reasons. One of the match types users can seek.
*   **Clerk:** The third-party authentication service used for user registration, login, and management.
*   **Club:** An organized group of pickleball players, often associated with specific courts or a geographic area. Users can create, join, or follow clubs within the community features.
*   **Community Hub:** The main section of the application dedicated to community features, including groups, discussion boards, and events.
*   **Court Connections (Dating Feature):** The official name for the optional, premium dating feature within Pickleball Match. This is for users interested in forming romantic connections with other single pickleball players. This is distinct from "Singles Play."
*   **CTX (tRPC Context):** In the backend tRPC procedures, this object holds request-specific information, including authentication status (`auth`), database connection (`db`), and current user details (`user`).

## D

*   **Dashboard:** The main landing page for authenticated users, providing an overview of their activity, matches, and profile status.
*   **Dating Profile:** A separate profile section, part of the "Court Connections" feature, where users can provide information specific to their dating interests.
*   **Drilling:** Practicing specific pickleball shots or sequences, often with a partner. One of the match types users can seek.
*   **Drizzle ORM:** The TypeScript Object-Relational Mapper used to interact with the PostgreSQL database.
*   **DUPR (Dynamic Universal Pickleball Rating):** A widely recognized skill rating system for pickleball players. The platform aims to integrate with DUPR for verified ratings.
    *   **DUPR ID:** A user's unique identifier in the DUPR system.

## E

*   **Equipment:** Refers to pickleball gear such as paddles, balls, shoes, etc. Users can track their equipment and read/write reviews.
*   **Event:** A scheduled pickleball-related activity, such as a social mixer, clinic, or local tournament, often organized within a community or club.

## F

*   **Filter Panel:** A UI component allowing users to refine their search for partners based on various criteria (skill level, age, location, etc.).
*   **Feature Flag:** A mechanism to enable or disable specific features in the application, often used for phased rollouts or A/B testing.

## L

*   **Location Coordinates:** Latitude and longitude used for geo-based matching and distance calculations.

## M

*   **Match (Scheduled):** An agreed-upon game or playing session between two or more users, typically resulting from an accepted Match Request.
*   **Match Request:** A formal invitation sent from one user to another to play pickleball at a proposed time and location.
*   **Match Type:** The nature of the pickleball play being sought or offered (e.g., Casual Play, Tournament Partner, Drilling, Travel Play, Dating).

## P

*   **Player Profile:** The section of a user's account containing pickleball-specific information like skill level, playing style, availability, etc. Stored in the `playerProfiles` table.
*   **PWA (Progressive Web App):** The target application type, providing a web-first experience with app-like capabilities for mobile users.
*   **Protected Procedure (tRPC):** An API endpoint that requires user authentication.

## R

*   **Reach-Out List:** A list of players a user has expressed interest in (e.g., by "liking" or swiping right on them) but with whom a mutual connection or match has not yet been confirmed.
*   **Real-time Communication:** Instantaneous exchange of information, planned for features like messaging and notifications (e.g., via Socket.io).
*   **Roadmap:** The high-level plan outlining the project's phases and major feature releases.

## S

*   **shadcn/ui:** The component library used for building the user interface, based on Radix UI and Tailwind CSS.
*   **Singles Play:** A pickleball match format where one player competes against another single player. This is a *type of play* and is distinct from the "Singles Feature / Court Connections (Dating)".
*   **Skill Level:** A player's proficiency in pickleball, often represented by a DUPR rating or a self-assessed level (e.g., 2.5, 3.0, 4.0).
*   **Socket.io:** The planned technology for implementing real-time features like chat.
*   **Swipe Interface:** A common UI pattern (like in dating apps) for browsing and indicating interest in potential partners.

## T

*   **Tailwind CSS:** The utility-first CSS framework used for styling the application.
*   **Tournament Partner:** A player sought specifically to compete with in a pickleball tournament.
*   **Travel Badge:** A visual indicator on a user's profile showing they are currently traveling or have upcoming travel plans to a specific location.
*   **Travel Mode / Travel & Play:** A feature set allowing users to plan pickleball activities when traveling and connect with local players in their destination.
*   **tRPC (TypeScript Remote Procedure Call):** The framework used for building type-safe APIs between the Next.js frontend and backend.

## U

*   **User (Core):** Represents an individual with an account on the platform. Basic user data is synced from Clerk and stored in the `users` table.

---

This glossary will be a living document. As new terms or potentially ambiguous phrases arise during development, they should be added here.