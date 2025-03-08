const { Pool } = require("pg");

// Get database configuration from environment variables or use defaults
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || null,
  // If DATABASE_URL is not provided, use individual parameters
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "yassine",
  password: process.env.DB_PASSWORD || "50947028",
  database: process.env.DB_NAME || "yassine",
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Test connection
pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

module.exports = pool;
