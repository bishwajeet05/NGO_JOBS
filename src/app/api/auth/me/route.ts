import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Parse token from cookies
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='))?.split('=')[1] || '';
    if (!token) {
      console.error('[auth/me] No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(decodeURIComponent(token));
    if (!decoded) {
      console.error('[auth/me] Token verification failed');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    let result;
    try {
      result = await pool.query('SELECT id, email, role, is_active, created_at, first_name, last_name FROM users WHERE id = $1', [decoded.userId]);
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