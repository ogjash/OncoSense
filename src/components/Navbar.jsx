import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 z-50 overflow-x-hidden">
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-black/30 rounded-2xl border border-primary/20"></div>
        
        <div className="relative px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              QMedix
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/what-we-do" className="text-gray-300 hover:text-primary transition-colors">
                What We Do
              </Link>
              <Link to="/solutions" className="text-gray-300 hover:text-primary transition-colors">
                Solutions
              </Link>
              <Link to="/insights" className="text-gray-300 hover:text-primary transition-colors">
                Insights
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">
                About Us
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignup}
                className="bg-transparent hover:bg-primary/10 text-primary px-6 py-2 rounded-full transition-colors border border-primary"
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-300 hover:text-primary transition-colors relative w-6 h-6"
                aria-label="Toggle menu"
              >
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 right-4 w-64 bg-black/30 backdrop-blur-xl rounded-2xl border border-primary/20 z-50"
          >
            <div className="p-4 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/what-we-do" 
                className="block text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                What We Do
              </Link>
              <Link 
                to="/solutions" 
                className="block text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/insights" 
                className="block text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Insights
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <div className="space-y-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full transition-colors"
                  onClick={handleLogin}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-transparent hover:bg-primary/10 text-primary px-4 py-2 rounded-full transition-colors border border-primary"
                  onClick={handleSignup}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;