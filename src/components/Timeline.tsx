import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-accent-300"></div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative flex items-start mb-12 last:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          {/* Timeline Dot */}
          <div className="relative z-10 flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">{item.year}</span>
            </div>
          </div>

          {/* Content */}
          <div className="ml-8 flex-1">
            <motion.div
              className="card-feature"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <h3 className="heading-4 mb-2">{item.title}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-semibold text-primary">{item.company}</span>
                </div>
                <p className="text-body text-secondary-600 mb-4">{item.description}</p>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold text-secondary-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Erfolge & Highlights
                </h4>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start text-small text-secondary-600"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.2) + (idx * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;