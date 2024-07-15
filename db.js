const { Pool } = require('pg');

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  // Create table if it doesn't exist
  pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price INT
    )
  `);

  module.exports = pool;