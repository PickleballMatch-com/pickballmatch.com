# Technical Product Requirements Document (PRD)
# Pickleball Match App - Development Specification

**Version:** 2.0  
**Last Updated:** May 4, 2025  
**Purpose:** AI-Assisted Development Guide  
**Target:** Technical Implementation & Scaffolding  

---

## 1. Technical Overview

### Application Architecture
- **Type**: Web-first Progressive Web App (PWA)
- **Frontend**: React.js with Next.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL 
- **Real-time**: Socket.io for chat
- **API Layer**: tRPC (type-safe APIs)
- **Authentication**: Clerk (for rapid development)
- **Hosting**: AWS/Vercel

### Development Priorities
1. Build web application first
2. Ensure mobile-responsive design
3. Native apps in Phase 2
4. Focus on core matching functionality

---

## 2. Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- if using self-auth
  clerk_id VARCHAR(255), -- if using Clerk
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER,
  gender VARCHAR(50),
  location_city VARCHAR(100),
  location_state VARCHAR(100),
  location_country VARCHAR(100),
  dupr_rating DECIMAL(3,2),
  dupr_id VARCHAR(100),
  profile_photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  playing_frequency VARCHAR(50),
  preferred_times JSONB,
  primary_location VARCHAR(255),
  secondary_locations JSONB,
  video_intro_url TEXT,
  gameplay_videos JSONB, -- array of URLs
  playing_style TEXT,
  bio TEXT,
  travel_willing BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  is_dating_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Travel Plans Table
```sql
CREATE TABLE travel_plans (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  destination_city VARCHAR(100),
  destination_state VARCHAR(100),
  destination_country VARCHAR(100),
  arrival_date DATE,
  departure_date DATE,
  looking_for VARCHAR(50), -- casual, tournament, drilling
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Matches Table
```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  matched_user_id UUID REFERENCES users(id),
  match_type VARCHAR(50), -- casual, tournament, drilling, dating
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  content TEXT,
  message_type VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Equipment History Table
```sql
CREATE TABLE equipment_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  item_type VARCHAR(50), -- paddle, shoes, ball
  brand VARCHAR(100),
  model VARCHAR(100),
  purchase_date DATE,
  replacement_date DATE,
  rating INTEGER,
  review TEXT,
  affiliate_link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. API Structure (tRPC)

### Authentication Routes
```typescript
// auth.router.ts
export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      // Create user with Clerk
      // Create profile entry
      // Return user data
    }),
  
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      // Authenticate with Clerk
      // Return JWT token
    }),
});
```

### User Routes
```typescript
// user.router.ts
export const userRouter = router({
  getProfile: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      // Fetch user profile with DUPR data
    }),
  
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      // Update user profile
    }),
  
  setTravelPlan: protectedProcedure
    .input(travelPlanSchema)
    .mutation(async ({ input, ctx }) => {
      // Create/update travel plan
      // Add user to destination city pool
    }),
});
```

### Matching Routes
```typescript
// matching.router.ts
export const matchingRouter = router({
  getPotentialMatches: protectedProcedure
    .input(matchFilterSchema)
    .query(async ({ input, ctx }) => {
      // Get users based on filters
      // Include travelers if enabled
      // Sort by relevance
    }),
  
  swipeAction: protectedProcedure
    .input(swipeSchema)
    .mutation(async ({ input, ctx }) => {
      // Record swipe action
      // Add to reach-out list if right swipe
    }),
});
```

---

## 4. Frontend Components Structure

### Core Components
```
/components
  /auth
    - LoginForm.tsx
    - RegisterForm.tsx
    - ForgotPassword.tsx
  /profile
    - ProfileCard.tsx
    - ProfileEditor.tsx
    - EquipmentHistory.tsx
    - TravelPlans.tsx
  /matching
    - SwipeCard.tsx
    - SwipeStack.tsx
    - FilterPanel.tsx
    - ReachOutList.tsx
  /messaging
    - ChatWindow.tsx
    - MessageList.tsx
    - MessageInput.tsx
  /common
    - Button.tsx
    - Input.tsx
    - Modal.tsx
    - LoadingSpinner.tsx
```

### Key Pages
```
/pages
  - index.tsx (landing/marketing)
  - login.tsx
  - register.tsx
  - dashboard.tsx (main matching interface)
  - profile/[id].tsx
  - messages.tsx
  - settings.tsx
  - travel.tsx
  - community.tsx
```

---

## 5. Feature Implementation Details

### Travel System
```typescript
// Travel feature implementation
interface TravelPlan {
  id: string;
  userId: string;
  destination: {
    city: string;
    state: string;
    country: string;
  };
  dates: {
    arrival: Date;
    departure: Date;
  };
  lookingFor: ('casual' | 'tournament' | 'drilling')[];
}

