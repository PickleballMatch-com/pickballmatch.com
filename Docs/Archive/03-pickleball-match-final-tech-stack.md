# Pickleball Match App - Final Tech Stack Definition
**Version:** 2.0  
**Last Updated:** May 7, 2025  
**Status:** Final  

---

## Core Technology Stack

This document provides a clear, comprehensive definition of the technology stack for the Pickleball Match application. Each technology is listed with installation commands, configuration details, and implementation notes to assist both human developers and AI assistants during the development process.

---

## Frontend Technologies

### Next.js 14+ (Framework)
```bash
# Installation
npx create-next-app@latest pickleball-match --typescript --tailwind --eslint --app
```

**Key Configuration:**
- App Router for routing (`app/` directory)
- Server Components for improved performance
- API Routes for backend functionality
- Edge Runtime for global performance

**Implementation Notes:**
- Use the new App Router architecture (not Pages)
- Take advantage of server components for data-heavy pages
- Use client components for interactive elements

### Tailwind CSS (Styling)
```bash
# Already installed with create-next-app, but to add to an existing project:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Key Configuration:**
```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700', // Yellow
        secondary: '#000000', // Black
      },
    },
  },
  plugins: [],
}
```

**Implementation Notes:**
- Use utility classes directly in JSX
- Create consistent component patterns
- Use Tailwind's responsive prefixes for responsive design
- Extract common patterns into component-level abstractions

### shadcn/ui (Component Library)
```bash
# Installation
npx shadcn-ui@latest init
```

**Adding Components:**
```bash
# Example: adding button component
npx shadcn-ui@latest add button
```

**Implementation Notes:**
- Not a traditional npm package (components copied to your codebase)
- Customize components in `components/ui`
- Use with Tailwind classes for customization
- Built on Radix UI primitives for accessibility

### React Hook Form + Zod (Form Handling)
```bash
# Installation
npm install react-hook-form zod @hookform/resolvers
```

**Basic Implementation:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      {/* Form fields here */}
    </form>
  );
}
```

**Implementation Notes:**
- Create reusable form schemas with Zod
- Use uncontrolled components for better performance
- Integrate with shadcn/ui form components

---

## Backend Technologies

### Next.js API Routes (API Layer)
```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Handle GET request
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Handle POST request
  return NextResponse.json({ created: true });
}
```

**Implementation Notes:**
- Use the new Route Handlers in App Router
- Create RESTful endpoints
- Handle CORS with middlewares
- Protect routes with authentication middleware

### tRPC (Type-Safe API)
```bash
# Installation
npm install @trpc/server @trpc/client @trpc/next @trpc/react-query @tanstack/react-query zod
```

**Basic Setup:**
```tsx
// server/trpc.ts
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;
```

**Implementation Notes:**
- Create a router for each resource
- Use Zod for input validation
- Leverage end-to-end type safety
- Integrate with React Query for data fetching

### Prisma (ORM)
```bash
# Installation
npm install prisma @prisma/client
npx prisma init
```

**Database Schema Example:**
```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  duprRating    Float?
  displayName   String?
  bio           String?
  location      String?
  profilePhotoUrl String?
}
```

**Implementation Notes:**
- Run migrations with `npx prisma migrate dev`
- Generate client with `npx prisma generate`
- Use Prisma Studio for database management: `npx prisma studio`
- Leverage transactions for multi-step operations

---

## Authentication & Security

### Clerk (Authentication)
```bash
# Installation
npm install @clerk/nextjs
```

**Configuration:**
```tsx
// middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/api/public(.*)', '/blog(.*)'],
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

**Implementation Notes:**
- Add environment variables to `.env.local` and Vercel
- Use `<ClerkProvider>` in the root layout
- Leverage user data with `useUser()` and `useAuth()`
- Protect routes with `<SignedIn>` and `<SignedOut>` components

### Next.js Middleware (API Security)
```tsx
// middleware.ts (combined with Clerk)
import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/api/public(.*)'],
  afterAuth(auth, req) {
    // Add custom headers, CORS, etc.
    if (!auth.isPublicRoute) {
      if (!auth.isSignedIn) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  },
});
```

**Implementation Notes:**
- Combine with Clerk middleware
- Add rate limiting for API routes
- Implement proper CORS policies
- Consider adding CSRF protection

---

## Database & Storage

### PostgreSQL on Railway (Database)
**Setup:**
1. Create Railway account
2. Create new PostgreSQL project
3. Get connection string
4. Add to `.env.local` and Vercel

**Implementation Notes:**
- Connection string format: `postgresql://username:password@host:port/database`
- Configure Prisma to use the connection string
- Set up database backup schedule
- Implement proper connection pooling

### Google Cloud Storage (File Storage)
```bash
# Installation
npm install @google-cloud/storage
```

**Setup:**
1. Create Google Cloud account
2. Create new project
3. Enable Cloud Storage API
4. Create service account with Storage Admin role
5. Download service account key (JSON)
6. Store securely and add to environment variables

**Basic Implementation:**
```tsx
import { Storage } from '@google-cloud/storage';

// Create client
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}'),
});

// Upload file
async function uploadFile(buffer: Buffer, filename: string, mimeType: string) {
  const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET || '');
  const file = bucket.file(filename);
  
  await file.save(buffer, {
    metadata: { contentType: mimeType },
  });
  
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}
```

