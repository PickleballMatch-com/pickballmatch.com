import { clerkMiddleware } from '@clerk/nextjs/server';

// Use Clerk's middleware directly as recommended in docs
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|.*\\..*|api|trpc).*)",
    "/(api|trpc)(.*)"
  ],
};