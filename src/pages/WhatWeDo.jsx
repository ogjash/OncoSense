import { motion } from 'framer-motion';

const WhatWeDo = () => {
  const services = [
    {
      title: "Queue Management",
      description: "Our AI-powered queue management system revolutionizes how hospitals handle patient flow. By analyzing real-time data and patient priorities, we optimize waiting times and improve patient satisfaction.",
      features: [
        "Smart priority allocation",
        "Real-time wait time predictions",
        "Automated patient notifications",
        "Dynamic queue optimization"
      ]
    },
    {
      title: "Resource Allocation",
      description: "Efficiently manage hospital resources with our intelligent allocation system. From bed management to staff scheduling, we ensure optimal utilization of all hospital assets.",
      features: [
        "Bed tracking and allocation",
        "Staff scheduling optimization",
        "Equipment utilization tracking",
        "Resource conflict prevention"
      ]
    },
    {
      title: "Analytics & Reporting",
      description: "Make data-driven decisions with our comprehensive analytics platform. Monitor key performance indicators and identify areas for improvement in real-time.",
      features: [
        "Performance dashboards",
        "Resource utilization reports",
        "Patient flow analytics",
        "Trend analysis and forecasting"
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
              What We Do
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We transform hospital operations through intelligent automation and data-driven solutions, making healthcare delivery more efficient and patient-friendly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <svg className="w-6 h-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Side */}
                <div className="flex-1">
                  <div className="relative bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-md"></div>
                    <div className="relative h-[300px] bg-primary/10 rounded-xl"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo; 