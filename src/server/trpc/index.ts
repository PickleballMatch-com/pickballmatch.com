import { initTRPC, TRPCError } from '@trpc/server';
// Temporarily remove superjson to test basic functionality
import { ZodError } from 'zod';
import { getAuth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '../db';

// Context should be created in the API handler
// This is just a type definition for local use
type Context = {
  auth: { userId: string | null };
  user?: any;
  db: typeof db;
};

const t = initTRPC.context<Context>().create({
  // Remove transformer temporarily
  errorFormatter({ shape, error }) {
    console.error('TRPC error:', error);

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        // Include serializable error information
        message: error.message,
        code: error.code,
      },
    };
  },
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure middleware
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: { userId: ctx.auth.userId },
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);