// Simple script to test database connection (ESM version)
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || '';
console.log('Using connection string:', connectionString.replace(/:[^:]*@/, ':****@'));

// Create postgres connection
const client = postgres(connectionString, {
  max: 1,
});

// Create drizzle instance
const db = drizzle(client);

async function testConnection() {
  try {
    console.log('Testing connection to Railway PostgreSQL database...');
    const result = await db.execute(sql`SELECT NOW() as current_time`);
    console.log('Success! Database connection works.');
    console.log('Current database time:', result[0]?.current_time);
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();