"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Employer = {
  id: number;
  name: string;
  logo: string;
  location: string;
  tags: string;
  open_positions: number;
};

export default function TopOrganisationsPage() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/employers')
      .then(res => res.json())
      .then(data => {
        setEmployers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a2a3a] mb-6 text-center">Top Organisations</h1>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading organisations...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {employers.map((org) => (
              <Link key={org.id} href={`/top-organisations/${org.id}`} className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition">
                <Image src={org.logo} alt={org.name} width={64} height={64} className="rounded-md object-cover mb-2" />
                <h2 className="text-lg font-semibold text-[#1a2a3a] mb-1 text-center">{org.name}</h2>
                <p className="text-xs text-gray-500 mb-2 text-center">{org.location}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {org.tags} <span className="font-medium">{org.open_positions} Open Positions</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 