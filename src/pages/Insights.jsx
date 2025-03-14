import { motion } from 'framer-motion';

const Insights = () => {
  const insights = [
    {
      title: "The Future of Hospital Operations",
      description: "Explore how AI and automation are transforming hospital operations and improving patient care delivery.",
      topics: [
        "AI in healthcare",
        "Digital transformation",
        "Patient experience",
        "Operational efficiency"
      ],
      readTime: "5 min read"
    },
    {
      title: "Optimizing Resource Allocation",
      description: "Learn about best practices in hospital resource management and how technology can help optimize utilization.",
      topics: [
        "Resource management",
        "Staff scheduling",
        "Bed allocation",
        "Cost optimization"
      ],
      readTime: "4 min read"
    },
    {
      title: "Improving Patient Flow",
      description: "Discover strategies for enhancing patient flow and reducing wait times in healthcare facilities.",
      topics: [
        "Queue management",
        "Patient experience",
        "Operational efficiency",
        "Quality of care"
      ],
      readTime: "6 min read"
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
              Healthcare Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest trends, best practices, and innovations in hospital management and healthcare operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl hover:border-primary/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {insight.title}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {insight.readTime}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {insight.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-transparent hover:bg-primary/10 text-primary px-6 py-3 rounded-full transition-colors border border-primary"
                >
                  Read Article
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights; 