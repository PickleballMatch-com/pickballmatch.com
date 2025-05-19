
## Pickleball Match App - Professional Development Standards v1.1

**Version:** 1.1
**Last Updated:** May 10, 2025
**Status:** Active

---

This document outlines the professional development standards for the Pickleball Match app. Adherence to these standards is crucial for ensuring code quality, maintainability, scalability, and effective collaboration (even with AI assistants).

## 1. Version Control Strategy

### Repository Organization
*   **Platform:** GitHub.
*   **Access Control:** Host all code on GitHub with appropriate access controls. Protect the `main` branch from direct commits.
*   **Main Branch (`main`):** Protected. No direct commits. Represents production-ready, deployable code. Merges only from `develop` (via release process) or `hotfix/*`.
*   **Develop Branch (`develop`):** Protected. All features must be merged via Pull Requests. Represents the integration branch, always in a working state, deployed to staging. Merges from `feature/*` and `bugfix/*`.

### Branching Strategy (Simplified GitFlow)
*   **`main`**: Production-ready code only, always deployable.
*   **`develop`**: Integration branch for features, always in a working state.
*   **`feature/[feature-name]`**: Individual feature branches (e.g., `feature/user-auth`, `feature/swipe-interface`). Branched from `develop`. Merged back to `develop`.
*   **`bugfix/[issue-description]`**: For non-critical bug fixes. Branched from `develop`. Merged back to `develop`. (e.g., `bugfix/login-form-validation`).
*   **`hotfix/[critical-fix-description]`**: For urgent production fixes. Branched from `main`. Merged back to *both* `main` and `develop`.

### Branch Naming Convention
*   Use kebab-case.
*   Be descriptive but concise.
    ```
    feature/short-description
    bugfix/issue-description
    hotfix/critical-fix-description
    ```
    *   **Examples:** `feature/user-profile-editing`, `bugfix/dupr-sync-error`, `hotfix/payment-gateway-timeout`

