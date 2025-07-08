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
      result = await pool.query("SELECT * FROM grants WHERE employer_id = $1 ORDER BY created_at DESC", [employer_id]);
    } else {
      result = await pool.query("SELECT * FROM grants ORDER BY created_at DESC");
    }
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch grants" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const employer_id = await getEmployerId(request);
    if (!employer_id) return NextResponse.json({ error: "Missing employer_id" }, { status: 400 });
    const query = `
      INSERT INTO grants (
        title, organization, type, sector, eligible, amount, deadline, link, rfp_url, description, tags, status, featured, employer_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      ) RETURNING *
    `;
    const values = [
      data.title,
      data.organization,
      data.type,
      data.sector,
      data.eligible,
      data.amount,
      data.deadline,
      data.link,
      data.rfp_url || null,
      data.description,
      data.tags,
      data.status,
      data.featured ?? false,
      employer_id,
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create grant" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const employer_id = await getEmployerId(request);
    if (!employer_id) return NextResponse.json({ error: "Missing employer_id" }, { status: 400 });
    // Only allow update if owned by employer
    const check = await pool.query("SELECT * FROM grants WHERE id = $1 AND employer_id = $2", [data.id, employer_id]);
    if (check.rowCount === 0) return NextResponse.json({ error: "Not found or not authorized" }, { status: 403 });
    const query = `
      UPDATE grants SET
        title = $1, organization = $2, type = $3, sector = $4, eligible = $5, amount = $6, deadline = $7, link = $8, rfp_url = $9, description = $10, tags = $11, status = $12, featured = $13, updated_at = NOW()
      WHERE id = $14 AND employer_id = $15 RETURNING *
    `;
    const values = [
      data.title,
      data.organization,
      data.type,
      data.sector,
      data.eligible,
      data.amount,
      data.deadline,
      data.link,
      data.rfp_url || null,
      data.description,
      data.tags,
      data.status,
      data.featured ?? false,
      data.id,
      employer_id,
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update grant" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const employer_id = await getEmployerId(request);
    if (!employer_id) return NextResponse.json({ error: "Missing employer_id" }, { status: 400 });
    // Only allow delete if owned by employer
    const check = await pool.query("SELECT * FROM grants WHERE id = $1 AND employer_id = $2", [data.id, employer_id]);
    if (check.rowCount === 0) return NextResponse.json({ error: "Not found or not authorized" }, { status: 403 });
    await pool.query("DELETE FROM grants WHERE id = $1 AND employer_id = $2", [data.id, employer_id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete grant" }, { status: 500 });
  }
} 