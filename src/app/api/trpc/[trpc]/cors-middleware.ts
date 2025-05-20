import { NextResponse } from 'next/server';
import { debugLog } from '@/server/debug-log';

export function corsMiddleware(req: Request, res: Response) {
  try {
    // Get the origin from request headers
    const origin = req.headers.get('origin') || '*';
    
    debugLog('CORS Middleware', `Setting CORS headers for origin: ${origin}`, {
      requestUrl: req.url,
      responseStatus: res.status,
      responseHeaders: Object.fromEntries([...res.headers.entries()]),
    });
    
    // Try to read the body and clone it
    const responseClone = res.clone();
    
    // Create a new response with the same body and status
    const response = new Response(responseClone.body, {
      status: res.status,
      statusText: res.statusText,
      headers: new Headers(res.headers),
    });
    
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    
    debugLog('CORS Middleware', 'Response after CORS', {
      headers: Object.fromEntries([...response.headers.entries()]),
    });
    
    return response;
  } catch (error) {
    debugLog('CORS Middleware', 'Error applying CORS headers', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    // If anything fails, return original response with basic CORS headers
    const fallbackResponse = new Response(res.body, {
      status: res.status,
      headers: {
        ...Object.fromEntries([...res.headers.entries()]),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
      },
    });
    
    return fallbackResponse;
  }
}