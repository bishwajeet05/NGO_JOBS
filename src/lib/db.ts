// src/lib/db.ts
/*import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  alert('Connected to the database');
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}*/

import pg from 'pg';

// Create a new Pool instance
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //port: Number(process.env.db_port),
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection to be established
});

// Test the connection
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err: Error) => {
    console.log('Error connecting to the database:', err);
  });

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  alert('Connected to the database');
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}



export default pool;