import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Use environment variables for database connection
const connectionString = process.env.DATABASE_URL || '';

// Create postgres connection
const client = postgres(connectionString, {
  max: 1,
});

// Create drizzle instance
export const db = drizzle(client, { schema }); 