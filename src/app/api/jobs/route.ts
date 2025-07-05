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
        title, slug, description, qualifications, role_category, role_type, employment_type, experience_min, experience_max, education_required, salary_currency,
        salary_value, salary_unit_text, date_posted, valid_through, organization, organization_type, country, state,
        city, pin_code, street_address, is_active, how_to_apply, applylink, user_id, featured
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
      ) RETURNING *
    `;
    const values = [
      data.title,
      data.slug,
      data.description,
      data.qualifications,
      data.role_category,
      data.role_type,
      data.employment_type,
      data.experience_min,
      data.experience_max,
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
      data.how_to_apply,
      data.applylink,
      data.user_id || 'superadmin',
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
        role_category = $8, role_type = $9, employment_type = $10,
        experience_min = $11, experience_max = $12, education_required = $13,
        industry_type = $14, department = $15, key_skills = $16,
        salary_currency = $17, salary_value = $18, salary_unit_text = $19,
        date_posted = $20, valid_through = $21, country = $22, state = $23, city = $24, pin_code = $25, street_address = $26, user_id = $27, is_remote = $28,
        is_active = $29, organization = $30, organization_type = $31, applylink = $32, how_to_apply = $33, featured = $34
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
      data.role_type,
      data.employment_type,
      data.experience_min,
      data.experience_max,
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