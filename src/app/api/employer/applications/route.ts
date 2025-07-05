import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function getEmployerId(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  console.log('Cookie header:', cookie);
  const match = cookie.match(/token=([^;]+)/);
  if (!match) {
    console.log('No token found in cookie');
    return null;
  }
  const token = decodeURIComponent(match[1]);
  console.log('Decoded token:', token);
  const decoded = await verifyToken(token);
  console.log('Decoded JWT payload:', decoded);
  return decoded?.userId || null;
}

export async function GET(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const result = await pool.query(`
      SELECT a.id, a.status, a.applied_at, u.first_name, u.last_name, u.email as candidate_email, u.profile_image,
             j.id as job_id, j.title as job_title, j.city, j.country
      FROM applications a
      JOIN users u ON a.candidate_id = u.id
      JOIN jobs j ON a.job_id = j.id
      WHERE j.employer_id = $1
      ORDER BY a.applied_at DESC
    `, [employer_id]);
    return NextResponse.json(result.rows.map(r => ({
      id: r.id,
      status: r.status,
      applied_at: r.applied_at,
      candidate_name: `${r.first_name} ${r.last_name}`,
      candidate_email: r.candidate_email,
      profile_image: r.profile_image,
      job_id: r.job_id,
      job_title: r.job_title,
      city: r.city,
      country: r.country
    })));
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
} 