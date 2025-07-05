import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function getEmployerId(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  console.log('Cookie header:', cookie);
  const match = cookie.match(/(?:^|; )token=([^;]+)/);
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
    // Job count
    const jobCountRes = await pool.query('SELECT COUNT(*) FROM jobs WHERE employer_id = $1', [employer_id]);
    const jobCount = Number(jobCountRes.rows[0].count);
    // Application count
    const appCountRes = await pool.query('SELECT COUNT(*) FROM applications WHERE job_id IN (SELECT id FROM jobs WHERE employer_id = $1)', [employer_id]);
    const applicationCount = Number(appCountRes.rows[0].count);
    // Shortlist count
    const shortlistRes = await pool.query('SELECT COUNT(*) FROM shortlists WHERE employer_id = $1', [employer_id]);
    const shortlistCount = Number(shortlistRes.rows[0].count);
    // Recent applicants (last 5)
    const recentRes = await pool.query(`
      SELECT a.status, a.applied_at, u.first_name, u.last_name, j.title as job_title
      FROM applications a
      JOIN users u ON a.candidate_id = u.id
      JOIN jobs j ON a.job_id = j.id
      WHERE j.employer_id = $1
      ORDER BY a.applied_at DESC
      LIMIT 5
    `, [employer_id]);
    const recentApplicants = recentRes.rows.map(r => ({
      name: `${r.first_name} ${r.last_name}`,
      status: r.status,
      jobTitle: r.job_title,
      appliedDate: r.applied_at
    }));
    // (Optional) notifications: static for now
    const notifications = [
      'New application submitted for Junior Graphic Designer (Web)',
      'New application submitted for Junior Graphic Designer (Web)',
      'New application submitted for Junior Graphic Designer (Web)'
    ];
    return NextResponse.json({ jobCount, applicationCount, shortlistCount, recentApplicants, notifications });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
} 