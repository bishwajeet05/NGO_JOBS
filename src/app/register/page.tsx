"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, User, Mail, Lock, Briefcase } from "lucide-react";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<"candidate" | "employer">("candidate");
  const [fullName, setFullName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setOtpSent(true);
    // Simulate OTP send
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      // Redirect or show success
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F7]">
      <div className="w-full max-w-md m-4 bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <h1 className="text-2xl font-bold mb-2 text-[#1d1d1f]">Create Account</h1>
        <p className="mb-6 text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">Log In</Link>
        </p>

        {/* Account type toggle */}
        <div className="bg-gray-50 rounded-lg mb-6 p-3">
          <div className="text-xs text-gray-500 font-semibold text-center mb-2 tracking-wide">CREATE ACCOUNT AS A</div>
          <div className="flex gap-2">
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition border ${accountType === "candidate" ? "bg-blue-900 text-white border-blue-900" : "bg-white text-gray-700 border-gray-200"}`}
              onClick={() => setAccountType("candidate")}
            >
              <User className="w-4 h-4" /> Candidate
            </button>
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition border ${accountType === "employer" ? "bg-blue-900 text-white border-blue-900" : "bg-white text-gray-700 border-gray-200"}`}
              onClick={() => setAccountType("employer")}
            >
              <Briefcase className="w-4 h-4" /> Employer
            </button>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative h-14 transition-all duration-300">
            {accountType === "candidate" ? (
              <input
                key="fullName"
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 absolute inset-0 transition-all duration-300 opacity-100"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                style={{zIndex: 2, background: 'inherit'}}
              />
            ) : (
              <input
                key="orgName"
                type="text"
                placeholder="Organization Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 absolute inset-0 transition-all duration-300 opacity-100"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                required
                style={{zIndex: 2, background: 'inherit'}}
              />
            )}
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-800 transition disabled:opacity-60"
              onClick={handleSendOtp}
              disabled={otpSent || !email}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword(v => !v)}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* reCAPTCHA placeholder */}
          <div className="bg-gray-50 border border-gray-300 rounded-md p-4 flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" disabled />
            <span className="text-gray-700 text-sm">I'm not a robot</span>
            <span className="ml-auto text-xs text-gray-400">reCAPTCHA</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="w-4 h-4"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 select-none">
              I've read and agree with{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center"
            disabled={loading || !agreed}
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                Create Account <span className="ml-2">→</span>
              </>
            )}
          </button>
          <div className="flex flex-col gap-2 mt-4">
            <button
              type="button"
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => window.location.href = '/quick-login/candidate'}
            >
              Quick Login as Candidate
            </button>
            <button
              type="button"
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
              onClick={() => window.location.href = '/employer/dashboard'}
            >
              Quick Login as Employer
            </button>
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          className="w-full flex items-center justify-center bg-transparent p-0 border-none shadow-none hover:opacity-90 transition"
          type="button"
          onClick={() => {
            // This button is for LinkedIn sign-in, which is handled by the backend
            // For now, we'll just redirect to a placeholder or handle it via backend
            alert("LinkedIn sign-in is not yet implemented via this frontend flow.");
          }}
        >
          <Image src="/images/signin-button.png" alt="Sign in with LinkedIn" width={240} height={50} className="object-contain" />
        </button>
      </div>
    </div>
  );
} 