import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  category: string;
  index: number;
}

const SkillBar = ({ name, level, category, index }: SkillBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Management':
        return 'from-primary-500 to-primary-600';
      case 'Technical':
        return 'from-accent-500 to-accent-600';
      default:
        return 'from-secondary-500 to-secondary-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Management':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'Technical':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
            category === 'Management' ? 'bg-primary-100 text-primary' : 'bg-accent-100 text-accent'
          }`}>
            {getCategoryIcon(category)}
          </div>
          <span className="font-semibold text-secondary-900">{name}</span>
        </div>
        <span className="text-sm font-medium text-secondary-600">{level}%</span>
      </div>
      
      <div className="progress-bar">
        <motion.div
          className={`progress-fill bg-gradient-to-r ${getCategoryColor(category)}`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;