import { motion } from 'framer-motion';
import Icon from './Icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Lightbulb, ClipboardList, Users, Check } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '../lib/animations';

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

        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={cardHover.hover}
              className="h-full"
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon icon={service.icon} size={32} className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <Icon icon={Check} size={16} className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg">
            <a href="/leistungen">
              Alle Leistungen entdecken
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;