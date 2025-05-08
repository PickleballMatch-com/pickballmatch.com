import { router } from '../trpc';
import { usersRouter } from './routers/users';
import { matchRequestsRouter } from './routers/matchRequests';

export const appRouter = router({
  users: usersRouter,
  matchRequests: matchRequestsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter; 