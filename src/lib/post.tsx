// lib/posts.ts
import pool from './db';

// Fetch all Jobs posts
export async function getJobPosts() {
  const { rows } = await pool.query('SELECT * FROM jobs');
  return rows;
}

// Fetch a single blog post by slug
export async function getJobPostBySlug(jid: string) {
  const { rows } = await pool.query('SELECT * FROM jobs WHERE slug = $1::text', [jid]);
  console.log(rows);
  return rows[0];
}

// Fetch Result posts
export async function getAdmitPosts() {
  const { rows } = await pool.query('SELECT * FROM admit_card');
  return rows;
}

// Fetch a single result post by slug
export async function getAdmitBySlug(aid: string) {
  const { rows } = await pool.query('SELECT * FROM admit_card WHERE id = $1', [aid]);
  return rows[0];
}

// Fetch Result posts
export async function getResultPosts() {
  const { rows } = await pool.query('SELECT * FROM result_details');
  return rows;
}

// Fetch a single result post by slug
export async function getResultBySlug(rid: string) {
  const { rows } = await pool.query('SELECT * FROM result_details WHERE id = $1', [rid]);
  return rows[0];
}

// Fetch News posts
export async function getNewsPosts() {
  const { rows } = await pool.query('SELECT * FROM news');
  return rows;
}

// Fetch a single result post by slug
export async function getNewsBySlug(nid: string) {
  const { rows } = await pool.query('SELECT * FROM news WHERE id = $1', [nid]);
  return rows[0];
}

// Fetch Answer posts
export async function getAnswerPosts() {
  const { rows } = await pool.query('SELECT * FROM answer');
  return rows;
}

// Fetch a single answer post by slug
export async function getAnswerBySlug(anid: string) {
  const { rows } = await pool.query('SELECT * FROM answer WHERE id = $1', [anid]);
  return rows[0];
}

// Fetch syllabus posts
export async function getSyllabusPosts() {
  const { rows } = await pool.query('SELECT * FROM syllabus');
  return rows;
}

// Fetch a single syllabus post by slug
export async function getSyllabusBySlug(sid: string) {
  const { rows } = await pool.query('SELECT * FROM syllabus WHERE id = $1', [sid]);
  return rows[0];
}

// Fetch date posts
export async function getDatePosts() {
  const { rows } = await pool.query('SELECT * FROM date');
  return rows;
}

// Fetch a single date post by slug
export async function getDateBySlug(did: string) {
  const { rows } = await pool.query('SELECT * FROM date WHERE id = $1', [did]);
  return rows[0];
}

////-------------------HOME-------------------////

// Fetch Important Updates

// Fetch Latest live jobs
// Fetch all Jobs posts
export async function getHomeJobPosts() {
  const { rows } = await pool.query('SELECT * FROM job');
  return rows;
}