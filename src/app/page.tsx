// src/app/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

export default async function Home() {
  console.log('Home: Checking user login status');

  const token = (await cookies()).get('token')?.value;
  console.log('Home: Token from cookies:', token ? token.slice(0, 10) + '...' : 'none');

  if (token) {
    const decoded = await verifyToken(token);
    console.log('Home: Decoded token:', decoded);

    if (decoded) {
      console.log('Home: User is logged in, redirecting to /dashboard');
      redirect('/dashboard');
    }
  }

  console.log('Home: User is not logged in, redirecting to /signin');
  redirect('/signin');
}