**Implementation Notes:**
- Create separate buckets for different environments
- Set appropriate CORS policies for web access
- Use signed URLs for private files
- Configure lifecycle policies for old files
- Consider using direct uploads for larger files

---

## Hosting & Deployment

### Vercel (Hosting Platform)
**Setup:**
1. Create Vercel account
2. Link to GitHub repository
3. Configure environment variables
4. Deploy

**Implementation Notes:**
- Configure automatic deployments from main branch
- Set up preview deployments for pull requests
- Add custom domains and SSL certificates
- Configure build and development settings

---

## Real-time Communication

### Socket.io (WebSockets)
```bash
# Installation
npm install socket.io socket.io-client
```

**Server Setup:**
```tsx
// app/api/socket/route.ts
import { Server } from 'socket.io';

export function GET(req: Request) {
  // Setup Socket.io server
  if (res.socket.server.io) {
    console.log('Socket already running');
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    
    io.on('connection', (socket) => {
      socket.on('send-message', (data) => {
        io.emit('receive-message', data);
      });
    });
  }
  
  return new Response('Socket initialized');
}
```

**Client Implementation:**
```tsx
'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';

export function ChatComponent() {
  useEffect(() => {
    const socket = io();
    
    socket.on('connect', () => {
      console.log('Connected to socket');
    });
    
    socket.on('receive-message', (data) => {
      // Handle incoming message
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return <div>{/* Chat UI */}</div>;
}
```

**Implementation Notes:**
- Set up Socket.io adapter for scalability
- Handle reconnection logic
- Implement room-based messaging for private chats
- Consider adding message persistence

---

## Payments

### Stripe (Payment Processing)
```bash
# Installation
npm install stripe @stripe/stripe-js
```

**Server Implementation:**
```tsx
// app/api/create-checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/canceled`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

**Client Implementation:**
```tsx
'use client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CheckoutButton({ priceId }: { priceId: string }) {
  async function handleCheckout() {
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    
    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    
    stripe?.redirectToCheckout({ sessionId });
  }
  
  return <button onClick={handleCheckout}>Subscribe</button>;
}
```

**Implementation Notes:**
- Set up webhook handling for subscription events
- Implement proper error handling
- Store customer and subscription data in database
- Use Stripe test mode during development

---

## Maps & Location

### Google Maps API
```bash
# Installation
npm install @googlemaps/js-api-loader
```

**Basic Implementation:**
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
    });
    
    loader.load().then(() => {
      if (mapRef.current) {
        new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    });
  }, []);
  
  return <div ref={mapRef} style={{ height: '400px' }} />;
}
```

**Implementation Notes:**
- Get API key from Google Cloud Console
- Enable relevant APIs (Maps JavaScript API, Geocoding API)
- Implement geocoding for address search
- Use Places API for location autocomplete
- Consider adding distance matrix for proximity searches

---

## Progressive Web App

### next-pwa (PWA Features)
```bash
# Installation
npm install next-pwa
```

**Configuration:**
```js
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // Your Next.js config
});
```

**Manifest Setup:**
```json
// public/manifest.json
{
  "name": "Pickleball Match",
  "short_name": "PB Match",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#FFD700",
  "background_color": "#FFFFFF",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait"
}
```

**Implementation Notes:**
- Create necessary icon files
- Configure offline fallback pages
- Add install prompt UI
- Test on actual mobile devices
- Implement push notifications (optional)

---

## Internationalization

### next-intl (I18n)
```bash
# Installation
npm install next-intl
```

**Basic Configuration:**
```tsx
// middleware.ts (combined with auth)
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
});

// Combine with auth middleware
export default function middleware(req) {
  const res = intlMiddleware(req);
  // Add your other middleware logic here
  return res;
}
```

**Messages Setup:**
```json
// messages/en.json
{
  "home": {
    "title": "Find Your Pickleball Partner",
    "subtitle": "Connect with players at your skill level"
  }
}

// messages/es.json
{
  "home": {
    "title": "Encuentra Tu Compañero de Pickleball",
    "subtitle": "Conéctate con jugadores de tu nivel"
  }
}
```

**Usage:**
```tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

**Implementation Notes:**
- Create message files for each supported language
- Implement language switcher component
- Setup subdirectory routing (/es/*, /fr/*)
- Consider adding language detection based on browser settings

---

## Development Tools

### Testing Tools (Optional)
```bash
# Jest + React Testing Library
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

**Basic Test Example:**
```tsx
// __tests__/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Find Your Pickleball Partner');
  });
});
```

**Implementation Notes:**
- Focus on critical path testing
- Set up basic unit tests for core functions
- Consider integration tests for authentication flows
- Run tests in CI/CD pipeline

---

## Environment Variables Reference

Create a `.env.local` file in the project root with these variables:

```
# Base
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_CREDENTIALS={"type":"service_account",...}
GOOGLE_CLOUD_BUCKET=your-bucket-name

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

---

## Package.json Script Examples

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:studio": "prisma studio",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

This comprehensive tech stack definition should provide clear guidance for both human developers and AI assistants during the development process. The installation commands, configuration examples, and implementation notes will help ensure consistency and best practices throughout the project.

This document serves as the definitive reference for the technical architecture of the Pickleball Match application.