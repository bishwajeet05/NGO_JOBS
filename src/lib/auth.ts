// src/lib/auth.ts

// src/lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT_SECRET for token generation and verification
const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  if (!JWT_SECRET) {
    console.log('generateToken: JWT_SECRET is not defined');
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  console.log('Generated token:', token.slice(0, 10) + '...');
  return token;
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  if (!JWT_SECRET) {
    console.log('verifyToken: JWT_SECRET is not defined');
    return null;
  }

  try {
    console.log('Verifying token:', token.slice(0, 10) + '...');

    // Split JWT into header, payload, and signature
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    if (!headerB64 || !payloadB64 || !signatureB64) {
      console.log('verifyToken: Invalid token format');
      return null;
    }

    // Decode header and payload
    const header = JSON.parse(atob(headerB64));
    const payload = JSON.parse(atob(payloadB64));
    if (header.alg !== 'HS256') {
      console.log('verifyToken: Unsupported algorithm:', header.alg);
      return null;
    }

    // Prepare data to sign (header.payload)
    const data = `${headerB64}.${payloadB64}`;

    // Import JWT_SECRET as a CryptoKey for HMAC-SHA256
    const secretKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );

    // Compute HMAC-SHA256 signature
    const signature = await crypto.subtle.sign(
      'HMAC',
      secretKey,
      new TextEncoder().encode(data)
    );

    // Convert signature to base64url
    const signatureB64Computed = btoa(
      String.fromCharCode(...new Uint8Array(signature))
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Verify signature
    if (signatureB64Computed !== signatureB64) {
      console.log('verifyToken: Invalid signature');
      return null;
    }

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      console.log('verifyToken: Token expired');
      return null;
    }

    console.log('Token decoded successfully:', { userId: payload.userId });
    return { userId: payload.userId as string };
  } catch (error: any) {
    console.log('Token verification failed:', {
      error: error.name,
      message: error.message,
      token: token.slice(0, 10) + '...',
    });
    return null;
  }
}
/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    console.log('Verifying token:', token);
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
}*/