// src/lib/auth.ts

// src/lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For local testing only: compare plain text
  return password === hashedPassword;
}

export function generateToken(userId: string): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): { userId: string } | null {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}