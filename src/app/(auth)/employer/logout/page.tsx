"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    // Clear the token cookie
    document.cookie = 'token=; Max-Age=0; path=/;';
    // Redirect to login
    router.replace('/login');
  }, [router]);
  return null;
} 