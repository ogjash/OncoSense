import { motion } from 'framer-motion';
import BubbleBackground from '../components/BubbleBg';
import StarRing from '../components/StarRing';
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
          <div className="w-full px-4 sm:px-6 lg:px-8 text-left lg:ml-4 xl:ml-40">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block"><span className="text-primary">AI</span>-Powered</span>
              <span className="block">Hospital Management</span>
              <span className="block">Smarter Care, Faster Service</span>

            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl">
              <span className="block"> Streamline Queues, Appointments</span>
              <span className="block">and Patient Flows with Intelligent Automation</span>
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    image: diagnosisImage,
    title: "Smart Queue Management",
    description: "Say goodbye to long waiting times and frustrated patients. Our AI-powered queue management system optimizes patient flow and reduces waiting times by up to 60%.",
    features: [
      "Real-time queue status updates",
      "Dynamic priority allocation",
      "Wait time predictions",
      "Automated patient notifications"
    ]
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    image: treatmentImage,
    title: "Resource Optimization",
    description: "Maximize your hospital's efficiency with intelligent resource allocation. Our system ensures optimal utilization of beds, staff, and medical equipment.",
    features: [
      "Bed allocation optimization",
      "Staff scheduling automation",
      "Equipment utilization tracking",
      "Resource conflict prevention"
    ]
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    image: trackingImage,
    title: "Resource Availability Tracking",
    description: "Real-time monitoring of hospital resources including beds, wards, and medical equipment.",
    features: [
      "Bed availability tracking",
      "Ward occupancy monitoring",
      "Equipment utilization",
      "Resource allocation optimization"
    ]
  }
];

export default Home; 
