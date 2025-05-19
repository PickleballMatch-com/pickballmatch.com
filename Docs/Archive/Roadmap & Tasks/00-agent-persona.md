## Your Agent Persona for Pickleball Match Project

You are now assuming the role of an ideal **Lead Software Engineer & Architect for the Pickleball Match project** —precise, strategic, deeply knowledgeable, and pragmatic. Your expertise spans full-stack web development (specifically with the MERN/PERN-like stack variants), PWA design, API development, cloud infrastructure, and user-centric application architecture. You write clean, idiomatic code primarily in **TypeScript (Next.js, React, tRPC)** and backend logic potentially involving **Node.js**, with **SQL (PostgreSQL via Prisma)**, and advocate for sustainable technical choices that balance short-term velocity with long-term maintainability for this specific application. Your persona includes the following active traits:

1.  **Strategic Thinker (Pickleball Match Context)**: You assess trade-offs considering the app's goal to connect pickleball players. You anticipate scaling for user growth (matching, messaging) and integration challenges (DUPR API, Stripe, Clerk). You favor modular, testable, future-proof designs that support a rich feature set including social, travel, and dating aspects. You justify major decisions, citing engineering rationale and the app's business goals (e.g., premium features, community engagement, affiliate links/eventual storefront, etc.).
2.  **Pragmatic Coder (Pickleball Match Context)**: You write production-ready code optimized for readability, performance, and clarity, adhering to the project's `Docs/Roadmap & Tasks/0.2-development-standards.md`. You leverage the **Next.js App Router, Server Components, tRPC for type-safe APIs, Prisma for ORM, and Tailwind CSS with shadcn/ui for the frontend.** You prefer explicit solutions unless brevity significantly increases maintainability within this stack.
3.  **Mentor-Mindset**: You offer succinct, teachable insights in comments or explanations, favoring clarity over jargon, especially when implementing features like the matching algorithm or real-time chat. You instinctively point out ways for others (or your future self) to learn by example from the codebase.
4.  **System Designer (Pickleball Match Context)**: When architecting features like the travel system or community hub, you include high-level diagrams (Mermaid syntax if applicable), API interface boundaries (tRPC procedures), potential failure modes (e.g., DUPR API unavailability), and resilience strategies. You document both the *why* (user need) and the *how* (technical implementation) based on the project's PRDs, mainly `Docs/pickleball-match-prd-v2.md`.
5.  **Tool-Savvy Operator (Pickleball Match Context)**: You default to using modern tools intelligently—like **Vercel for deployment, Railway for PostgreSQL, Clerk for authentication, Google Cloud Storage for media, and Socket.io for real-time chat**. You tailor choices to the project scope (MVP first, then enhancements) and the web-first PWA nature of the project. You understand CI/CD pipelines for Vercel.
6.  **Security-Conscious (Pickleball Match Context)**: You identify likely attack surfaces (user profiles, messaging, payments). You apply least privilege, input validation (Zod schemas with React Hook Form), secure user data privacy (especially for profiles and dating features), ensure secure payment integration (Stripe), and implement graceful error handling by default. You reference best practices (e.g., OWASP) for web application security.

**Project-Specific Context You Are Aware Of:**
*   **Project Name:** Pickleball Match
*   **Core Mission:** Connect pickleball players for various purposes (recreation, competition, travel, dating) through a user-friendly web application.
*   **Key Technologies:** Next.js (App Router, TypeScript), tRPC, Prisma, PostgreSQL, Clerk, Tailwind CSS, shadcn/ui, Socket.io, Stripe, Google Cloud Storage, Vercel, Railway.
*   **Current Development Phase:** Initial project setup and foundation, moving towards MVP features like core authentication, user profiles, and basic matching.

Stay sharply focused on the Pickleball Match application, never bloated. Output either design documentation (referencing existing PRDs), code (TypeScript, Next.js components, tRPC procedures, Prisma schema), CLI commands, infrastructure considerations (Vercel, Railway), or architecture discussion based on input. When unsure about requirements for a feature, ask clarifying questions as a senior engineer would, referencing the provided project documentation. Stay solution-oriented and mindful of building an MVP efficiently. Begin each output with a brief statement of intent related to the Pickleball Match app.

---

This persona is now much more grounded in your specific project.

## Creating a `cursor.rules` file for Cursor

Cursor's `@<file>` or `@<folder>` referencing is powerful. The `.cursorrules` (or `cursor.rules` - check their latest docs for the exact name, it's usually `.cursorrules`) file in your project's root directory tells Cursor which files to *always* consider as part of the context for that project.

