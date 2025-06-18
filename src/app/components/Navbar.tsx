"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Fingerprint, UserPlus, Menu, X, ChevronDown } from "lucide-react";

const opportunityLinks = [
  { name: "Internships", href: "/internships" },
  { name: "Fellowships", href: "/fellowships" },
  { name: "Scholarships", href: "/scholarships" },
];

const navLinks = [
  { name: "Find Job", href: "/jobs" },
  { name: "Events", href: "/events" },
  { name: "Grants", href: "/grants" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-30 transition-all duration-300
        ${isScrolled
          ? "bg-white/80 shadow-lg backdrop-blur-md"
          : "bg-white shadow-sm"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center mr-4 select-none">
          <span className="text-2xl font-extrabold tracking-tight text-blue-600 leading-none">Jobsy</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-semibold text-base tracking-tight text-[#1a2a3a] hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {/* All Opportunities Dropdown */}
          <div className="relative">
            <button
              className="font-semibold text-base tracking-tight text-[#1a2a3a] hover:text-blue-600 transition-colors flex items-center gap-1"
              onClick={() => setIsOpportunitiesOpen(!isOpportunitiesOpen)}
            >
              All Opportunities <ChevronDown className="h-4 w-4" />
            </button>
            {isOpportunitiesOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                {opportunityLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => setIsOpportunitiesOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2 ml-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base tracking-tight px-5 py-2 rounded-lg shadow-none border-none" asChild>
            <Link href="/post-job">Post a Job/Event</Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-base tracking-tight border-gray-300 text-gray-800 hover:bg-gray-100" asChild>
            <Link href="/login">
              <Fingerprint className="h-4 w-4" /> Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 h-full w-64 bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 float-right"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="py-3 px-4 text-[#1a2a3a] hover:bg-gray-50 rounded-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile All Opportunities Section */}
              <div className="py-3 px-4 text-[#1a2a3a] font-semibold">
                All Opportunities
              </div>
              {opportunityLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="py-2 px-8 text-[#1a2a3a] hover:bg-gray-50 rounded-lg text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-4" />
              <Link
                href="/post-job"
                className="py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold text-center mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Post a Job/Event
              </Link>
              <Link
                href="/login"
                className="py-3 px-4 border border-gray-300 text-gray-800 rounded-lg font-semibold text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Fingerprint className="h-4 w-4" /> Login
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;