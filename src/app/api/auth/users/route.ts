// src/app/api/auth/user/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { User } from '@/types';
import pool from "@/lib/db";

export async function GET(request: Request) {
  console.log('GET /api/auth/user: Request received');

  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    console.log('GET /api/auth/user: Token:', token ? token.slice(0, 10) + '...' : 'none');

    if (!token) {
      console.log('GET /api/auth/user: No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    console.log('GET /api/auth/user: Decoded token:', decoded);

    if (!decoded) {
      console.log('GET /api/auth/user: Invalid token');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { userId } = decoded;
    console.log('GET User ID:', userId);

    let result;
    try {
      result = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
      console.log('GET /api/auth/user: User retrieved:', result);
    } catch (dbError: any) {
      console.log('GET /api/auth/user: Database query error:', dbError.message);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    const user = result.rows[0] as User;
    if (!user) {
      console.log('GET /api/auth/user: User not found for id:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('GET /api/auth/user: User email retrieved:', user.email);
    return NextResponse.json({ email: user.email }, { status: 200 });
  } catch (error: any) {
    console.log('GET /api/auth/user: Unexpected error:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}