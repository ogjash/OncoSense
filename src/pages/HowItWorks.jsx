import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          How It <span className="text-primary">Works</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Our AI-powered platform seamlessly integrates into your healthcare workflow, making cancer care more efficient and effective.
        </motion.p>
      </section>

      {/* Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8`}
            >
              <div className="flex-1">
                <div className="bg-secondary p-6 rounded-xl border border-primary/20">
                  <div className="text-primary mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"></div>
                  <div className="relative bg-secondary p-6 rounded-lg border border-primary/20">
                    <div className="aspect-video bg-secondary-dark rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Step {index + 1} Visualization</span>
                    </div>
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

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Data Collection & Analysis",
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
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "AI-Powered Diagnosis",
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
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Treatment Planning & Monitoring",
    description: "Personalized treatment plans are created and continuously monitored for optimal outcomes.",
    features: [
      "Customized protocols",
      "Progress tracking",
      "Outcome prediction",
      "Treatment optimization"
    ]
  }
];

export default HowItWorks; 