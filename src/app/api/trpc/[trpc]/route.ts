import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { getAuth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/server/db';

const handler = async (req: Request) => {
  try {
    const auth = getAuth(req);
    const user = await currentUser();

    console.log("TRPC Request Auth:", { userId: auth.userId });

    return fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: async () => {
        return {
          auth,
          user,
          db,
        };
      },
      onError: ({ error, path, input, type, ctx }) => {
        console.error(`TRPC Error in ${path}:`, error);
        console.error(`Request type: ${type}, input:`, JSON.stringify(input, null, 2));
        console.log('Context:', ctx ? 'provided' : 'missing');
      },
    });
  } catch (err) {
    console.error("Error in TRPC handler:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export { handler as GET, handler as POST }; 