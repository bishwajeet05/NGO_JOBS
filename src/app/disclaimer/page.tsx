import Head from 'next/head';
import Link from 'next/link';
import { FaEnvelope, FaGlobe } from 'react-icons/fa';

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer | NGO Hiring - Terms of Use</title>
        <meta
          name="description"
          content="Read NGO Hiring's Disclaimer to understand the terms of use for our platform, including limitations of liability and third-party content."
        />
        <meta
          name="keywords"
          content="NGO Hiring disclaimer, terms of use, NGO jobs India, social sector opportunities, liability limitations"
        />
      </Head>
      <main className="w-full bg-gray-50">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 sm:p-6 md:p-8 w-full">
          <div className="w-full px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Understand the terms of using NGO Hiring’s platform and services.
            </p>
          </div>
        </section>

        {/* Disclaimer Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> 05/03/2025 – Present
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Welcome to NGO Hiring (<Link href="https://www.ngohiring.org" target="_blank" className="text-blue-600 underline">www.ngohiring.org</Link>). By using this website, you agree to the terms outlined in this Disclaimer. Please read this page carefully before relying on any information or services provided through our platform.
              </p>

              {/* Section 1: General Information Only */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">1.</span> General Information Only
                </h2>
                <p className="text-gray-600">
                  The content on NGO Hiring is intended for informational and educational purposes only. While we strive to ensure the accuracy and relevance of all listings and resources, we do not guarantee that the information is always current, complete, or error-free.
                  The use of our website and reliance on any information is at your own risk.
                </p>
              </div>

              {/* Section 2: No Guarantee of Outcome */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">2.</span> No Guarantee of Outcome
                </h2>
                <p className="text-gray-600 mb-4">
                  NGO Hiring serves as a platform for sharing verified opportunities in the non-profit and development sector, including jobs, internships, fellowships, scholarships, grants, and events. However:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>We do not control the recruitment process of third-party organizations.</li>
                  <li>We do not guarantee selection, funding approval, or admission into any opportunity listed.</li>
                  <li>Users are advised to do their own due diligence before applying or sharing personal information with external links or organizations.</li>
                </ul>
              </div>

              {/* Section 3: Third-Party Links & Content */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">3.</span> Third-Party Links & Content
                </h2>
                <p className="text-gray-600 mb-4">
                  Our website may contain links to third-party websites, social media platforms, or external job portals. These links are provided for your convenience, and we do not:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>Endorse or take responsibility for the content, policies, or practices of external websites</li>
                  <li>Have control over third-party data handling or user privacy</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Please refer to the individual privacy and disclaimer policies of third-party sites before engaging with them.
                </p>
              </div>

              {/* Section 4: No Professional or Legal Advice */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">4.</span> No Professional or Legal Advice
                </h2>
                <p className="text-gray-600">
                  The materials provided on NGO Hiring are not intended to constitute legal, financial, career, or professional advice. Always consult with qualified professionals or directly with organizations before making any decisions based on the listings or content found on this website.
                </p>
              </div>

              {/* Section 5: User Responsibility */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">5.</span> User Responsibility
                </h2>
                <p className="text-gray-600 mb-4">
                  By using this platform, users agree:
                </p>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>To use the information provided ethically and responsibly</li>
                  <li>Not to misuse or misrepresent any information found on this site</li>
                  <li>To verify all details independently before making commitments</li>
                </ul>
              </div>

              {/* Section 6: Changes to the Disclaimer */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">6.</span> Changes to the Disclaimer
                </h2>
                <p className="text-gray-600">
                  We reserve the right to modify, update, or change this Disclaimer at any time without prior notice. Continued use of the site after changes are posted will constitute your acceptance of the revised terms.
                </p>
              </div>

              {/* Section 7: Contact Us */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">7.</span> Contact Us
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have questions or concerns regarding this Disclaimer, please contact us:
                </p>
                <ul className="text-gray-600 list-none">
                  <li className="flex items-center gap-2 mb-2">
                    <FaEnvelope className="text-blue-600" />
                    <strong>Email:</strong> <a href="mailto:mail@ngohiring.org" className="text-blue-600 underline">mail@ngohiring.org</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaGlobe className="text-blue-600" />
                    <strong>Website:</strong> <Link href="https://www.ngohiring.org" target="_blank" className="text-blue-600 underline">www.ngohiring.org</Link>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-600 mt-8">
                NGO Hiring is powered by <Link href="https://www.developmentwala.com" target="_blank" className="text-blue-600 underline">Development Wala</Link>, a professional services provider for the social impact and development sector.
              </p>
              <p className="text-gray-600 mt-4">
                <strong>Last updated on:</strong> 15-06-2025
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}