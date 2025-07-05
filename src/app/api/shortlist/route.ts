import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Helper to get employer_id from JWT cookie
async function getEmployerId(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const decoded = await verifyToken(token);
  return decoded?.userId || null;
}

// GET: All shortlisted candidates for this employer
export async function GET(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const result = await pool.query(`
      SELECT s.id, s.created_at, s.job_id, s.candidate_id,
             u.name as candidate_name, u.email as candidate_email, u.profile_image,
             j.title as job_title, j.city, j.country, j.salary_value, j.salary_unit_text
      FROM shortlists s
      JOIN users u ON s.candidate_id = u.id
      LEFT JOIN jobs j ON s.job_id = j.id
      WHERE s.employer_id = $1
      ORDER BY s.created_at DESC
    `, [employer_id]);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shortlist' }, { status: 500 });
  }
}

// POST: Add a candidate to shortlist
export async function POST(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { candidate_id, job_id } = await request.json();
    if (!candidate_id) return NextResponse.json({ error: 'Missing candidate_id' }, { status: 400 });
    const result = await pool.query(
      `INSERT INTO shortlists (employer_id, candidate_id, job_id) VALUES ($1, $2, $3) RETURNING *`,
      [employer_id, candidate_id, job_id || null]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to shortlist' }, { status: 500 });
  }
}

// DELETE: Remove a candidate from shortlist by shortlist id
export async function DELETE(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const result = await pool.query(
      `DELETE FROM shortlists WHERE id = $1 AND employer_id = $2 RETURNING *`,
      [id, employer_id]
    );
    if (result.rowCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from shortlist' }, { status: 500 });
  }
} 