import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E88E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="heading-1 mb-6">
              Digitale Transformation{' '}
              <span className="text-gradient">erfolgreich gestalten</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-large mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            LMP Consulting GmbH begleitet Sie mit professioneller IT-Beratung, 
            strategischer Projektleitung und strukturiertem Change Management 
            auf dem Weg in die digitale Zukunft.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <a href="/kontakt" className="btn-primary">
              Kostenlose Beratung anfragen
            </a>
            <a href="/leistungen" className="btn-secondary">
              Unsere Leistungen
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 pt-8 border-t border-secondary-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <p className="text-sm text-secondary-600 mb-6">
              Vertrauen von Unternehmen verschiedener Branchen
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for client logos */}
              <div className="w-24 h-12 bg-secondary-200 rounded flex items-center justify-center">
                <span className="text-xs text-secondary-500">Client 1</span>
              </div>
              <div className="w-24 h-12 bg-secondary-200 rounded flex items-center justify-center">
                <span className="text-xs text-secondary-500">Client 2</span>
              </div>
              <div className="w-24 h-12 bg-secondary-200 rounded flex items-center justify-center">
                <span className="text-xs text-secondary-500">Client 3</span>
              </div>
              <div className="w-24 h-12 bg-secondary-200 rounded flex items-center justify-center">
                <span className="text-xs text-secondary-500">Client 4</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-secondary-500">Mehr erfahren</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;