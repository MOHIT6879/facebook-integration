import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

export const initDB = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS integrations (
      id SERIAL PRIMARY KEY,
      integration_id UUID UNIQUE NOT NULL,
      page_url TEXT,
      user_id TEXT,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      access_token TEXT,
      refresh_token TEXT,
      token_expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableQuery);
  console.log("PostgreSQL table ready.");
};
