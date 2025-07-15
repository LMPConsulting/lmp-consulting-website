import { motion } from 'framer-motion';
import Icon from './Icon';
import { Lightbulb, ClipboardList, Users, Check } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: "IT-Beratung",
    description: "Strategische Beratung für Ihre digitale Transformation. Von der Analyse bis zur Umsetzung begleiten wir Sie kompetent.",
    features: ["Digitalisierungsstrategie", "Technologie-Assessment", "IT-Architektur", "Vendor Selection"]
  },
  {
    icon: ClipboardList,
    title: "Projektleitung",
    description: "Professionelles Projektmanagement nach bewährten Standards. Wir führen Ihre IT-Projekte zum Erfolg.",
    features: ["Agile Methoden", "Klassisches PM", "Stakeholder Management", "Risk Management"]
  },
  {
    icon: Users,
    title: "Change Management",
    description: "Strukturierte Begleitung organisatorischer Veränderungen. Menschen und Prozesse erfolgreich transformieren.",
    features: ["Change Strategie", "Kommunikation", "Training & Coaching", "Kulturwandel"]
  }
];

const ServicesPreview = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 mb-4">
            Unsere <span className="text-gradient">Kernkompetenzen</span>
          </h2>
          <p className="text-large max-w-2xl mx-auto">
            Mit über 15 Jahren Erfahrung in der IT-Branche bieten wir Ihnen 
            umfassende Expertise in drei zentralen Bereichen.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card group hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon={service.icon} size={32} className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              
              <h3 className="heading-3 mb-3">{service.title}</h3>
              
              <p className="text-body mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-secondary-600">
                    <Icon icon={Check} size={16} className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a href="/leistungen" className="btn-primary">
            Alle Leistungen entdecken
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;