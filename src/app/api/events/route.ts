import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Helper to get employer_id from request/session (stub for now)
async function getEmployerId(request: Request) {
  // TODO: Replace with real session/user extraction
  const url = new URL(request.url);
  return url.searchParams.get('employer_id');
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const employer_id = url.searchParams.get('employer_id');
    let result;
    if (employer_id) {
      result = await pool.query("SELECT * FROM events WHERE employer_id = $1 ORDER BY created_at DESC", [employer_id]);
    } else {
      result = await pool.query("SELECT * FROM events ORDER BY created_at DESC");
    }
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const employer_id = await getEmployerId(request);
    if (!employer_id) return NextResponse.json({ error: "Missing employer_id" }, { status: 400 });
    const query = `
      INSERT INTO events (
        title, organizer, type, mode, location, start_date, end_date, link, email, poster_url, description, tags, employer_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      ) RETURNING *
    `;
    const values = [
      data.title,
      data.organizer,
      data.type,
      data.mode,
      data.location,
      data.start_date,
      data.end_date,
      data.link,
      data.email,
      data.poster_url || null,
      data.description,
      data.tags,
      employer_id,
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const employer_id = await getEmployerId(request);
    if (!employer_id) return NextResponse.json({ error: "Missing employer_id" }, { status: 400 });
    // Only allow update if owned by employer
    const check = await pool.query("SELECT * FROM events WHERE id = $1 AND employer_id = $2", [data.id, employer_id]);
    if (check.rowCount === 0) return NextResponse.json({ error: "Not found or not authorized" }, { status: 403 });
    const query = `
      UPDATE events SET
        title = $1, organizer = $2, type = $3, mode = $4, location = $5, start_date = $6, end_date = $7, link = $8, email = $9, poster_url = $10, description = $11, tags = $12, updated_at = NOW()
      WHERE id = $13 AND employer_id = $14 RETURNING *
    `;
    const values = [
      data.title,
      data.organizer,
      data.type,
      data.mode,
      data.location,
      data.start_date,
      data.end_date,
      data.link,
      data.email,
      data.poster_url || null,
      data.description,
      data.tags,
      data.id,
      employer_id,
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const employer_id = await getEmployerId(request);
    if (!employer_id) return NextResponse.json({ error: "Missing employer_id" }, { status: 400 });
    // Only allow delete if owned by employer
    const check = await pool.query("SELECT * FROM events WHERE id = $1 AND employer_id = $2", [data.id, employer_id]);
    if (check.rowCount === 0) return NextResponse.json({ error: "Not found or not authorized" }, { status: 403 });
    await pool.query("DELETE FROM events WHERE id = $1 AND employer_id = $2", [data.id, employer_id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
} 