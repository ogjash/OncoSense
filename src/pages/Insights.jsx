import { motion } from 'framer-motion';

const Insights = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Research & <span className="text-primary">Insights</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Discover the latest research findings, success stories, and insights from our AI-powered cancer care platform.
        </motion.p>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-secondary p-6 rounded-xl border border-primary/20 text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Latest Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {research.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-secondary p-6 rounded-xl border border-primary/20"
            >
              <div className="text-primary mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{item.date}</span>
                <button className="text-primary hover:text-primary-dark transition-colors">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

const stats = [
  {
    value: "95%",
    label: "Accuracy Rate in Early Detection"
  },
  {
    value: "40%",
    label: "Faster Diagnosis Time"
  },
  {
    value: "10,000+",
    label: "Patients Monitored"
  }
];

const research = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "AI in Early Cancer Detection",
    description: "New study shows significant improvement in early cancer detection rates using our AI algorithms.",
    date: "March 15, 2024"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Personalized Treatment Outcomes",
    description: "Research demonstrates improved patient outcomes through AI-driven personalized treatment plans.",
    date: "March 10, 2024"
  }
];

export default Insights; 