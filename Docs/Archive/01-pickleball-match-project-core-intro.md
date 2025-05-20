## Master "Project Core" Document: Pickleball Match

**Project Name:** Pickleball Match

**Version:** 1.0 (as of May 10, 2025)

**1. Core Product Vision:**
To create the premier pickleball player matching platform, combining a user-friendly interface (akin to dating apps) with the specific needs of pickleball players seeking partners for recreation, competition, travel, and potentially romance (paid extra eventually). The platform aims to simplify finding compatible partners and build a strong, engaged pickleball community.

**2. Target Users (Brief Summary):**
*   **Competitive Players:** Seeking skilled partners for tournaments.
*   **Traveling Players:** Needing local connections and courts in new cities.
*   **Recreational Players:** Looking for regular playing partners and drill buddies.
*   **Singles:** Interested in finding partners for play and potential romance.

**3. Core Technology Stack:**
*   **Frontend Framework:** Next.js 14+ (React) with TypeScript
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Form Handling:** React Hook Form + Zod
*   **API Layer:** tRPC (over Next.js API Routes)
*   **Backend (Implicit with Next.js):** Node.js
*   **Database:** PostgreSQL (hosted on Railway)
*   **ORM:** Prisma
*   **Authentication:** Clerk
*   **Real-time Communication:** Socket.io
*   **File Storage:** Google Cloud Storage
*   **Payments:** Stripe
*   **Hosting/Deployment:** Vercel

**4. Main High-Level Features (MVP & Key Enhancements):**
*   **Core Pages:** Homepage, Login/Register, Dashboard (Matching Interface)
*   **Profile System:** View, Edit, Setup Wizard (Onboarding)
*   **Matching/Discovery:** Swipe Interface, Filters, Reach-Out List, Search
*   **Communication:** Messages List, Chat Interface
*   **Travel Features:** Travel Plans, City Bulletin Boards, Destination Browser
*   **Community Features:** Hub, Discussion Boards, Club Pages, Event Pages
*   **Premium/Monetization:** Upgrade Page, Dating Profile & Pool
*   **Equipment:** List, Reviews
*   **Settings & Utility:** Settings, Notifications, Help/Support

**5. Current Development Phase:**
*   Phase 0: Project Setup (Focus on repository, environment, core tech stack initialization)

**6. Key Guiding Principles:**
*   Web-first PWA approach.
*   Mobile-responsive design.
*   Focus on core matching functionality for MVP.
*   Utilize AI-assisted development where practical, guided by detailed technical documentation.