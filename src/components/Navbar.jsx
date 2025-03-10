import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 z-50">
      <div className="relative">
        {/* Dock Background */}
        <div className="absolute inset-0 bg-secondary-dark/80 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg shadow-primary/5"></div>
        
        {/* Content */}
        <div className="relative px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-primary">
              OncoSense
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/solutions" className="text-gray-300 hover:text-primary transition-colors">
                Solutions
              </Link>
              <Link to="/how-it-works" className="text-gray-300 hover:text-primary transition-colors">
                How it Works
              </Link>
              <Link to="/insights" className="text-gray-300 hover:text-primary transition-colors">
                Insights
              </Link>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors shadow-lg shadow-primary/20">
              Free Demo
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-4 bg-secondary-dark/95 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg shadow-primary/5"
          >
            <div className="p-6 space-y-6">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/solutions" 
                className="block text-gray-300 hover:text-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/how-it-works" 
                className="block text-gray-300 hover:text-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                to="/insights" 
                className="block text-gray-300 hover:text-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Insights
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors shadow-lg shadow-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 