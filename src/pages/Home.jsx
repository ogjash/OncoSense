import { motion } from 'framer-motion';
import BubbleBackground from '../components/BubbleBg';
import StarRing from '../components/StarRing';
// Import images
import diagnosisImage from '../assets/images/Ai_Diagnosis.webp';
import treatmentImage from '../assets/images/Treatment_Planning.webp';
import trackingImage from '../assets/images/Progress_Tracking.webp';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-screen">
        <BubbleBackground />
        <StarRing />
        
        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8 text-left lg:ml-40">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block"><span className="text-primary">AI</span>-Powered</span>
              <span className="block">Platform for Cancer</span>
              <span className="block">Care Providers</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl">
              <span className="block">Accelerating Research, Enhancing Quality, </span>
              <span className="block">and Streamlining Operations for Oncology Providers.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg transition-colors">
                Get Started
              </button>
              <button className="border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-full text-lg transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-[#140522] to-[#1f023d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-32 last:mb-0"
            >
              <div className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-primary">
                      <div className="w-10 h-10">
                        {feature.icon}
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold text-white">
                      {feature.title}
                    </h2>
                  </div>

                  {/* Content Column */}
                  <div className="ml-14">
                    <p className="text-xl text-gray-300 leading-relaxed mb-8 text-justify">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Image/Visual Side */}
                <div className="flex-1">
                  <div className="relative bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 overflow-hidden backdrop-blur-xl">
                    {/* Background blur effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-md"></div>

                    <motion.img
                      src={feature.image}
                      alt={feature.title}
                      className="relative w-full h-[300px] object-cover rounded-xl shadow-lg shadow-primary/10"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    image: diagnosisImage,
    title: "AI-Powered Diagnosis",
    description: "Our platform collects and analyzes patient data from various sources to create a comprehensive health profile.",
    features: [
      "Automated data collection",
      "Real-time analysis",
      "Secure data storage",
      "Comprehensive health profile"
    ]
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    image: treatmentImage,
    title: "Treatment Planning",
    description: "Advanced AI algorithms analyze the collected data to assist in accurate cancer detection and diagnosis.",
    features: [
      "Pattern recognition",
      "Early detection",
      "Risk assessment",
      "Diagnostic recommendations"
    ]
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    image: trackingImage,
    title: "Progress Tracking",
    description: "Personalized treatment plans are created and continuously monitored for optimal outcomes.",
    features: [
      "Customized protocols",
      "Progress tracking",
      "Outcome prediction",
      "Treatment optimization"
    ]
  }
];

export default Home; 