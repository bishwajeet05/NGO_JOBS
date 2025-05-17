// src/app/layout.tsx
"use client";
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


/*
export const metadata = {
  title: 'Auth App',
  description: 'Next.js Authentication App with JWT',
};*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
          <Navbar />
            <main className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-4 text-black w-full">
              {children}
            </main>
          <Footer />
      </body>
    </html>
  );
}