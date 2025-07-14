import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies?: string[];
  price?: string;
  index: number;
}

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  benefits, 
  technologies, 
  price, 
  index 
}: ServiceCardProps) => {
  return (
    <motion.div
      className="card-feature group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full transform rotate-45 scale-150"></div>
      </div>

      {/* Icon */}
      <div className="relative z-10 mb-6">
        <div className="icon-container-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="heading-4 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          {price && (
            <div className="badge-primary ml-4 flex-shrink-0">
              {price}
            </div>
          )}
        </div>

        <p className="text-body mb-6 text-secondary-600">
          {description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-secondary-900 mb-3 flex items-center">
            <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Leistungen
          </h4>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
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
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h4 className="font-semibold text-secondary-900 mb-3 flex items-center">
            <svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Ihr Nutzen
          </h4>
          <ul className="space-y-2">
            {benefits.map((benefit, idx) => (
              <motion.li 
                key={idx}
                className="flex items-start text-small text-secondary-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.05) + 0.2 }}
                viewport={{ once: true }}
              >
                <svg className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-secondary-900 mb-3">Technologien</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, idx) => (
                <span key={idx} className="badge-info">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-secondary-200">
          <a 
            href="/kontakt" 
            className="btn-secondary w-full group-hover:btn-primary transition-all duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Beratung anfragen
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;