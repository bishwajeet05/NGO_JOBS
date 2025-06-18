import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | NGO Hiring - India’s Top Platform for NGO Jobs, Internships, Scholarships & Grants</title>
        <meta name="description" content="NGO Hiring is India’s leading platform for NGO jobs, internships, scholarships, fellowships, grants, and social sector events, connecting changemakers with purpose-driven opportunities." />
        <meta name="keywords" content="NGO jobs India, internships in NGOs, social sector fellowships India, development sector jobs, NGO funding and grants India, scholarships for social work students India, jobs in non-profits India, NGO career portal India, events for NGOs and development professionals" />
      </Head>
      <main className="w-full">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 sm:p-6 md:p-8 w-full">
          <div className="w-full px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About NGO Hiring</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              India’s one-stop destination for meaningful opportunities in the non-profit, development, and social impact sectors.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
              NGO Hiring is your trusted platform for discovering the latest opportunities in India’s non-profit, development, and social impact sectors. Whether you’re seeking a job in an NGO, a social sector internship, a development fellowship, a scholarship, or funding for your NGO, we connect passionate individuals with purpose-driven organizations across India. Supported by <Link href="https://www.developmentwala.com" target="_blank" className="text-blue-600 underline">Development Wala</Link>, NGO Hiring is built for changemakers who want to build careers with purpose and drive impact at grassroots, national, or international levels.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At NGO Hiring, we believe in connecting passion with purpose. Our mission is to empower individuals and organizations by making it easy to discover, access, and act on impactful opportunities in the development sector. We aim to build a transparent, inclusive, and growth-oriented ecosystem for NGO professionals, students, volunteers, and social entrepreneurs.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image src="/public/images/ngo_job_board_india.jpg" alt="NGO Hiring Mission" width={500} height={300} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What You’ll Find on NGO Hiring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">🎯 NGO Jobs in India</h3>
                <p className="text-gray-600">Find verified jobs in NGOs, social enterprises, charities, CSR programs, and development consultancies.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">🎓 Scholarships</h3>
                <p className="text-gray-600">Access scholarships and educational funding for students and professionals in social sciences, development studies, and related fields, both in India and abroad.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">💼 Internships</h3>
                <p className="text-gray-600">Discover on-site and remote internships in NGOs, non-profits, and foundations—ideal for students, recent graduates, or those seeking hands-on experience.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">🧑‍🏫 Fellowships</h3>
                <p className="text-gray-600">Explore prestigious development fellowships offering leadership, research, and grassroots engagement opportunities.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">🗓️ Social Sector Events</h3>
                <p className="text-gray-600">Stay updated with conferences, webinars, workshops, and events relevant to development professionals, students, and organizations.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">💰 Grants & NGO Funding</h3>
                <p className="text-gray-600">Get access to funding calls, grant opportunities, and financial support for NGO-led projects and initiatives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why NGO Hiring?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <li className="flex items-start gap-4">
                <span className="text-blue-600 text-2xl">✅</span>
                <p className="text-gray-600">Curated and up-to-date listings across the social impact ecosystem.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 text-2xl">✅</span>
                <p className="text-gray-600">Easy-to-use platform for browsing, filtering, and applying.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 text-2xl">✅</span>
                <p className="text-gray-600">Trusted by thousands of NGOs, non-profits, CSR teams, and funding agencies.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 text-2xl">✅</span>
                <p className="text-gray-600">Active LinkedIn and WhatsApp communities for peer learning and networking.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 text-2xl">✅</span>
                <p className="text-gray-600">Backed by Development Wala, a professional service provider for NGOs.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Start Your Journey Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Start Your Journey Today</h2>
            <ul className="text-gray-600 max-w-2xl mx-auto text-left mb-8">
              <li className="flex items-start gap-2 mb-2">
                <span className="text-blue-600">✔️</span>
                <p>Search for the latest NGO jobs and internships.</p>
              </li>
              <li className="flex items-start gap-2 mb-2">
                <span className="text-blue-600">✔️</span>
                <p>Apply to fellowships and funding opportunities.</p>
              </li>
              <li className="flex items-start gap-2 mb-2">
                <span className="text-blue-600">✔️</span>
                <p>Access career resources and expert insights.</p>
              </li>
              <li className="flex items-start gap-2 mb-2">
                <span className="text-blue-600">✔️</span>
                <p>Join India’s most active social sector community.</p>
              </li>
            </ul>
            <Link href="/opportunities" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
              Discover Opportunities
            </Link>
          </div>
        </section>

        {/* Connect With Us Section - Enhanced */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Connect With Us</h2>
            <p className="text-lg text-gray-600 mb-4">Reach out for support or inquiries at <a href="mailto:mail@ngohiring.org" className="text-blue-600 hover:text-blue-800 underline transition-colors"><FaEnvelope className="inline-block mr-2" />mail@ngohiring.org</a></p>
            <p className="text-lg text-gray-600 mb-8">Explore our partner site: <Link href="https://www.developmentwala.com" target="_blank" className="text-blue-600 hover:text-blue-800 underline transition-colors">Development Wala</Link></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              <a
                href="https://www.linkedin.com/company/development-wala/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaLinkedin className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/thedevelopmentwala"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaFacebook className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">Facebook</span>
              </a>
              <a
                href="https://chat.whatsapp.com/LnapTWcR4grJocdvMwZFII"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaWhatsapp className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">WhatsApp Group</span>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VaCxEqA0G0XoVCQyUx38"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaWhatsapp className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">WhatsApp Channel</span>
              </a>
              <a
                href="https://www.instagram.com/development.wala"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaInstagram className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@DevelopmentWalaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaYoutube className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">YouTube</span>
              </a>
              
            </div>
          </div>
        </section>
      </main>
    </>
  );
}