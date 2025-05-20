import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { getAuth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { corsMiddleware } from './cors-middleware';
import { NextResponse } from 'next/server';
import { debugLog } from '@/server/debug-log';

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(req: Request) {
  debugLog('TRPC Route OPTIONS', 'Handling OPTIONS request', {
    url: req.url,
    method: req.method,
    headers: Object.fromEntries([...req.headers.entries()]),
  });
  
  const response = NextResponse.json({}, { status: 200 });
  
  // Get the origin from the request headers
  const origin = req.headers.get('origin') || '*';
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  debugLog('TRPC Route OPTIONS', 'Returning OPTIONS response', {
    headers: Object.fromEntries([...response.headers.entries()]),
  });
  
  return response;
}

const handler = async (req: Request) => {
  try {
    debugLog('TRPC Handler', 'Starting request handler', {
      url: req.url,
      method: req.method,
      headers: Object.fromEntries([...req.headers.entries()]),
    });
    
    const auth = getAuth(req);
    const user = await currentUser();

    debugLog('TRPC Handler', `Processing request for user: ${auth.userId}`, { 
      userObj: user ? {
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      } : null
    });

    console.log("TRPC Request Auth:", { userId: auth.userId });

    try {
      // Try connecting to the database before proceeding
      try {
        debugLog('TRPC Handler', 'Testing database connection');
        const dbTest = await db.query.users.findFirst();
        debugLog('TRPC Handler', 'Database connection successful', { 
          dbTest: dbTest ? { hasResult: !!dbTest } : { hasResult: false } 
        });
      } catch (dbError) {
        debugLog('TRPC Handler', 'Database connection test failed', {
          error: dbError instanceof Error ? dbError.message : String(dbError),
          stack: dbError instanceof Error ? dbError.stack : undefined,
        });
      }
      
      debugLog('TRPC Handler', 'Calling fetchRequestHandler');
      
      const rawResponse = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: async () => {
          const contextObj = {
            auth,
            user,
            db,
          };
          debugLog('TRPC Context', 'Created context', { hasAuth: !!auth, hasUser: !!user });
          return contextObj;
        },
        onError: ({ error, path, input, type, ctx }) => {
          console.error(`TRPC Error in ${path}:`, error);
          console.error(`Request type: ${type}, input:`, JSON.stringify(input, null, 2));
          console.log('Context:', ctx ? 'provided' : 'missing');
          
          // Add detailed error information
          debugLog('TRPC Error', `Error in ${path}`, {
            errorMessage: error.message,
            errorCode: error.code,
            errorCause: error.cause,
            errorName: error.name,
            errorStack: error.stack,
            input,
            type,
          });
        },
      });
      
      // Log the response type and status before applying CORS
      debugLog('TRPC Handler', 'Response before CORS', {
        status: rawResponse.status,
        statusText: rawResponse.statusText,
        headers: Object.fromEntries([...rawResponse.headers.entries()]),
      });
      
      // Apply CORS headers to the response
      return corsMiddleware(req, rawResponse);
    } catch (err) {
      debugLog('TRPC Handler', 'Error in fetchRequestHandler', {
        errorMessage: err instanceof Error ? err.message : String(err),
        errorStack: err instanceof Error ? err.stack : undefined,
      });
      
      console.error("Error in TRPC handler:", err);
      const errorResponse = new Response(JSON.stringify({ 
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Apply CORS headers to error responses too
      return corsMiddleware(req, errorResponse);
    }
  } catch (err) {
    debugLog('TRPC Handler', 'Critical error in handler', {
      errorMessage: err instanceof Error ? err.message : String(err),
      errorStack: err instanceof Error ? err.stack : undefined,
    });
    
    console.error("Critical error in TRPC handler:", err);
    const errorResponse = new Response(JSON.stringify({ 
      error: "Critical Internal Server Error",
      details: err instanceof Error ? err.message : String(err),
    }), {
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