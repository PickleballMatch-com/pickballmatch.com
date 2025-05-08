import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { auth, currentUser } from '@clerk/nextjs';

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure middleware
const enforceUserIsAuthed = t.middleware(async ({ next }) => {
  const { userId } = auth();
  
  if (!userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  const user = await currentUser();

  return next({
    ctx: {
      user,
      userId,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed); 