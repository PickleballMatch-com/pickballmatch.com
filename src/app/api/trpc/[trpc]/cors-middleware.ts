import { NextResponse } from 'next/server';

export function corsMiddleware(req: Request, res: Response) {
  // Convert to NextResponse to easily modify headers
  const response = NextResponse.json(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
  
  // Get the origin from the request headers
  const origin = req.headers.get('origin') || '*';
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  return response;
}