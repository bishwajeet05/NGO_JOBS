"use client";
import EmployerSidebar from '../EmployerSidebar';
import React, { useState } from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteProfile() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/employer/delete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete profile');
      setMessage('Profile deleted successfully!');
      setTimeout(() => {
        // Optionally, log out or redirect to home/login
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to delete profile');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trash2 className="text-red-500 w-7 h-7" /> Delete Profile
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
          <form onSubmit={handleDelete} className="space-y-8">
            <div>
              <div className="font-semibold text-lg text-gray-800 mb-1">Are you sure! You want to delete your profile.</div>
              <div className="text-red-500 text-sm mb-4">This can't be undone!</div>
              <label className="block mb-2 text-gray-700">Please enter your login Password to confirm:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200 text-gray-700"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {message && <div className="text-green-600 text-sm text-center">{message}</div>}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Profile"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 