// When user creates travel plan:
1. Add entry to travel_plans table
2. Add user to destination city's player pool
3. Set expiration for departure date
4. Show travel badge on user card
5. Trigger notifications for locals who opted in
```

### Matching Algorithm
```typescript
// Simplified matching algorithm
function getPotentialMatches(user: User, filters: Filters) {
  const query = db.select()
    .from(users)
    .where(
      and(
        // Location filter
        or(
          eq(users.location_city, filters.city),
          // Include travelers
          exists(
            db.select()
              .from(travel_plans)
              .where(
                and(
                  eq(travel_plans.destination_city, filters.city),
                  gte(travel_plans.departure_date, new Date()),
                  lte(travel_plans.arrival_date, new Date())
                )
              )
          )
        ),
        // DUPR range
        between(users.dupr_rating, filters.minDupr, filters.maxDupr),
        // Other filters...
      )
    )
    .orderBy(
      // Sort by relevance
      desc(users.dupr_rating),
      asc(distance(user.location, users.location))
    );
}
```

### Real-time Chat
```typescript
// Socket.io chat implementation
io.on('connection', (socket) => {
  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
  });
  
  socket.on('send_message', async (data) => {
    // Save to database
    const message = await saveMessage(data);
    
    // Emit to recipient
    io.to(data.chatId).emit('new_message', message);
    
    // Send push notification if enabled
    await sendPushNotification(data.recipientId, message);
  });
});
```

---

## 6. Third-party Integrations

### DUPR API Integration
```typescript
// services/dupr.service.ts
export class DuprService {
  async verifyPlayer(duprId: string): Promise<DuprProfile> {
    // Call DUPR API to verify player
  }
  
  async getMatchHistory(duprId: string): Promise<Match[]> {
    // Fetch match history from DUPR
  }
  
  async syncRating(userId: string): Promise<void> {
    // Update user's DUPR rating
  }
}
```

### Stripe Integration
```typescript
// services/stripe.service.ts
export class StripeService {
  async createSubscription(userId: string, plan: 'premium' | 'dating') {
    // Create Stripe subscription
  }
  
  async handleWebhook(event: Stripe.Event) {
    // Handle subscription events
  }
}
```

### Translation Service
```typescript
// services/translation.service.ts
export class TranslationService {
  async translateMessage(text: string, targetLang: string) {
    // Use Google Translate API or similar
  }
  
  async detectLanguage(text: string) {
    // Detect message language
  }
}
```

---

## 7. Security & Moderation

### Content Moderation
```typescript
// services/moderation.service.ts
export class ModerationService {
  async checkContent(content: string): Promise<ModerationResult> {
    // AI layer - use OpenAI moderation API
    const aiCheck = await openai.moderations.create({ input: content });
    
    if (aiCheck.results[0].flagged) {
      // Queue for human review
      await queueForReview(content);
      return { allowed: false, reason: 'flagged_for_review' };
    }
    
    return { allowed: true };
  }
}
```

### Rate Limiting
```typescript
// middleware/rateLimit.ts
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});
```

---

## 8. Development Phases

### Phase 1: Core MVP (Weeks 1-8)
1. **Week 1-2**: Project setup, database design, authentication
2. **Week 3-4**: User profiles, DUPR integration
3. **Week 5-6**: Matching system, swipe interface
4. **Week 7-8**: Messaging system, basic travel features

### Phase 1.5: Enhanced Features (Weeks 9-12)
1. **Week 9**: Travel system completion
2. **Week 10**: Community features, bulletin boards
3. **Week 11**: Equipment tracking, affiliate system
4. **Week 12**: Dating features, premium tiers

### Phase 2: Polish & Launch (Weeks 13-16)
1. **Week 13**: Performance optimization
2. **Week 14**: Security audit, penetration testing
3. **Week 15**: Beta testing in Jaco
4. **Week 16**: Launch preparation

---

## 9. Environment Setup

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://...

# Authentication
CLERK_SECRET_KEY=...
CLERK_PUBLISHABLE_KEY=...
JWT_SECRET=...

# Third-party APIs
DUPR_API_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
GOOGLE_TRANSLATE_API_KEY=...
GOOGLE_MAPS_API_KEY=...

# AWS
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...

# Notifications
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
SENDGRID_API_KEY=...
```

### Development Commands
```bash
# Setup
npm install
npm run db:migrate
npm run db:seed

# Development
npm run dev

# Testing
npm run test
npm run test:e2e

# Production
npm run build
npm start
```

---

## 10. Testing Strategy

### Unit Tests
```typescript
// __tests__/matching.test.ts
describe('Matching Algorithm', () => {
  it('should include travelers in city pool', async () => {
    // Test travel matching logic
  });
  
  it('should filter by DUPR range', async () => {
    // Test DUPR filtering
  });
});
```

### Integration Tests
```typescript
// __tests__/api/user.test.ts
describe('User API', () => {
  it('should create user profile', async () => {
    // Test profile creation
  });
  
  it('should update travel plans', async () => {
    // Test travel plan updates
  });
});
```

---

## 11. Deployment & DevOps

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
      - name: Deploy to Vercel
        run: vercel deploy --prod
```

### Monitoring
- Error tracking: Sentry
- Performance monitoring: New Relic
- Uptime monitoring: UptimeRobot
- Analytics: Mixpanel

---

## 12. AI Development Instructions

When building this application:

1. **Start with core infrastructure**: Database, authentication, basic routing
2. **Build incrementally**: Complete each feature before moving to next
3. **Test continuously**: Write tests alongside features
4. **Use TypeScript**: Enforce type safety throughout
5. **Follow React best practices**: Hooks, component composition, state management
6. **Implement proper error handling**: User-friendly messages, error boundaries
7. **Optimize for mobile**: Responsive design, touch interactions
8. **Consider performance**: Lazy loading, code splitting, caching
9. **Maintain security**: Input validation, CSRF protection, secure headers
10. **Document as you build**: JSDoc comments, README updates

---

*This PRD is optimized for AI-assisted development. Focus on technical implementation rather than business justification.*