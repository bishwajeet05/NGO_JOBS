import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const query = `
      INSERT INTO events (
        title, organizer, type, mode, location, start_date, end_date, link, email, poster_url, description, tags
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
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
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
} 