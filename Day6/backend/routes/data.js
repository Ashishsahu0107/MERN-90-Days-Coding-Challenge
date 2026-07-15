import pg from "pg";

const { Pool } = pg;

// Configure Pool using environment variables
export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "your_postgres_password",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.DB_DATABASE || "restaurant_db",
});

/**
 * Initializes the PostgreSQL database schema and seeds a default user if empty.
 */
export async function initDb() {
  console.log("🔄 Connecting to PostgreSQL database...");

  // Try to query to verify the connection
  try {
    const client = await pool.connect();
    console.log("🔌 Connected to PostgreSQL successfully!");
    
    // Create users table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log("🛡️  Table 'users' verified / created.");

    // Seed default user if empty
    const resCount = await client.query("SELECT COUNT(*) FROM users;");
    const count = parseInt(resCount.rows[0].count, 10);
    
    if (count === 0) {
      await client.query(`
        INSERT INTO users (name, email, password) 
        VALUES ('Ashish', 'ashish@example.com', 'password123');
      `);
      console.log("🌱 Seeded database with default manager user 'Ashish'");
    }

    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    throw err;
  }
}
