// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  console.log('Middleware: Checking token for', request.nextUrl.pathname, {
    token: token ? token.slice(0, 10) + '...' : 'none',
  });

  if (!token) {
    console.log('Middleware: No token found, redirecting to /signin');
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  const decoded = await verifyToken(token); // Now async
  console.log('Middleware: Decoded token:', decoded);
  if (!decoded) {
    console.log('Middleware: Invalid token, redirecting to /signin');
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  console.log('Middleware: Token valid, proceeding to', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'],
};

/*
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  console.log('Token from cookies or headers:', token);
  if (!token) {
    console.log('No token found, redirecting to signin');
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  const decoded = verifyToken(token);
  console.log('Decoded token:', decoded);
  if (!decoded) {
    console.log('Invalid token, redirecting to signin');
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  console.log('Token is valid, proceeding to the requested page');
  return NextResponse.next();
  
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect dashboard routes
};*/