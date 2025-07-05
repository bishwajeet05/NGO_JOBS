// src/app/api/auth/signin/route.ts
import { verifyPassword, generateToken } from '@/lib/auth';
import { User } from '@/types';
import { NextResponse } from 'next/server';
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("Received:", email, password);

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log("DB result:", result.rows);

    const dbUser = result.rows[0];
    if (!dbUser) {
      console.log("User not found");
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(password, dbUser.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(dbUser.id!.toString());
    console.log('Generated JWT token:', token);
    const user = {
      id: dbUser.id,
      first_name: dbUser.first_name,
      last_name: dbUser.last_name,
      email: dbUser.email,
      role: dbUser.role,
      is_active: dbUser.is_active,
      created_at: dbUser.created_at
    };
    const res = NextResponse.json({ user }, { status: 200 });
    res.headers.set('Set-Cookie', `token=${encodeURIComponent(token)}; Path=/; Max-Age=604800; SameSite=Lax`);
    return res;
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}