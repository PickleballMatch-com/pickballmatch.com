import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { getAuth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { corsMiddleware } from './cors-middleware';
import { NextResponse } from 'next/server';

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(req: Request) {
  const response = NextResponse.json({}, { status: 200 });
  
  // Get the origin from the request headers
  const origin = req.headers.get('origin') || '*';
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  return response;
}

const handler = async (req: Request) => {
  try {
    const auth = getAuth(req);
    const user = await currentUser();

    console.log("TRPC Request Auth:", { userId: auth.userId });

    const rawResponse = await fetchRequestHandler({
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
    
    // Apply CORS headers to the response
    return corsMiddleware(req, rawResponse);
  } catch (err) {
    console.error("Error in TRPC handler:", err);
    const errorResponse = new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Apply CORS headers to error responses too
    return corsMiddleware(req, errorResponse);
  }
};

export { handler as GET, handler as POST }; 