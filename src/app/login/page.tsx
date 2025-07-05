'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // IMPORTANT: ensures cookies are set
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to sign in');
      }
      
      const { user } = await res.json();
      if (user.role === 'candidate') {
        router.push('/quick-login/candidate');
      } else if (user.role === 'employer') {
        router.push('/employer/dashboard');
      } else {
      router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F7]">
      <div className="w-full max-w-4xl m-4 bg-white rounded-2xl shadow-lg flex overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Sign in to continue to your account.</p>

          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" passHref>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</span>
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{' '}
            <Link href="/signup" passHref>
              <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
          <div className="mt-6">
            <Link href="/register">
              <button className="w-full border border-blue-600 text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Branding/Image */}
        <div className="hidden lg:flex w-1/2 bg-blue-50 items-center justify-center p-12 rounded-r-2xl">
            <Image 
                src="/images/login-illustration.svg"
                alt="Login Illustration"
                width={400}
                height={400}
            />
        </div>
      </div>
    </div>
  );
} 