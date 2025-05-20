import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { debugLog } from '../debug-log';

// Use environment variables for database connection
const connectionString = process.env.DATABASE_URL || '';

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set');
  debugLog('Database', 'DATABASE_URL environment variable is not set');
} else {
  const firstChars = connectionString.substring(0, 10);
  debugLog('Database', `Database URL is set (starting with: ${firstChars}...)`);
}

// Create postgres connection with enhanced error handling
let client;
try {
  // Configure postgres client with more options
  client = postgres(connectionString, {
    max: 1, // Keep up to 1 connections
    idle_timeout: 30, // Idle connection timeout in seconds
    connect_timeout: 10, // Connect timeout in seconds
    debug: (conn, query, params, types) => {
      debugLog('Database', 'SQL debug info', { 
        query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
        queryLength: query.length
      });
    },
    onnotice: notice => {
      debugLog('Database', 'Postgres notice', { notice });
    },
    onparameter: (parameterStatus, value) => {
      debugLog('Database', 'Postgres parameter', { parameter: parameterStatus, value });
    }
  });
  
  debugLog('Database', 'Postgres client created successfully');
} catch (error) {
  console.error('Failed to create postgres client:', error);
  debugLog('Database', 'Failed to create postgres client', {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined
  });
  
  // Fallback to empty client
  client = postgres('postgres://localhost:5432/dummy', { max: 0 });
}

// Create drizzle instance
export const db = drizzle(client, { schema });
debugLog('Database', 'Drizzle instance created'); 