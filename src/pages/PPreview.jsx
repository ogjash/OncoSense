import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/navbar.jsx';

const PPreview = () => {
  return (
    <div className="min-h-screen bg-secondary-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Patient Dashboard Preview
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of our patient-centric healthcare solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Preview Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80" 
                alt="Patient Dashboard" 
                className="w-full max-w-3xl rounded-xl shadow-lg"
              />
              
              <div className="text-center max-w-3xl">
                <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-gray-300 mb-6">
                  We're currently working on the full preview of our Patient Dashboard solution. 
                  Check back soon for a detailed overview of all features and benefits.
                </p>
                
                <Link to="/solutions">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors"
                  >
                    Back to Solutions
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PPreview;