### Commit Messages
*   **Follow Conventional Commits pattern:** `<type>(<scope>): <subject>`
    *   **Types:** `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting, missing semi-colons, etc.), `refactor`, `test`, `chore` (build changes, etc.).
    *   **Scope (optional):** Module or part of the app affected (e.g., `auth`, `profile-ui`, `matching-algo`).
    *   **Subject:** Concise description of the change, present tense, imperative mood (e.g., "add password reset functionality").
*   **Example:**
    ```
    feat(auth): implement Clerk sign-up flow
    fix(profile): correct DUPR rating display on profile card
    docs(readme): update setup instructions
    refactor(api): optimize user query in profile-router
    test(components): add unit tests for Button component
    ```
*   Write meaningful commit messages that explain the *why* as well as the *what*.

### Pull Request (PR) Process
1.  **Branch from `develop`** for features/bugs.
2.  **Create PR** from your `feature/*` or `bugfix/*` branch to `develop`.
3.  **Fill PR Template Thoroughly:**
    *   Link to the relevant GitHub issue(s).
    *   Clearly state the purpose of the changes.
    *   Describe testing performed (manual steps, automated test additions).
    *   Include screenshots or GIFs for UI changes.
    *   Note any new dependencies or environment variable changes.
4.  **Self-Review First:** Use the PR checklist (see section 10).
5.  **Automated Checks:** Ensure all CI checks (linting, type checking, tests, Vercel preview build) pass.
6.  **Code Review (if applicable):** If working with others, require at least one approval. For solo work with AI, use this as a structured final check.
7.  **Merge:** Use "Squash and Merge" or "Rebase and Merge" (choose one and be consistent) to keep `develop` history clean.
8.  **Delete Branch After Merge:** Keep the repository tidy.

### Multiple GitHub Account Setup
The PickleballMatch-com project uses a dedicated GitHub account separate from personal developer accounts. Developers should:

1. Configure SSH for multiple accounts using a custom Host in ~/.ssh/config:
   ```
   # PickleballMatch-com account
   Host github-pickleball
     HostName github.com
     User git
     IdentityFile ~/.ssh/id_ed25519_pickleball
   ```

2. Use the custom Host in Git remote URLs:
   ```
   git@github-pickleball:PickleballMatch-com/pickballmatch.com.git
   ```

3. For new clones or pushes, always use this format to ensure proper authentication.

### Practical Git Workflow Guide

This guide provides step-by-step instructions for managing branches in the PickleballMatch-com project. Follow these instructions in sequence for each feature development cycle.

#### Initial Setup (One-time only)

```bash
# Clone the repository (if not already done)
git clone git@github-pickleball:PickleballMatch-com/pickballmatch.com.git
cd pickballmatch.com

# Create develop branch from main and push it
git checkout -b develop
git push -u origin develop
```

#### Feature Development Cycle

1. **Start a new feature**
   ```bash
   # Make sure you're on develop branch and it's up to date
   git checkout develop
   git pull origin develop
   
   # Create a new feature branch
   git checkout -b feature/my-feature-name
   ```

2. **Work on your feature**
   ```bash
   # Make changes to files...
   
   # Check what files you've changed
   git status
   
   # Add files to staging
   git add file1.js file2.js
   # Or add all files: git add .
   
   # Commit your changes with a descriptive message
   git commit -m "feat: implement user profile form"
   
   # Push your branch to GitHub
   git push -u origin feature/my-feature-name
   ```

3. **Update your feature branch with latest changes from develop (if needed)**
   ```bash
   # Fetch latest from develop
   git checkout develop
   git pull origin develop
   
   # Switch back to your feature branch
   git checkout feature/my-feature-name
   
   # Merge develop into your feature branch
   git merge develop
   
   # Resolve any conflicts if they occur
   # Then push your updated branch
   git push origin feature/my-feature-name
   ```

4. **Complete your feature**
   ```bash
   # Make sure all your changes are committed
   git status
   
   # Push final changes
   git push origin feature/my-feature-name
   ```

5. **Create a Pull Request (PR)**
   - Go to GitHub repository page
   - Click "Pull requests" tab
   - Click "New pull request"
   - Set "base" to `develop`
   - Set "compare" to `feature/my-feature-name`
   - Add descriptive title and details
   - Click "Create pull request"

6. **Merge to develop**
   - Once PR is approved, click "Merge pull request"
   - Delete the feature branch on GitHub when prompted
   - Locally, clean up:
   ```bash
   git checkout develop
   git pull origin develop  # Get the merged changes
   git branch -d feature/my-feature-name  # Delete local feature branch
   ```

7. **Testing on staging**
   - Vercel will automatically deploy develop branch to staging environment
   - Test your feature on the staging environment

#### Release to Production

When ready to release to production:

1. **Create a release branch** (optional for major releases)
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.0.0
   # Make any final adjustments if needed
   git push origin release/v1.0.0
   ```

2. **Create a PR from develop to main**
   - Create PR from `develop` to `main` (or from `release/v1.0.0` to `main`)
   - Review thoroughly
   - Merge when ready

3. **Tag the release**
   ```bash
   git checkout main
   git pull origin main
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   ```

#### Quick Reference: Common Git Commands

```bash
# Check which branch you're on
git branch

# Switch to a branch
git checkout branch-name

# Create and switch to a new branch
git checkout -b new-branch-name

# See commit history
git log --oneline --graph

# Discard uncommitted changes to a file
git checkout -- filename

# Undo the last commit but keep changes
git reset --soft HEAD~1

# See all remotes
git remote -v
```

#### Troubleshooting Common Issues

1. **Wrong branch**: If you realize you're working on the wrong branch:
   ```bash
   # Save your changes to a stash
   git stash
   
   # Switch to the correct branch
   git checkout correct-branch
   
   # Apply your stashed changes
   git stash apply
   ```

2. **Accidentally committed to develop/main**: If you committed directly to develop or main:
   ```bash
   # Create a new branch with your changes
   git checkout -b feature/my-feature
   
   # Reset develop/main to origin
   git checkout develop
   git reset --hard origin/develop
   ```

3. **Merge conflicts**: When you get merge conflicts:
   - Open the conflicted files in your editor
   - Look for the conflict markers (<<<<<<, =======, >>>>>>)
   - Resolve the conflicts by editing the files
   - Save the files
   - `git add` the resolved files
   - `git commit` to complete the merge

#### Git Workflow Visualization

```
main            ─────────────────────────────────────────────────► Production
                   ▲                                     ▲
                   │                                     │
                   │ (release PR)                        │ (hotfix PR)
                   │                                     │
develop         ───┴─────────────────────────────────────────────► Staging
                     ▲      ▲         ▲                   ▲
                     │      │         │                   │
feature/feat1    ────┘      │         │                   │
                            │         │                   │
feature/feat2    ───────────┘         │                   │
                                      │                   │
feature/feat3    ────────────────────┘                   │
                                                         │
hotfix/bug1      ─────────────────────────────────────────┘
```

This diagram shows how feature branches are merged into develop (staging), and develop is periodically merged into main (production). Hotfixes can be merged directly to both main and develop.

---

## 2. Code Quality Standards

### Clerk and tRPC Integration Notes
*   **Clerk Server-Side Import:** When using Clerk authentication on the server side, always import from `@clerk/nextjs/server`, not `@clerk/nextjs`:
    ```typescript
    // Correct import for server components and API routes
    import { getAuth, currentUser } from '@clerk/nextjs/server';

    // Wrong import for server components (will cause build errors)
    // import { auth, currentUser } from '@clerk/nextjs';
    ```

*   **tRPC Error Handling Pattern:** When implementing tRPC procedures that require authentication:
    ```typescript
    // In your tRPC router
    export const userRouter = router({
      getProfile: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
          // ctx.auth.userId will be available and authenticated
          // Use proper error handling for database operations
          try {
            const profile = await ctx.db.query.profiles.findFirst({
              where: eq(profiles.userId, input.userId)
            });

            if (!profile) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Profile not found'
              });
            }

            return profile;
          } catch (error) {
            // Log error details server-side
            console.error('Error fetching profile:', error);

            // Return a clean error to client
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to fetch profile'
            });
          }
        })
    });
    ```

### General Guidelines
*   **Readability:** Prioritize clear, understandable code. Write for humans (and future you/LLMs) first.
*   **DRY (Don't Repeat Yourself):** Abstract common logic into reusable functions, hooks, or components.
*   **KISS (Keep It Simple, Stupid):** Favor simple solutions over complex ones.
*   **Self-Documenting Code:** Use clear and descriptive names for variables, functions, and components.
*   **Function Size:** Aim for small, focused functions (ideally under 10-15 lines, as a guideline, not a strict rule). Each function should have a single responsibility.
*   **Comments:** Comment complex or non-obvious logic. Explain *why* something is done, not just *what* it does if the code is self-explanatory. Avoid redundant comments.
*   **No Magic Numbers/Strings:** Use named constants for values that are not immediately obvious.
*   **Error Handling:** Implement robust error handling for API calls, user input, and potential failures.

### TypeScript Guidelines
*   **Strict Typing:** Enable `strict` mode in `tsconfig.json`.
*   **Explicit Types:** Use proper typing for all variables, function parameters, and return values.
*   **Avoid `any`:** Use `any` sparingly and only when absolutely necessary and unavoidable. Prefer `unknown` and type guards if the type is truly unknown.
*   **Interfaces & Types:** Use `interface` for object shapes and `type` for unions, intersections, or simpler type aliases. Be consistent.
*   **Enums:** Use `enum` or string literal unions for sets of related constant values (e.g., user roles, status types).
*   **Utility Types:** Leverage TypeScript's utility types (e.g., `Partial`, `Readonly`, `Pick`) where appropriate.

### React Component Guidelines (Next.js App Router)
*   **Functional Components & Hooks:** Exclusively use functional components with React Hooks.
*   **Component Granularity:** Break down complex UI into smaller, reusable, and testable components. Keep UI components free of business logic.
*   **Server vs. Client Components:** Understand and correctly utilize Next.js Server Components (`async/await` for data fetching) and Client Components (`"use client"` for interactivity).
*   **Props:** Use clear and well-typed props. Destructure props.
*   **State Management:**
    *   Use `useState` for simple local component state.
    *   Use `useReducer` for more complex local state.
    *   Consider React Context or a lightweight state management library (e.g., Zustand, Jotai - *if needed later, not for MVP start*) for global or shared state. Avoid prop-drilling.
*   **Custom Hooks:** Extract reusable stateful logic and side effects into custom hooks (e.g., `useAuth`, `useUserProfile`).
*   **Accessibility (a11y):** Build accessible components from the start (semantic HTML, ARIA attributes where necessary, keyboard navigability). Use `shadcn/ui` primitives as they are built with accessibility in mind.

### Example of Good vs. Bad Code

**Bad Code:**
```typescript
// Too long, multiple responsibilities, magic numbers
function processUser(data: any) {
  console.log("Processing user...");
  const name = data.name;
  if (!name) {
    console.log("Missing name!");
    return;
  }
  let isPremium = false;
  if (data.subscription === "premium" || data.subscription === "pro") {
    isPremium = true;
  }
  let duprAdjustment = 0;
  if (data.matches > 100) {
    duprAdjustment = 0.2;
  }
  const adjustedRating = data.duprRating + duprAdjustment;
  console.log(`User ${name} processed with rating: ${adjustedRating}`);
  return { name, isPremium, rating: adjustedRating };
}
```

**Good Code:**
```typescript
// Assume logger is configured elsewhere (e.g., imported from a lib)
// Assume UserProfile interface is defined in types.ts

// Types defined
interface UserData {
  name: string;
  subscription?: string;
  matches?: number;
  duprRating?: number;
}

// Constants instead of magic values
const PREMIUM_TYPES = ['premium', 'pro'];
const MATCH_THRESHOLD = 100;
const RATING_ADJUSTMENT = 0.2;

// Small, focused functions
function isValidUser(data: UserData): boolean {
  return !!data.name;
}

function isPremiumUser(subscription?: string): boolean {
  return PREMIUM_TYPES.includes(subscription || '');
}

function calculateAdjustedRating(rating: number = 0, matches: number = 0): number {
  const adjustment = matches > MATCH_THRESHOLD ? RATING_ADJUSTMENT : 0;
  return rating + adjustment;
}

function processUser(data: UserData): UserProfile | null { // Assuming UserProfile is a defined type
  if (!isValidUser(data)) {
    // logger.error('Invalid user data: missing name'); // Use your actual logger
    console.error('Invalid user data: missing name'); // Placeholder
    return null;
  }

  const isPremium = isPremiumUser(data.subscription);
  const rating = calculateAdjustedRating(data.duprRating, data.matches);

  // logger.info(`User ${data.name} processed with rating: ${rating}`); // Use your actual logger
  console.info(`User ${data.name} processed with rating: ${rating}`); // Placeholder

  // Construct and return a UserProfile object (assuming its structure)
  return {
    name: data.name,
    isPremium,
    rating,
    // ... other UserProfile properties
  } as UserProfile; // Cast if UserProfile has more properties
}
```

---

## 3. Project Structure

### Directory Organization (Next.js App Router)
```
pickleball-match/
├── .github/            # GitHub Actions workflows, PR templates, issue templates
├── .vscode/            # VSCode settings for consistent dev experience
├── app/                # Next.js App Router (main application code)
│   ├── (auth)/           # Route group for auth pages (e.g., login, register)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/           # Route group for main authenticated app layout
│   │   ├── dashboard/page.tsx
│   │   ├── profile/
│   │   │   ├── [userId]/page.tsx
│   │   │   └── edit/page.tsx
│   │   └── layout.tsx    # Layout for authenticated routes
│   ├── api/              # API Route Handlers (if not fully on tRPC for some reason)
│   │   └── trpc/[...trpc]/route.ts # tRPC handler
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/         # Shared/reusable React components
│   ├── ui/             # shadcn/ui components (e.g., button.tsx, card.tsx)
│   ├── layout/         # Global layout components (e.g., Navbar, Footer)
│   ├── forms/          # Reusable form components
│   └── features/       # Components specific to a feature
│       ├── profile/    # e.g., ProfileCard.tsx, ProfileForm.tsx
│       └── matching/   # e.g., SwipeCard.tsx
├── prisma/             # Prisma schema, migrations, seed scripts
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── public/             # Static assets (images, fonts, manifest.json)
├── server/             # Backend-specific logic (tRPC router definitions)
│   ├── routers/
│   │   ├── _app.ts     # Root tRPC router
│   │   ├── auth.ts
│   │   └── user.ts
│   └── trpc.ts         # tRPC initialization
├── lib/                # Shared utilities, helpers, constants
│   ├── auth.ts         # Clerk helper functions, session utilities
│   ├── db.ts           # Prisma client instance
│   ├── env.ts          # Environment variable access (as defined in section 4)
│   ├── types.ts        # Global TypeScript type definitions/interfaces
│   ├── utils.ts        # General utility functions
│   └── validation/     # Zod schemas
├── styles/             # Global CSS, Tailwind base styles
│   └── globals.css
├── tests/              # Test files (Jest, React Testing Library)
│   ├── __mocks__/
│   ├── components/
│   └── e2e/            # Playwright tests (when implemented)
├── .env.example        # Example environment variables
├── .eslintrc.json      # ESLint configuration
├── .gitignore
├── next.config.mjs     # Next.js configuration
├── package.json
├── postcss.config.js   # PostCSS configuration (for Tailwind)
├── README.md
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```
*This structure is a suggestion and can be adapted. The key is consistency and clear separation of concerns.*

### Naming Conventions
*   **Files and Directories**: `kebab-case` (e.g., `user-profile.tsx`, `auth-flow/`)
*   **React Components**: `PascalCase` (e.g., `UserProfile.tsx`)
*   **React Hooks**: `camelCase` with `use` prefix (e.g., `useAuth.ts`, `useProfileData.ts`)
*   **Utility Functions/Variables**: `camelCase` (e.g., `calculateDuprRating.ts`, `defaultUserProfile`)
*   **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_SWIPES_FREE_TIER`, `API_BASE_URL`)
*   **Interfaces/Types**: `PascalCase` (e.g., `UserProfile`, `MatchRequest`)
*   **tRPC Procedures/Routers**: `camelCase` for procedures, routers usually align with module names.

---

## 4. Environment Management

### Environment Types
*   **Development**: Local development environment (via `npm run dev`).
*   **Staging**: Testing environment mirroring production, deployed from `develop` branch on Vercel.
*   **Production**: Live application for end-users, deployed from `main` branch on Vercel.
*   **Preview**: Per-PR deployments on Vercel from `feature/*` branches.

### Environment Variable Management
*   Store environment variables in Vercel for each environment (Production, Staging, Development - linked to your Vercel account for local dev).
*   Use `.env.example` in the repository to document all required variables.
*   **NEVER** commit actual `.env` or `.env.local` files containing secrets to the repository.
*   Access environment variables in a type-safe manner using a helper module:
  ```typescript
  // src/lib/env.ts (Example structure)
  import { z } from 'zod';

  const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    // Add other environment variables here
    // e.g., GOOGLE_CLOUD_PROJECT_ID: z.string().optional(),
  });

  // Validate and parse environment variables at runtime start
  // This will throw an error if required variables are missing or invalid
  export const env = envSchema.parse(process.env);
  ```

### Required Environment Variables (from `.env.example`)
```
# .env.example
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY
# Optional: NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
# Optional: NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
# Optional: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
# Optional: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile-setup

# Google Cloud (for File Storage & Maps)
GOOGLE_CLOUD_PROJECT_ID=your-gcp-project-id
# GOOGLE_CLOUD_CREDENTIALS_JSON should be set as a single-line JSON string in Vercel env vars
# For local dev, you might point to a service account key file path via GOOGLE_APPLICATION_CREDENTIALS
GOOGLE_CLOUD_BUCKET_NAME=your-unique-bucket-name
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaYourMapsApiKey...

# Stripe (when implemented for Premium Features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application Specific
NEXT_PUBLIC_APP_URL=http://localhost:3000 # For local dev; Vercel sets VERCEL_URL for previews/prod

# Add other API keys as needed (e.g., DUPR_API_KEY)
```

---

## 5. Testing Strategy

### Testing Levels & Priorities
1.  **Unit Tests (Jest & React Testing Library):**
    *   Focus on testing individual functions (e.g., `lib/utils.ts`), custom hooks (e.g., `hooks/useAuth.ts`), and simple UI components (e.g., `components/ui/Button.tsx`).
    *   Test business logic (e.g., calculations within matching algorithm components, validation logic in Zod schemas).
    *   Ensure utility functions behave as expected with various inputs.
2.  **Component Integration Tests (React Testing Library):**
    *   Test interactions between several components, especially forms and complex UI elements (e.g., the swipe interface, filter panel).
    *   Verify props are passed correctly and events trigger expected outcomes.
    *   Focus on user interactions with components (e.g., filling a form and submitting).
3.  **tRPC Procedure Tests (Jest/Supertest-like approach or integrated testing):**
    *   Test API logic within tRPC procedures, including input validation (Zod schemas) and expected outputs/errors.
4.  **Critical Path End-to-End (E2E) Testing (Playwright - to be implemented after MVP core features stabilize):**
    *   User registration and login flow.
    *   Profile creation and basic editing.
    *   Core matching flow (applying filters, swiping, establishing a connection).
    *   Sending and receiving a basic message.
    *   (Later) Premium upgrade flow.
    *   Initially, focus on "happy path" scenarios for E2E tests.

### Testing Tools
*   **Unit/Component/Integration:** Jest with React Testing Library.
*   **E2E:** Playwright (to be implemented post-MVP or as core features stabilize).

### Test File Organization
*   Place test files (`.test.ts` or `.spec.ts`) alongside the code they are testing (colocation) for components, hooks, and utilities within `app/`, `components/`, `lib/`, and `server/` directories.
    ```
    app/(main)/dashboard/
      page.tsx
      Dashboard.test.tsx  // Example test for dashboard page interactions
    components/ui/
      button.tsx
      button.test.tsx     // Test for the shadcn/ui button behavior if customized
    lib/utils/
      calculateDupr.ts
      calculateDupr.test.ts
    server/routers/
      user.ts
      user.test.ts        // Test for tRPC user router procedures
    ```
*   Broader integration or E2E tests can live in a top-level `tests/` directory.
    ```
    tests/
      e2e/
        authentication.spec.ts
        matching.spec.ts
      integration/
        profile-messaging-flow.spec.ts
    ```

### Minimum Test Coverage (Targets, strive for these)
*   **Critical Business Logic (utils, server/trpc logic):** Strive for 80%+.
*   **UI Components:** Focus on testing behavior, accessibility, and interactions, not implementation details. Ensure key user flows through components are covered.
*   **API (tRPC procedures):** Test happy paths, common error cases, and especially input validation.
*   **Aim for tests that provide high confidence** in the stability and correctness of the application.

---

## 6. Documentation Standards

### Code-Level Documentation
*   Use JSDoc comments for all exported functions, classes, types, and complex internal logic.
  ```typescript
  /**
   * Calculates the compatibility score between two pickleball players.
   * Considers DUPR rating, playing style preferences, and location proximity.
   * @param player1 - The profile of the first player.
   * @param player2 - The profile of the second player.
   * @returns A compatibility score ranging from 0 to 100.
   */
  function calculateCompatibility(player1: UserProfile, player2: UserProfile): number {
    // ... complex logic ...
    return score;
  }
  ```
*   Keep comments up-to-date with code changes.

### Project Documentation
Maintain the following documentation in the root of the repository or a `/docs` folder:
*   `README.md`: Project overview, purpose, tech stack summary, setup instructions, how to run locally, link to deployment.
*   `CHANGELOG.md`: Maintained for each release, detailing new features, bug fixes, and breaking changes. (Can be auto-generated based on conventional commits).
*   `CONTRIBUTING.md` (if applicable later): Guidelines for contributing.
*   **Technical Design Docs:** For complex features (e.g., Matching Algorithm, Real-time Chat Architecture), create brief Markdown documents outlining the approach, data models, and key components. Store in `/docs/design/`.
*   **API Documentation:** Since using tRPC, type safety is a primary benefit. OpenAPI/Swagger might be overkill initially but consider if exposing a public API later. For internal use, well-typed tRPC routers are self-documenting to a degree.

### Decision Records
For significant technical decisions (e.g., choosing a library, changing architecture), create a brief Markdown document in `/docs/decisions/` (Architectural Decision Records - ADRs).
```
# ADR-001: Choice of Authentication Provider

