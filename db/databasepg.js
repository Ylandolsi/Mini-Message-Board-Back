const { Pool } = require("pg");

// Create a new pool with the Neon connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

// Add more detailed connection logging
pool.on("connect", (client) => {
  console.log("Connected to PostgreSQL database");
});

// Test connection - but don't crash if it fails
pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
});

// Export the pool
module.exports = pool;
