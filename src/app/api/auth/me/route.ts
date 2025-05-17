import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verify } from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const result = await pool.query('SELECT user_id, email, first_name, last_name FROM users WHERE user_id = $1', [
      "ash",
    ]);
    console.log('Database query result:', result);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}