import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await query(
      'SELECT id, name, logo, location, tags, open_positions, about, email, phone, website FROM employers WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Employer not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employer' }, { status: 500 });
  }
} 