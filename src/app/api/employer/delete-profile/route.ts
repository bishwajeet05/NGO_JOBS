import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken, verifyPassword } from '@/lib/auth';

// Helper to get employer_id from JWT cookie
async function getEmployerId(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const decoded = await verifyToken(token);
  return decoded?.userId || null;
}

export async function POST(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { password } = await request.json();
    if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 });
    // Get employer's hashed password
    const userRes = await pool.query('SELECT password FROM users WHERE id = $1 AND role = $2', [employer_id, 'employer']);
    if (userRes.rowCount === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const hashedPassword = userRes.rows[0].password;
    const valid = await verifyPassword(password, hashedPassword);
    if (!valid) return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
    // Delete user (and cascade if needed)
    await pool.query('DELETE FROM users WHERE id = $1', [employer_id]);
    // Optionally: Invalidate session/cookies here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
} 