// src/app/layout.tsx
"use client";
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';


/*
export const metadata = {
  title: 'Auth App',
  description: 'Next.js Authentication App with JWT',
};*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname && pathname.startsWith('/quick-login/candidate');
  return (
    <html lang="en">
      <body className="bg-[#eaf4fb] min-h-screen flex flex-col">
        {!hideNavbar && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}