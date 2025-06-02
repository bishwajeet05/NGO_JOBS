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
            <main className="flex flex-col md:flex-row text-black w-full h-screen m-0 p-0">
              {children}
            </main>
          <Footer />
      </body>
    </html>
  );
}