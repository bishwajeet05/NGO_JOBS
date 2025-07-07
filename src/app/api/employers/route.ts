import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const result = await query('SELECT id, name, logo, location, tags, open_positions FROM employers ORDER BY name ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employers' }, { status: 500 });
  }
} 