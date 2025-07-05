import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Helper to get employer_id from JWT cookie
async function getEmployerId(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const decoded = await verifyToken(token);
  return decoded?.userId || null;
}

export async function GET(request: Request) {
  const employer_id = await getEmployerId(request);
  if (!employer_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // Mock data for now
  const packages = [
    {
      id: '9392',
      name: 'Basic',
      type: 'Job Package',
      info: {
        urgent: true,
        featured: true,
        posted: 0,
        limitPosts: 30,
        duration: 15
      },
      status: 'Active'
    },
    {
      id: '11331',
      name: 'Basic',
      type: 'Job Package',
      info: {
        urgent: true,
        featured: true,
        posted: 0,
        limitPosts: 30,
        duration: 15
      },
      status: 'Active'
    },
    {
      id: '11332',
      name: 'Standard',
      type: 'Job Package',
      info: {
        urgent: true,
        featured: true,
        posted: 0,
        limitPosts: 40,
        duration: 30
      },
      status: 'Active'
    },
    {
      id: '13144',
      name: 'Basic',
      type: 'Job Package',
      info: {
        urgent: true,
        featured: true,
        posted: 0,
        limitPosts: 30,
        duration: 15
      },
      status: 'Active'
    }
  ];
  return NextResponse.json(packages);
} 