import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F7] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-lg w-full">
        <Image src="/images/undraw_hiring_8szx.svg" alt="Not found" width={180} height={180} className="mb-6" />
        <h1 className="text-4xl font-extrabold text-[#1d1d1f] mb-2">404</h1>
        <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6 text-center">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
} 