"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import DashboardSidebar from '../DashboardSidebar';
import { Menu } from 'lucide-react';
import Image from 'next/image';

interface EventForm {
  title: string;
  organizer: string;
  type: string;
  mode: string;
  location: string;
  startDate: string;
  endDate: string;
  link: string;
  email: string;
  poster: File | null;
  description: string;
  tags: string;
}

const typeOptions = ["Conference", "Seminar", "Workshop", "Webinar", "Meetup", "Other"];
const modeOptions = ["Online", "Offline", "Hybrid"];

export default function PostEventPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventForm>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterError, setPosterError] = useState<string>("");
  const posterInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: EventForm) => {
    if (posterFile && posterFile.size > 1 * 1024 * 1024) {
      setPosterError("File size exceeds 1MB limit.");
      return;
    }
    // TODO: Handle form submission (API call)
    alert("Event posted! (Demo)");
    reset();
    setPosterFile(null);
    setPosterError("");
    if (posterInputRef.current) posterInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setPosterError("Only JPG and PNG files are allowed.");
      setPosterFile(null);
      return;
    }
    if (file && file.size > 1 * 1024 * 1024) {
      setPosterError("File size exceeds 1MB limit.");
      setPosterFile(null);
      return;
    }
    setPosterFile(file);
    setPosterError("");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-30">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Menu className="w-6 h-6 text-indigo-600" />
        </button>
        <span className="font-extrabold text-lg text-gray-800">Admin Dashboard</span>
        <Image src="/images/wa.jpg" alt="User" width={36} height={36} className="rounded-full border-2 border-indigo-200" />
      </header>
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col p-1 md:p-2 bg-gradient-to-br from-[#f7faff] via-[#f5f7fb] to-[#f0f4fa] min-h-screen">
        <section className="bg-white/90 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/30 p-4 md:p-6 mb-6 w-full transition-all">
          <h2 className="text-lg font-extrabold mb-3 border-b border-blue-50 pb-2 text-blue-900 tracking-tight">Post a Social Sector Event</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Event Title<span className="text-red-500">*</span></label>
              <input {...register("title", { required: true })} className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Organizer<span className="text-red-500">*</span></label>
              <input {...register("organizer", { required: true })} className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Event Type<span className="text-red-500">*</span></label>
              <select {...register("type", { required: true })} className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm">
                <option value="">Select</option>
                {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Mode<span className="text-red-500">*</span></label>
              <select {...register("mode", { required: true })} className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm">
                <option value="">Select</option>
                {modeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Location (for offline/hybrid events)</label>
              <input {...register("location")}
                placeholder="City, State or Venue" className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Start Date</label>
              <input type="date" {...register("startDate")}
                className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">End Date</label>
              <input type="date" {...register("endDate")}
                className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Registration/Official Link</label>
              <input type="url" {...register("link")}
                placeholder="https://..." className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Contact Email</label>
              <input type="email" {...register("email")}
                placeholder="contact@example.com" className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Event Poster (Image Only)</label>
              <input type="file" accept="image/jpeg,image/png" ref={posterInputRef} onChange={handleFileChange} className="block w-full text-base text-blue-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {posterFile && <div className="text-sm text-gray-700 mt-1">{posterFile.name}</div>}
              {posterError && <div className="text-sm text-red-500 mt-1">{posterError}</div>}
              <div className="text-xs text-gray-500 mt-1">Image only (JPG, PNG). Max size: 1MB.</div>
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Event Description</label>
              <textarea {...register("description")}
                placeholder="Describe the event..." className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm resize-none" rows={3} />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Tags / Keywords</label>
              <input {...register("tags")}
                placeholder="e.g. environment, youth, education" className="p-2 border border-blue-100 rounded-lg w-full bg-[#f8fafc] text-base shadow-sm" />
            </div>
            <button type="submit" className="w-full bg-[#2B7FFF] text-white font-bold py-2 rounded-lg shadow hover:bg-[#2566cc] transition-colors">Submit Event</button>
          </form>
        </section>
      </main>
    </div>
  );
} 