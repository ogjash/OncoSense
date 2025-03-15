import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
const Footer = () => {
  const location = useLocation();
  
  // Define the page order for navigation
  const pageOrder = ['/', '/what-we-do', '/solutions', '/insights', '/about'];
  
  // Get current and next page
  const currentIndex = pageOrder.indexOf(location.pathname);
  const nextPath = pageOrder[(currentIndex + 1) % pageOrder.length];
  const nextPageName = getPageName(nextPath);

  function getPageName(path) {
    switch(path) {
      case '/': return 'Home';
      case '/what-we-do': return 'What We Do';
      case '/solutions': return 'Solutions';
      case '/insights': return 'Insights';
      case '/about': return 'About Us';
      default: return 'Home';
    }
  }

  return (
    <footer className="bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6">QMedix</h3>
            <p className="text-gray-400 text-lg">
              Transforming healthcare delivery through intelligent automation and data-driven solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-gray-400 hover:text-primary transition-colors text-lg">
                  What We Do
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-gray-400 hover:text-primary transition-colors text-lg">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-gray-400 hover:text-primary transition-colors text-lg">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-lg">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li>123 Healthcare Ave</li>
              <li>Medical District</li>
              <li>contact@qmedix.com</li>
              <li>+91-5551234567</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-6 text-lg">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-secondary text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors text-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Next Page Section */}
        <div className="mt-16">
          <Link to={nextPath}>
            <motion.div 
              className="flex flex-col items-start gap-2 group cursor-pointer pl-4"
              whileHover="hover"
            >
              <span className="text-[30px] text-gray-400 group-hover:text-primary transition-colors">
                Next Page
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[70px] text-gray-400 group-hover:text-primary transition-colors font-semibold break-words">
                  {nextPageName}
                </span>
                <motion.svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  variants={{
                    hover: {
                      rotate: 315,
                      transition: { 
                        duration: 0.3
                      }
                    }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">
              © {new Date().getFullYear()} QMedix. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-lg">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-lg">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 