export default function Footer() {
    return (
        <footer className="gray-500/10 backdrop-blur-md text-black px-4 sm:px-6 lg:px-8 py-10 mt-12 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-3">GreenImpact NGO</h2>
            <p className="text-sm text-black/80">
              Empowering youth through sustainable jobs, events, and community impact initiatives across India.
            </p>
          </div>
      
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-black/90">
              <li><a href="/aboutUs" className="hover:text-green-300 transition-colors">About Us</a></li>
              <li><a href="/contactUs" className="hover:text-green-300 transition-colors">Contact Us</a></li>
              <li><a href="/disclaimer" className="hover:text-green-300 transition-colors">Disclaimer</a></li>
              <li><a href="/privacyPolicy" className="hover:text-green-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
      
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm space-y-3 text-black/80">
              <li>Email: <a href="mailto:info@greenimpact.org" className="hover:text-green-300 transition-colors">info@greenimpact.org</a></li>
              <li>Phone: <a href="tel:+911234567890" className="hover:text-green-300 transition-colors">+91 123 456 7890</a></li>
              <li>Address: 123 Green Lane, New Delhi, India</li>
            </ul>
          </div>
      
          {/* Newsletter and Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-black/80 mb-3">Join our newsletter for updates:</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded text-black w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-4 mt-4 text-black/80">
              <a href="#" className="hover:text-green-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Placeholder for Twitter/X icon */}
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Placeholder for Instagram icon */}
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.981-6.98.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.981-6.981-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Placeholder for LinkedIn icon */}
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.881v1.508h.041c.401-.757 1.379-1.557 2.834-1.557 3.027 0 3.584 1.992 3.584 4.583v6.466z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      
        <div className="mt-8 border-t border-black/20 pt-4 text-center text-xs text-black/60">
          © 2025 GreenImpact NGO. All rights reserved.
        </div>
      </footer>
    );
  }