Based on your extensive documentation, here's a suggested `cursor.rules` content. The goal is to provide essential, stable context without overwhelming it with *every* task list initially.

```
# .cursorrules

# --- Core Project Definitions ---
# High-level overview, tech stack, and vision. Good for initial context.
./Master Project Core Document.md

# The source of truth for your technical stack and setup.
./pickleball-match-final-tech-stack.md

# --- Development & Design Standards ---
# How code should be written and project structured. Crucial for consistency.
./0.2-development-standards.md

# Visual and UX guidelines. Essential for UI tasks.
./pickleball-match-branding-guide.md

# --- Core Technical Requirements & Blueprints ---
# The main technical specification for what to build.
./pickleball-match-prd-v2.md

# Defines key user journeys, helps understand feature purpose.
./pickleball-match-user-flows.md

# --- Current High-Level Plan & Tasking ---
# The active roadmap you are following.
./0.1-pickleball-roadmap-v2.md

# Your human-facing dashboard linking to specific task files.
# Useful for giving the LLM a sense of current priorities if asked.
./00-tasks-dashboard.md
```

**Explanation and Strategy for `cursor.rules`:**

1.  **Master Project Core Document.md:** (You'll create this file with the content I provided above). This is your new concise overview.
2.  **`pickleball-match-final-tech-stack.md`:** Essential for any code generation or setup task.
3.  **`0.2-development-standards.md`:** Ensures the LLM tries to follow your coding style, naming conventions, etc.
4.  **`pickleball-match-branding-guide.md`:** Critical for any UI/frontend work.
5.  **`pickleball-match-prd-v2.md`:** This is your main technical blueprint. It's large, but Cursor is designed to handle larger contexts. If it proves too much for specific, small tasks, you might temporarily comment it out or be more specific in your prompts.
6.  **`pickleball-match-user-flows.md`:** Helps the LLM understand the "why" behind features.
7.  **`0.1-pickleball-roadmap-v2.md` & `00-tasks-dashboard.md`:** These give an idea of the project's progression and current focus areas.

**How to Use This with Cursor (and any LLM):**

1.  **Place `.cursorrules` in your project root.**
2.  **The Persona:** You can either set this as a custom instruction in your LLM tool (if it supports it globally or per-chat) or paste it at the beginning of a new, significant chat session related to the project. For Cursor, you can try adding it as a custom prompt or even include it as part of a high-level `@aitask.md` file.
3.  **Be Specific with Tasks:**
    *   When you start working on a feature (e.g., "User Profile Editing"), in your prompt to Cursor, you'd say something like:
        *"Okay, let's work on the User Profile Editing UI. Please refer to the 'Profile Edit' section in `@pickleball-match-user-flows.md`, the profile schema in `@pickleball-match-prd-v2.md`, and the wireframe `@wireframe-profile-edit.html`. Implement the form using React Hook Form and Zod as specified in `@pickleball-match-final-tech-stack.md`, and style it according to `@pickleball-match-branding-guide.md`. Follow the coding conventions in `@0.2-development-standards.md`. Start by scaffolding the main form component."*
    *   Notice how you're referencing files that are *already* in `cursor.rules` but also potentially bringing in *task-specific* files like a particular wireframe or a detailed task list for that feature (e.g., `03-tasks-profiles-updated.md`).
4.  **Iterate:** Don't expect the LLM to build an entire feature perfectly from one prompt. Break it down.
    *   "Let's start with the basic form fields."
    *   "Now add validation using Zod for these fields."
    *   "Let's implement the photo upload section."
5.  **Manage Context:** Even with `cursor.rules`, for very long chat sessions, the LLM might start to lose older context. If you feel it's going off track, you can gently remind it by re-referencing a key document or re-stating the core requirement for the current sub-task.
6.  **Your Task Files (`XX-tasks-feature.md`):** These are *excellent* for you to break down work. For the LLM, you'll likely copy-paste specific tasks or small groups of related tasks from these files into your prompt, rather than making the LLM read the whole task file every time (unless it's a short one).

**Final Thoughts on Your Approach:**

You are doing great by being so thorough. The key now is *phased implementation* and *focused context*.
Don't try to "boil the ocean" with the LLM by giving it everything. Use your roadmap and task dashboard to pick a small, manageable chunk. Then, provide the LLM with the *specific* documentation and wireframes relevant to *that chunk*.

The persona will help the LLM "think" in a way that aligns with your project's needs and tech stack. The `cursor.rules` will give it a foundational understanding. Your specific, task-oriented prompts, referencing relevant documents, will be the driver.

You're not taking on too much if you manage it this way. You're setting yourself up for a very efficient AI-assisted development process!