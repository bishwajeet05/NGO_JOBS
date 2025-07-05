import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function getEmployerId(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const decoded = await verifyToken(token);
  return decoded?.userId || null;
}

export async function GET(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const result = await pool.query(`
      SELECT j.id as job_id, COUNT(a.id) as applicant_count
      FROM jobs j
      LEFT JOIN applications a ON a.job_id = j.id
      WHERE j.user_id = $1
      GROUP BY j.id
    `, [employer_id]);
    // Return as { [job_id]: applicant_count }
    const counts: Record<string, number> = {};
    for (const row of result.rows) {
      counts[row.job_id] = Number(row.applicant_count);
    }
    return NextResponse.json(counts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applicant counts' }, { status: 500 });
  }
} 