import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  company: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
  technologies: string[];
  category: string;
  index: number;
}

const ProjectCard = ({ 
  title, 
  company, 
  period, 
  status, 
  description, 
  highlights, 
  technologies, 
  category, 
  index 
}: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aktuell':
        return 'badge-success';
      case 'abgeschlossen':
        return 'badge-primary';
      default:
        return 'badge-info';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'IT Transformation':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Projektmanagement':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'Change Management':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className="card-interactive group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full transform rotate-12 scale-150"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="icon-container-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              {getCategoryIcon(category)}
            </div>
            <div>
              <span className={`${getStatusColor(status)} mb-2 inline-block`}>
                {status}
              </span>
              <h3 className="heading-4 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-small text-secondary-600 mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="font-semibold">{company}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{period}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-body mb-6 text-secondary-600">
          {description}
        </p>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="font-semibold text-secondary-900 mb-3 flex items-center">
            <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Projekt-Highlights
          </h4>
          <ul className="space-y-2">
            {highlights.slice(0, 4).map((highlight, idx) => (
              <motion.li 
                key={idx}
                className="flex items-start text-small text-secondary-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.05) }}
                viewport={{ once: true }}
              >
                <svg className="w-4 h-4 text-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {highlight}
              </motion.li>
            ))}
            {highlights.length > 4 && (
              <li className="text-small text-secondary-500 italic">
                +{highlights.length - 4} weitere Highlights...
              </li>
            )}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="font-semibold text-secondary-900 mb-3">Technologien & Tools</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span key={idx} className="badge-info">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Category Badge */}
        <div className="pt-4 border-t border-secondary-200">
          <div className="flex items-center justify-between">
            <span className="badge-primary">
              {category}
            </span>
            <button className="text-primary hover:text-primary-600 transition-colors duration-300 flex items-center space-x-1 text-sm font-medium">
              <span>Details</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;