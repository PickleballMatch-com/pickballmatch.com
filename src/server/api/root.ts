import { router } from '../trpc';
import { usersRouter } from './routers/users';
import { matchRequestsRouter } from './routers/matchRequests';
import { profilesRouter } from './routers/profiles';

export const appRouter = router({
  users: usersRouter,
  matchRequests: matchRequestsRouter,
  profiles: profilesRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter; 