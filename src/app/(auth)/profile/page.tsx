'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<{
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include', // Include cookies
        });
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
        router.push('/signin'); // Redirect to sign-in if unauthorized
      }
    };
    fetchUser();
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <p>
            <strong>Username:</strong> {user.user_id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>First Name:</strong> {user.first_name || 'Not provided'}
          </p>
          <p>
            <strong>Last Name:</strong> {user.last_name || 'Not provided'}
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}