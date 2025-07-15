import { motion } from 'framer-motion';
import Icon from './Icon';
import { Button } from './ui/Button';
import { ArrowRight, CheckCircle, Zap, ClipboardCheck, Users2 } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '../lib/animations';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            {...slideInLeft}
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              Ihre digitale{' '}
              <span className="text-gradient">Transformation</span>{' '}
              beginnt hier
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
            >
              Mit über 15 Jahren Erfahrung begleiten wir Unternehmen bei der 
              strategischen IT-Beratung, professionellem Projektmanagement und 
              erfolgreichem Change Management.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Button asChild size="lg" className="group">
                <a href="/kontakt">
                  Kostenlose Beratung
                  <Icon icon={ArrowRight} size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/leistungen">
                  Unsere Leistungen
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              <div className="flex items-center">
                <Icon icon={CheckCircle} size={20} className="text-accent mr-2" />
                15+ Jahre Erfahrung
              </div>
              <div className="flex items-center">
                <Icon icon={CheckCircle} size={20} className="text-accent mr-2" />
                50+ erfolgreiche Projekte
              </div>
              <div className="flex items-center">
                <Icon icon={CheckCircle} size={20} className="text-accent mr-2" />
                100% Kundenzufriedenheit
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="relative">
              {/* Main illustration container */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* Background circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full opacity-20"></div>
                
                {/* Central icon */}
                <div className="relative z-10 flex items-center justify-center h-96">
                  <div className="w-32 h-32 bg-gradient-primary rounded-2xl shadow-soft-lg flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-500">
                    <Icon icon={Zap} size={64} className="text-white" />
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div 
                  className="absolute top-8 left-8 w-16 h-16 bg-white rounded-lg shadow-soft flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon icon={Zap} size={32} className="text-primary" />
                </motion.div>

                <motion.div 
                  className="absolute top-16 right-4 w-12 h-12 bg-accent rounded-lg shadow-soft flex items-center justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Icon icon={ClipboardCheck} size={24} className="text-white" />
                </motion.div>

                <motion.div 
                  className="absolute bottom-12 left-4 w-14 h-14 bg-primary-100 rounded-lg shadow-soft flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Icon icon={Users2} size={28} className="text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-secondary-400"
        >
          <span className="text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;