## Status
Accepted

## Context
We need a robust and secure authentication system for user registration, login, and session management. Options considered were building custom auth, Firebase Auth, NextAuth.js, and Clerk.

## Decision
We will use Clerk for authentication.

## Consequences
+ **Pros:**
    + Rapid development and integration with Next.js.
    + Handles complex auth flows (MFA, social logins, password reset) out-of-the-box.
    + Provides pre-built UI components, saving development time.
    + Manages user sessions securely.
    + Good Vercel integration.
- **Cons:**
    + Dependency on a third-party service.
    + Potential cost at scale.
    + Less flexibility than a custom solution.
```

---

## 7. Deployment & CI/CD

### Deployment Strategy
*   **Platform:** Vercel.
*   **Environments & Branch Mapping:**
    *   `feature/*` branches → Automatic Vercel Preview Deployments (unique URL for each PR).
    *   `develop` branch → Automatic Deployment to Staging Environment (e.g., `staging.pickleball-match.com`).
    *   `main` branch → Automatic Deployment to Production Environment (e.g., `www.pickleball-match.com`) upon merging.

### Continuous Integration (CI)
*   **Trigger:** On every push to any branch and on Pull Request creation/update.
*   **Tools:** GitHub Actions (define workflows in `.github/workflows/`).
*   **Workflow (`ci.yml`):**
    1.  Checkout code.
    2.  Set up Node.js.
    3.  Install dependencies (`npm ci`).
    4.  **Linting:** `npm run lint` (ESLint).
    5.  **Type Checking:** `npm run typecheck` (TypeScript compiler `tsc --noEmit`).
    6.  **Unit & Component Tests:** `npm run test`.
    7.  **Build Application:** `npm run build` (to catch Next.js build errors early).
*   All CI checks must pass before a PR can be merged into `develop` or `main`.
*   Vercel's own build and deployment checks also serve as part of CI.

### Deployment Checklist (For merging `develop` to `main` for a Production Release)
*   All features for the release are complete and tested on staging.
*   All automated tests (unit, integration, E2E if available) are passing in CI for the release branch.
*   No TypeScript errors or critical ESLint warnings.
*   Manually tested critical user flows on the staging environment.
*   Performance metrics (Core Web Vitals, API response times) on staging are acceptable.
*   Environment variables for production are correctly configured and verified in Vercel.
*   Database migrations (if any) have been tested and are ready.
*   `CHANGELOG.md` is updated with release notes.
*   Relevant stakeholders (if any) have approved the release.

---

## 8. Security Standards

### Authentication & Authorization
*   **Leverage Clerk:** Utilize Clerk's built-in security features for user registration, login, session management, password policies, and MFA (if users enable it).
*   **tRPC Middleware:** Protect tRPC procedures using `protectedProcedure` which verifies user authentication status via Clerk session.
*   **Role-Based Access Control (RBAC):** As the app grows (e.g., admin features), implement RBAC. This can be managed via Clerk user metadata and checked in tRPC middleware or server-side logic.

### Data Protection
*   **Input Validation:** All user input from the client-side (forms, API requests) MUST be validated on the server-side using Zod schemas within tRPC procedures. Do not trust client-side validation alone.
*   **Output Encoding/Sanitization:** React inherently protects against most XSS by escaping rendered data. Be cautious if using `dangerouslySetInnerHTML`. Ensure API responses don't leak overly sensitive data.
*   **Error Handling:** Implement proper error handling to avoid leaking sensitive information or stack traces to the client. Log detailed errors server-side.
*   **HTTPS:** Enforced by Vercel.

### API Security (tRPC)
*   **Type Safety:** tRPC's end-to-end type safety naturally prevents many common API issues related to mismatched data structures.
*   **Rate Limiting:** Implement rate limiting for sensitive tRPC procedures (e.g., login attempts, message sending) to prevent abuse. Vercel offers some protection, but application-level rate-limiting might be needed.
*   **CORS:** Vercel configures CORS securely by default. If using separate API routes for non-tRPC purposes, ensure CORS is correctly configured.
*   **CSRF Protection:** Next.js and modern browser mechanisms offer some protection. For forms not handled by tRPC mutations (which inherently have some CSRF protection due to their nature), be mindful. Clerk's frontend components and backend SDK also handle CSRF for auth actions.

### Dependencies
*   Regularly audit dependencies for vulnerabilities: `npm audit`.
*   Keep dependencies up-to-date, especially for security patches.

### Secrets Management
*   Use Vercel Environment Variables for all secrets (API keys, database URLs, Clerk secrets).
*   NEVER commit secrets to the Git repository. Use `.env.example`.

---

## 9. Monitoring & Logging

### Error Tracking
*   **Client-Side:** Implement Sentry (`@sentry/nextjs`) to capture and report frontend React errors and unhandled exceptions.
*   **Server-Side:** Sentry can also capture errors from Next.js API routes and tRPC procedures running in Vercel Functions.
*   **Alerting:** Configure Sentry to send alerts for new or high-frequency critical errors (e.g., via email or Slack integration).

### Logging Strategy
*   **Client-Side:**
    *   Minimize `console.log` in production code. Use it for debugging during development.
    *   Sentry will capture context for errors.
*   **Server-Side (Vercel Functions / tRPC):**
    *   Use standard `console.log()`, `console.info()`, `console.warn()`, `console.error()`. Vercel automatically captures these logs and makes them available in the Vercel dashboard.
    *   **Structured Logging (Recommended):** When logging, consider a structured format (e.g., JSON) if you plan to use a log aggregation service later.
        ```typescript
        console.info(JSON.stringify({
          message: 'User profile updated',
          userId: ctx.auth.userId,
          profileId: input.profileId,
          timestamp: new Date().toISOString(),
        }));
        ```
*   **Log Levels (Conceptual):**
    *   **ERROR**: Application errors, unexpected exceptions that impact functionality.
    *   **WARN**: Potential issues, deprecated API usage, non-critical failures.
    *   **INFO**: Important application lifecycle events, successful operations (e.g., user registration, payment success).
    *   **DEBUG**: Detailed information for troubleshooting during development (should be conditional or stripped in production builds if too verbose).
*   **Content:** Log relevant context but AVOID logging Personally Identifiable Information (PII) or sensitive data like passwords, API keys directly in general logs. User IDs are generally okay for tracing.

---

## 10. Complete-Test-Merge (CTM) Process & PR Checklist

For each feature or significant bug fix:

### 1. Plan
*   **Issue:** Ensure a GitHub issue exists detailing requirements, user stories, and acceptance criteria.
*   **Branch:** Create a feature/bugfix branch from `develop` (e.g., `feature/user-profile-view`).
*   **Tasks:** Break down the issue into smaller, manageable tasks (can be checklist items within the issue or PR).

### 2. Complete (Code & Document)
*   **Implement:** Write code adhering to all standards in this document.
*   **Test:** Write unit/integration tests covering new functionality and edge cases. Aim for tests that provide confidence.
*   **Self-Review:** Before creating a PR, review your own code against the standards. Run linters, type checkers, and tests locally (`npm run lint`, `npm run typecheck`, `npm run test`).
*   **Documentation:**
    *   Add JSDoc comments for complex functions/logic.
    *   Update `README.md` if setup or usage changes.
    *   Update `CHANGELOG.md` (or ensure your PR title/description allows for easy changelog generation).
    *   Create/update technical design docs or decision records (ADRs) for significant architectural changes.

### 3. Test (Pre-PR & During PR)
*   **Local Tests:** All automated tests (`npm run test`) MUST pass locally.
*   **Manual Testing:** Manually test the feature in your local development environment (`npm run dev`).
*   **Preview Deployment:** Once PR is created, test thoroughly on the Vercel Preview Deployment URL.
    *   Test across different browsers (latest Chrome, Firefox, Safari).
    *   Test on different screen sizes (mobile, tablet, desktop - use browser dev tools and real devices if possible).
    *   Check critical user flows related to the change.
    *   Verify against acceptance criteria in the original GitHub issue.

### 4. Merge (Pull Request)
*   **Create PR:** To `develop` branch. Use the PR template (`.github/PULL_REQUEST_TEMPLATE.md`).
*   **CI Checks:** All automated checks (linting, tests, build) on the PR MUST pass.
*   **Review:** At minimum, perform a thorough self-review using the checklist below. If team members exist, require at least one approval.
    *   **PR Checklist for Reviewer (and Self-Review):**
        *   [ ] Code adheres to styling and naming conventions (`Docs/Roadmap & Tasks/0.2-development-standards.md`).
        *   [ ] Logic is clear, concise, and well-commented where necessary.
        *   [ ] New functions/components are small and have a single responsibility.
        *   [ ] TypeScript types are used effectively; `any` is avoided or justified.
        *   [ ] Error handling is implemented and robust (both client and server-side).
        *   [ ] Security considerations (input validation via Zod on server, auth checks for protected routes/procedures) are addressed.
        *   [ ] New tests are added and existing tests pass. Test coverage for new logic is adequate.
        *   [ ] UI changes are responsive and align with the branding guide and wireframes.
        *   [ ] Accessibility (a11y) considerations have been made (semantic HTML, keyboard navigation, ARIA if needed).
        *   [ ] Documentation (JSDoc, `README.md` if impacted, `CHANGELOG.md` notes) is updated.
        *   [ ] No `console.log` or other debugging code left in production-bound code (unless intentional and conditional).
        *   [ ] Feature works as expected on the Vercel Preview Deployment.
        *   [ ] Acceptance criteria from the original GitHub issue are met.
        *   [ ] New dependencies are justified and `package-lock.json` is updated.
        *   [ ] Environment variable changes are documented in `.env.example` and communicated if necessary for Vercel setup.
*   **Address Feedback:** Implement changes based on review comments. Push updates to the feature branch.
*   **Merge:** Once approved and all checks pass, merge the PR into `develop` (e.g., using "Squash and Merge" with a clear commit message summarizing the PR).
*   **Delete Branch:** Clean up the merged feature branch from local and remote.

### 5. Verify (Post-Merge)
*   **Staging:** Verify the feature on the staging environment after the automatic deployment from `develop` completes. Perform a quick smoke test.
*   **Resolve Conflicts:** If `develop` has changed significantly while working on the feature branch, pull the latest `develop` into your feature branch (`git pull origin develop`) and resolve conflicts *before* marking the PR as ready for final review/merge.

---

These development standards provide a solid foundation for building the Pickleball Match app in a professional, maintainable way. They're designed to be practical and achievable while ensuring high quality.

By following these standards, we'll create code that's:
*   Easier to maintain and extend.
*   More resistant to bugs.
*   Better organized.
*   More professional.

This document should be reviewed and updated as the project evolves and new best practices are identified.