import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verify } from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const token = decodeURIComponent(request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1] || '');
    if (!token) {
      console.error('[auth/me] No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
      console.log('[auth/me] Decoded token:', decoded);
    } catch (err) {
      console.error('[auth/me] Token verification failed:', err);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    let result;
    try {
      result = await pool.query('SELECT id, user_id, email, first_name, last_name FROM users WHERE id = $1', [
        decoded.userId,
      ]);
      console.log('[auth/me] Database query result:', result.rows);
    } catch (dbErr) {
      console.error('[auth/me] Database query failed:', dbErr);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
    const user = result.rows[0];

    if (!user) {
      console.error('[auth/me] User not found for id:', decoded.userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('[auth/me] Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}