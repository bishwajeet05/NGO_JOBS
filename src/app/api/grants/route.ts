import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM grants ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch grants" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const query = `
      INSERT INTO grants (
        title, organization, type, sector, eligible, amount, deadline, link, rfp_url, description, tags, status, featured
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
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
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create grant" }, { status: 500 });
  }
} 