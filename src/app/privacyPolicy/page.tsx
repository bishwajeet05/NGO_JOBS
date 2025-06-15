import Head from 'next/head';
import Link from 'next/link';
import { FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | NGO Hiring - Protecting Your Data</title>
        <meta
          name="description"
          content="Read NGO Hiring's Privacy Policy to understand how we collect, use, store, and protect your personal information on our platform."
        />
        <meta
          name="keywords"
          content="NGO Hiring privacy policy, data protection, personal information, NGO jobs India, social sector privacy"
        />
      </Head>
      <main className="w-full bg-gray-50">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 sm:p-6 md:p-8 w-full">
          <div className="w-full px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              At NGO Hiring, your privacy is our priority. Learn how we protect your data.
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> 05/03/2025 – Present
              </p>
              <p className="text-lg text-gray-600 mb-8">
                At NGO Hiring (<Link href="https://www.ngohiring.org" target="_blank" className="text-blue-600 underline">www.ngohiring.org</Link>), your privacy is extremely important to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you visit our website or use our services. By accessing or using NGO Hiring, you agree to the terms outlined in this policy.
              </p>

              {/* Section 1: Who We Are */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">1.</span> Who We Are
                </h2>
                <p className="text-gray-600">
                  NGO Hiring is an India-based online platform that connects individuals with verified jobs, internships, fellowships, scholarships, events, and funding opportunities in the nonprofit and development sector. Our platform is supported by <Link href="https://www.developmentwala.com" target="_blank" className="text-blue-600 underline">Development Wala</Link>.
                </p>
              </div>

              {/* Section 2: Information We Collect */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">2.</span> Information We Collect
                </h2>
                <p className="text-gray-600 mb-4">
                  We may collect the following types of personal information:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li><strong>Contact Information:</strong> Name, email address, phone number (when submitted through forms).</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, and time spent.</li>
                  <li><strong>Voluntary Information:</strong> Any data you submit through forms (e.g., job application, newsletter sign-up, collaboration requests).</li>
                  <li><strong>Third-Party Integrations:</strong> If you join our WhatsApp groups, LinkedIn pages, or social communities, we may access public profile data per the platform's policy.</li>
                </ul>
              </div>

              {/* Section 3: How We Use Your Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">3.</span> How We Use Your Information
                </h2>
                <p className="text-gray-600 mb-4">
                  We use your information for the following purposes:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>To operate and improve the website</li>
                  <li>To respond to inquiries or support requests</li>
                  <li>To send email updates, newsletters, and opportunity alerts (only if you opt in)</li>
                  <li>To process job/internship applications or submissions</li>
                  <li>To personalize user experience and enhance platform features</li>
                  <li>For legal and security compliance</li>
                </ul>
              </div>

              {/* Section 4: Cookies and Tracking Technologies */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">4.</span> Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to improve website performance and analyze user behavior. These may include:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>Session cookies (to keep you logged in)</li>
                  <li>Analytics cookies (e.g., Google Analytics)</li>
                  <li>Functionality cookies</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can disable cookies through your browser settings, though this may affect your experience on the site.
                </p>
              </div>

              {/* Section 5: Sharing of Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">5.</span> Sharing of Information
                </h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or rent users’ personal information to third parties. We may share information with trusted partners only in the following cases:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>To process applications or partnership requests</li>
                  <li>To comply with legal obligations or protect our rights</li>
                  <li>With service providers who help us operate our website (e.g., hosting, analytics)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  All third-party providers are bound by confidentiality and data protection agreements.
                </p>
              </div>

              {/* Section 6: Data Retention */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">6.</span> Data Retention
                </h2>
                <p className="text-gray-600">
                  We retain personal data for as long as necessary to fulfill the purpose it was collected for, or as required by applicable law. You may request data deletion at any time by contacting us at <a href="mailto:mail@ngohiring.org" className="text-blue-600 underline">mail@ngohiring.org</a>.
                </p>
              </div>

              {/* Section 7: Your Rights and Choices */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">7.</span> Your Rights and Choices
                </h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location and applicable law, you may have the right to:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>Access the personal data we hold about you</li>
                  <li>Request corrections or updates to your data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent from receiving communications</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise any of these rights, please contact us at <a href="mailto:mail@ngohiring.org" className="text-blue-600 underline">mail@ngohiring.org</a>.
                </p>
              </div>

              {/* Section 8: External Links */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">8.</span> External Links
                </h2>
                <p className="text-gray-600">
                  Our platform contains links to third-party websites, such as NGO portals, funding bodies, or educational platforms. We are not responsible for the content or privacy practices of these websites. Please review their policies separately.
                </p>
              </div>

              {/* Section 9: Data Security */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">9.</span> Data Security
                </h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse. However, no website or transmission is 100% secure, so we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 10: Updates to This Privacy Policy */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">10.</span> Updates to This Privacy Policy
                </h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this page periodically to stay informed.
                </p>
              </div>

              {/* Section 11: Contact Us */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">11.</span> Contact Us
                </h2>
                <p className="text-gray-600 mb-4">
                  For any privacy-related questions or requests, contact:
                </p>
                <ul className="text-gray-600 list-none">
                  <li className="flex items-center gap-2 mb-2">
                    <FaEnvelope className="text-blue-600" />
                    <strong>Email:</strong> <a href="mailto:mail@ngohiring.org" className="text-blue-600 underline">mail@ngohiring.org</a>
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <FaGlobe className="text-blue-600" />
                    <strong>Website:</strong> <Link href="https://www.ngohiring.org" target="_blank" className="text-blue-600 underline">www.ngohiring.org</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <strong>Location:</strong> India
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-600 mt-8">
                NGO Hiring is committed to protecting your privacy and ensuring a secure experience for all users across our platform.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}