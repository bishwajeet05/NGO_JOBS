import Head from 'next/head';
import Link from 'next/link';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaUsers, FaBuilding, FaFileAlt, FaLaptopCode, FaBriefcase, FaSearch, FaBalanceScale, FaBook, FaChartLine, FaGraduationCap } from 'react-icons/fa';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | NGO Hiring - Connect with India’s Leading NGO Job Platform</title>
        <meta
          name="description"
          content="Contact NGO Hiring for inquiries, job postings, collaborations, or technical support. Join our community and explore services for NGOs and development professionals."
        />
        <meta
          name="keywords"
          content="NGO Hiring contact, NGO jobs India, social sector collaborations, NGO community India, technical support NGO Hiring, NGO services India"
        />
      </Head>
      <main className="w-full bg-gray-50">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 sm:p-6 md:p-8 w-full">
          <div className="w-full px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              We’re here to support changemakers, jobseekers, and social impact organizations. Let’s connect!
            </p>
          </div>
        </section>

        {/* General Inquiries Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">General Inquiries</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              Have questions about our platform, job listings, or how to get started? Reach out to us!
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:mail@ngohiring.org"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                <FaEnvelope className="text-xl" />
                Email: mail@ngohiring.org
              </a>
            </div>
            <p className="text-center text-gray-500 mt-4">We typically respond within 24–48 hours.</p>
          </div>
        </section>

        {/* Job Posting & Collaboration Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Job Posting & Collaboration</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              Are you an NGO, foundation, social enterprise, or recruiter? We welcome collaborations to post opportunities or partner on events and campaigns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaBuilding className="text-2xl" /> Opportunities to Post
                </h3>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>NGO jobs</li>
                  <li>Internships</li>
                  <li>Fellowships</li>
                  <li>Funding opportunities</li>
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaUsers className="text-2xl" /> Collaboration Ideas
                </h3>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>Events and webinars</li>
                  <li>Career support services</li>
                  <li>Campaigns for social impact</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <a
                href="mailto:mail@ngohiring.org"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Email Us
              </a>
              <Link
                href="#contact-form"
                className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Support Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Technical Support</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Experiencing issues with website functionality or application forms? Let us know, and our technical team will resolve it promptly.
            </p>
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaLaptopCode className="text-xl" />
              Report an Issue
            </Link>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-gray-100" id="contact-form">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Send Us a Message</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              Fill out the form below to get in touch with our team.
            </p>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Community Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Stay informed about the latest jobs, fellowships, events, and NGO grants by joining our growing community.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
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
                href="https://www.linkedin.com/groups/9085898/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaLinkedin className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">LinkedIn Group</span>
              </a>
              <a
                href="https://www.linkedin.com/company/development-wala/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaLinkedin className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">Development Wala</span>
              </a>
              <a
                href="https://www.linkedin.com/company/ngohiring/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300"
              >
                <FaLinkedin className="text-3xl text-blue-600 mb-2" />
                <span className="text-blue-600 font-semibold">NGO Hiring</span>
              </a>
            </div>
          </div>
        </section>

        {/* Need Our Services Section - Updated */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              Explore our tailored solutions to empower NGOs, development professionals, and students in the social sector.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaBriefcase className="text-2xl" /> Recruitment Solutions
                </h3>
                <p className="text-gray-600">
                  Helping NGOs and government bodies find skilled professionals for development work, from job postings to end-to-end recruitment.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaSearch className="text-2xl" /> NGO Job Board & Talent Marketplace
                </h3>
                <p className="text-gray-600">
                  A platform for job seekers and recruiters in the nonprofit sector to post opportunities, discover talent, and explore social impact careers.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaBalanceScale className="text-2xl" /> NGO & Legal Entity Registration
                </h3>
                <p className="text-gray-600">
                  Support with registering Trusts, Societies, and Section 8 Companies to ensure legal compliance and accurate documentation.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaFileAlt className="text-2xl" /> Proposal, Project & Impact Documentation
                </h3>
                <p className="text-gray-600">
                  Creation of Detailed Project Reports, donor proposals, and impact assessments to unlock funding opportunities.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaChartLine className="text-2xl" /> Development Consultancy & Advisory
                </h3>
                <p className="text-gray-600">
                  Customized solutions for NGO challenges in strategy, compliance, operations, and monitoring & evaluation.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <FaGraduationCap className="text-2xl" /> Mentorship for Students & Aspirants
                </h3>
                <p className="text-gray-600">
                  Mentoring students interested in careers in development, including guidance for courses in social work, public policy, and development studies.
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <a
                href="https://www.developmentwala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Services
              </a>
              <a
                href="mailto:mail@developmentwala.com"
                className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>

        </main>
    </>
  );
}