import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { auth } from '@clerk/nextjs';

const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => {
      return {
        auth: auth(),
      };
    },
  });
};

export { handler as GET, handler as POST }; 