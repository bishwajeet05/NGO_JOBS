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
      <body className="bg-[#eaf4fb] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}