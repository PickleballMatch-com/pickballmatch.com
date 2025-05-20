// Simple script to test database connection
const { db } = require('../src/server/db');
const { sql } = require('drizzle-orm');

async function testConnection() {
  try {
    console.log('Testing connection to Railway PostgreSQL database...');
    const result = await db.execute(sql`SELECT NOW() as current_time`);
    console.log('Success! Database connection works.');
    console.log('Current database time:', result[0].current_time);
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();