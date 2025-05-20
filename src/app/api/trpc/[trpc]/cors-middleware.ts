import { NextResponse } from 'next/server';
import { debugLog } from '@/server/debug-log';

export function corsMiddleware(req: Request, res: Response) {
  try {
    if (!req || !res) {
      console.error('Missing request or response in corsMiddleware');
      return res;
    }
    
    // Get the origin from request headers
    const origin = req.headers.get('origin') || '*';
    
    debugLog('CORS Middleware', `Setting CORS headers for origin: ${origin}`, {
      requestUrl: req.url,
      responseStatus: res.status,
      responseType: typeof res,
    });
    
    // Create a Response from the original response
    let response;
    try {
      // Try to clone and reuse the original response
      const clonedResponse = res.clone();
      response = new Response(clonedResponse.body, {
        status: res.status,
        statusText: res.statusText,
        headers: new Headers(res.headers),
      });
    } catch (cloneError) {
      console.warn('Could not clone response body, creating empty response:', cloneError);
      // Fallback to an empty response with the same status
      response = new Response(null, {
        status: res.status,
        statusText: res.statusText,
        headers: new Headers(res.headers),
      });
    }
    
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
    
    // If anything fails, return original response
    console.error('Failed to apply CORS headers:', error);
    return res;
  }
}