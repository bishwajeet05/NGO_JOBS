
import { hashPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const query = `
      INSERT INTO users (
        user_id, email, password, first_name, last_name, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      ) RETURNING *
    `;
    const values = [
      data.user_id,
      data.email,
      await hashPassword(data.password),
      data.first_name || null,
      data.last_name || null,
      new Date(),
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}