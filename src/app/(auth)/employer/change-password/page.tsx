"use client";
import EmployerSidebar from '../EmployerSidebar';
import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (newPassword !== retypePassword) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    // TODO: Implement API call
    setTimeout(() => {
      setLoading(false);
      setMessage("Password changed successfully!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Key className="text-blue-500 w-7 h-7" /> Change Password
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Old password</label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500" onClick={() => setShowOld(v => !v)} tabIndex={-1}>
                  {showOld ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">New password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500" onClick={() => setShowNew(v => !v)} tabIndex={-1}>
                  {showNew ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Retype password</label>
              <div className="relative">
                <input
                  type={showRetype ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                  value={retypePassword}
                  onChange={e => setRetypePassword(e.target.value)}
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500" onClick={() => setShowRetype(v => !v)} tabIndex={-1}>
                  {showRetype ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {message && <div className="text-green-600 text-sm text-center">{message}</div>}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 