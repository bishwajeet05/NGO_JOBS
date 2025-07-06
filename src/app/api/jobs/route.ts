// app/api/Job/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from '@/lib/auth';
// import { cookies } from 'next/headers';

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      error: "Failed to fetch jobs",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Job data received:', data);
    // Optionally, you can add authentication here
    // const token = (await cookies()).get('token')?.value;
    // if (token) { ... }
    const query = `
      INSERT INTO jobs (
        title, slug, description, how_to_apply, applylink, qualifications, role_category,
        employment_type, experience_min, education_required, salary_currency, salary_value, salary_unit_text,
        date_posted, valid_through, organization, organization_type, country, state, city, pin_code, street_address, is_active, featured
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      ) RETURNING *
    `;
    const values = [
      data.title,
      data.slug,
      data.description,
      data.how_to_apply,
      data.applylink,
      data.qualifications,
      data.role_category,
      data.employment_type,
      data.experience_min,
      data.education_required,
      data.salary_currency,
      data.salary_value,
      data.salary_unit_text,
      data.date_posted,
      data.valid_through,
      data.organization,
      data.organization_type,
      data.country,
      data.state,
      data.city,
      data.pin_code,
      data.street_address,
      data.is_active ?? true,
      data.featured ?? false,
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const query = `
      UPDATE jobs SET
        title = $2, slug = $3, description = $4, qualifications = $5,
        requirements = $6, career_prospects = $7,
        role_category = $8, employment_type = $9,
        experience_min = $10, education_required = $11,
        industry_type = $12, department = $13, key_skills = $14,
        salary_currency = $15, salary_value = $16, salary_unit_text = $17,
        date_posted = $18, valid_through = $19, country = $20, state = $21, city = $22, pin_code = $23, street_address = $24, user_id = $25, is_remote = $26,
        is_active = $27, organization = $28, organization_type = $29, applylink = $30, how_to_apply = $31, featured = $32
      WHERE id = $1 RETURNING *
    `;
    const values = [
      data.id,
      data.title,
      data.slug,
      data.description,
      data.qualifications,
      data.requirements,
      data.career_prospects,
      data.role_category,
      data.employment_type,
      data.experience_min,
      data.education_required,
      data.industry_type,
      data.department,
      data.key_skills,
      data.salary_currency,
      data.salary_value,
      data.salary_unit_text,
      data.date_posted,
      data.valid_through,
      data.country,
      data.state,
      data.city,
      data.pin_code,
      data.street_address,
      data.user_id || 'superadmin',
      data.is_remote ?? false,
      data.is_active ?? true,
      data.organization,
      data.organization_type,
      data.applylink,
      data.how_to_apply,
      data.featured ?? false,
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}