import { motion } from 'framer-motion';

const Solutions = () => {
  const solutions = [
    {
      title: "Emergency Department Management",
      description: "Streamline emergency department operations with intelligent patient triage and resource allocation. Reduce wait times and improve patient outcomes.",
      benefits: [
        "Automated patient triage",
        "Real-time bed allocation",
        "Staff optimization",
        "Emergency response coordination"
      ]
    },
    {
      title: "Outpatient Care Optimization",
      description: "Enhance outpatient department efficiency with smart scheduling and resource management. Maximize patient throughput while maintaining quality care.",
      benefits: [
        "Smart appointment scheduling",
        "Resource utilization tracking",
        "Patient flow optimization",
        "Wait time reduction"
      ]
    },
    {
      title: "Inpatient Care Management",
      description: "Optimize inpatient care delivery with comprehensive bed management and staff scheduling. Ensure efficient resource utilization and patient satisfaction.",
      benefits: [
        "Bed allocation optimization",
        "Staff scheduling automation",
        "Patient transfer management",
        "Resource utilization tracking"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-dark">
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
              Discover how our AI-powered solutions can transform different aspects of your hospital operations, from emergency care to outpatient services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl hover:border-primary/40 transition-colors"
              >
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
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions; 