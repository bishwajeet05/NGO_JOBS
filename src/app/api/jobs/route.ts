// app/api/Job/route.ts
import { NextResponse } from "next/server";
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM jobs");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Job" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = (await cookies()).get('token')?.value;
    console.log("Data received:", data);
    const query = `
      INSERT INTO jobs (
        title, slug, description, responsibilities, qualifications, requirements,
        career_prospects, role_category, role_type, employment_type, experience_min,
        experience_max, education_required, industry_type, department, key_skills,
        salary_currency, salary_value, salary_unit_text, date_posted, valid_through,
        country, state, city, pin_code, street_address,user_id, is_remote, is_active, organization, organization_type, applylink, how_to_apply
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22, $23, $24 , $25, $26, $27, $28, $29, $30, $31, $32, $33
      ) RETURNING *
    `;
    const values = [
      data.title,
      data.slug,
      data.description,
      data.responsibilities,
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
      "ash",
      data.is_remote ?? false,
      data.is_active ?? true,
      data.organization,
      data.organization_type,
      data.applylink,
      data.how_to_apply,
    ];
    if (token) {
        const decoded = await verifyToken(token);
        console.log("Decoded token:", decoded);
        console.log(decoded?.userId);
        if (decoded) {
          const result = await pool.query(query, values);
          return NextResponse.json(result.rows[0]);
        }
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const query = `
      UPDATE jobs SET
        title = $2, slug = $3, description = $4, responsibilities = $5,
        qualifications = $6, requirements = $7, career_prospects = $8,
        role_category = $9, role_type = $10, employment_type = $11,
        experience_min = $12, experience_max = $13, education_required = $14,
        industry_type = $15, department = $16, key_skills = $17,
        salary_currency = $18, salary_value = $19, salary_unit_text = $20,
        date_posted = $21, valid_through = $22, country = $23, state = $24, city = $25, pin_code = $26, street_address = $27, user_id = $28, is_remote = $29,
        is_active = $30, organization = $31, organization_type = $32, applylink = $33, how_to_apply = $34
      WHERE id = $1 RETURNING *
    `;
    const values = [
      data.id,
      data.title,
      data.slug,
      data.description,
      data.responsibilities,
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
      data.user_id,
      data.is_remote ?? false,
      data.is_active ?? true,
      data.organization,
      data.organization_type,
      data.applylink,
      data.how_to_apply,
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
    const result = await pool.query("DELETE FROM Jobs WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Exam not job" }, { status: 404 });
    }
    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}