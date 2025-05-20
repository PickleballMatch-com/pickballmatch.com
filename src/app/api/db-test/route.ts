import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { sql } from 'drizzle-orm';
import { getAuth } from '@clerk/nextjs/server';
import { debugLog } from '@/server/debug-log';

export async function GET(req: Request) {
  try {
    const auth = getAuth(req);
    debugLog('DB Test', 'Testing database connection', { 
      userId: auth.userId,
      url: req.url
    });

    try {
      // Simple query to validate database connection
      const result = await db.execute(sql`SELECT NOW() as current_time`);
      debugLog('DB Test', 'SQL query successful', { result });
      
      // Also check users table
      const users = await db.query.users.findMany({
        limit: 5
      });
      
      // Log success
      debugLog('DB Test', 'Database connection successful', { 
        usersCount: users.length,
        sampleUsers: users.map(u => ({ 
          id: u.id.substring(0, 5) + '...', // Just log partial IDs for privacy
          email: u.email.substring(0, 3) + '...' // Just log partial emails for privacy
        }))
      });
      
      return NextResponse.json({
        success: true,
        message: 'Database connection successful',
        timestamp: result[0]?.current_time || new Date().toISOString(),
        users_count: users.length,
        database_url_type: process.env.DATABASE_URL ? 
          'Set as environment variable (showing first 10 chars): ' + process.env.DATABASE_URL.substring(0, 10) + '...' : 
          'Not set',
      });
    } catch (dbError) {
      // Log database error
      debugLog('DB Test', 'Database connection failed', {
        error: dbError instanceof Error ? dbError.message : String(dbError),
        stack: dbError instanceof Error ? dbError.stack : undefined
      });
      
      return NextResponse.json({
        success: false,
        message: 'Database connection failed',
        error: dbError instanceof Error ? dbError.message : String(dbError),
        database_url_type: process.env.DATABASE_URL ? 
          'Set as environment variable (showing first 10 chars): ' + process.env.DATABASE_URL.substring(0, 10) + '...' : 
          'Not set',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    // Log general error
    debugLog('DB Test', 'General error in DB test endpoint', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({
      success: false,
      message: 'General error in DB test endpoint',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}