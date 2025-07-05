// src/app/(auth)/signin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  console.log("SignIn")

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Login attempt for:", email);
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // ensures cookies are set
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      // No need to set token cookie in JS
      if (data.user.role === 'candidate') {
        await router.push('/quick-login/candidate');
      } else if (data.user.role === 'employer') {
        await router.push('/employer/dashboard');
      } else if (data.user.role === 'super_admin' || data.user.role === 'admin') {
        await router.push('/super-admin');
      } else {
        await router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full rounded-lg bg-white p-4 sm:p-8 shadow-md">
  <div className="w-full rounded-lg bg-white p-8 shadow-md">
    <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Sign In
      </button>
    </form>
  </div>
</div>
  );
}