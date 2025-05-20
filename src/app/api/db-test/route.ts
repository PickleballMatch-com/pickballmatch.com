import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Simple query to validate database connection
    const result = await db.execute(sql`SELECT NOW() as current_time`);

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: result[0]?.current_time || new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database connection error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}