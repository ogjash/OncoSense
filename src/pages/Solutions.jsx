import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Solutions = () => {
  const navigate = useNavigate();
  
  const solutions = [
    {
      title: "Hospital Dashboard",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive hospital management system that provides real-time insights and control over all hospital operations, enabling efficient decision-making and resource management.",
      benefits: [
        "Real-time bed management & occupancy tracking",
        "Staff scheduling & workload optimization",
        "Department performance analytics",
        "Resource utilization monitoring",
        "Emergency response coordination",
        "Financial metrics & reporting"
      ],
      path: "/hospital-dashboard"
    },
    {
      title: "Patient Dashboard",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
      description: "Patient-centric platform that empowers individuals to manage their healthcare journey, access medical records, and interact with healthcare providers seamlessly.",
      benefits: [
        "Personal health records access",
        "Appointment scheduling & reminders",
        "Medication tracking & alerts",
        "Telemedicine integration",
        "Lab results & reports viewing",
        "Secure provider messaging"
      ],
      path: "/patient-dashboard"
    }
  ];

  const handleLearnMore = (e, path) => {
    e.preventDefault();
    
    // Use navigate for routing instead of changing location directly
    // If paths aren't set up yet, prevent default behavior until they're ready
    if (path) {
      navigate(path);
    } else {
      // Fallback if path isn't available - just prevent default behavior
      console.log("Path not yet available");
    }
  };

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
              Our Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our powerful dashboard solutions designed to revolutionize healthcare management for both healthcare providers and patients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl hover:border-primary/40 transition-colors overflow-hidden"
              >
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <motion.img
                    src={solution.image}
                    alt={`${solution.title} Preview`}
                    className="w-full h-48 object-cover rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {solution.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {solution.description}
                </p>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors"
                  onClick={(e) => handleLearnMore(e, solution.path)}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Solutions;
