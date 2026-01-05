import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, MapPin, Heart, Coffee } from 'lucide-react';
import { FaWhatsapp, FaGithub } from 'react-icons/fa';
import { contactInfo } from '../data/contactInfo';

interface WindowWithCalendly extends Window {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
}

const contactActions = [
  { id: 'email', label: 'Email', Icon: Mail, color: 'bg-blue-500', getUrl: () => `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email.value}` },
  { id: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp, color: 'bg-green-500', getUrl: () => `https://wa.me/${contactInfo.phone.value.replace('+', '')}` },
  { id: 'call', label: 'Call', Icon: Phone, color: 'bg-purple-500', getUrl: () => `tel:${contactInfo.phone.value}` },
  { id: 'schedule', label: 'Schedule', Icon: Calendar, color: 'bg-orange-500', isCalendly: true, getUrl: () => contactInfo.calendly.url }
];

const ContactPage: React.FC = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const handleAction = (action: typeof contactActions[0]) => {
    if (action.isCalendly) {
      const windowWithCalendly = window as WindowWithCalendly;
      if (calendlyLoaded && windowWithCalendly.Calendly) {
        windowWithCalendly.Calendly.initPopupWidget({
          url: `${action.getUrl()}?hide_landing_page_details=1&hide_gdpr_banner=1`
        });
      } else {
        window.open(action.getUrl(), '_blank');
      }
    } else {
      window.open(action.getUrl(), '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      {/* Hero */}
      <section className="py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Let's Connect
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed text-justify">
          Have a project in mind or want to collaborate? I'm always open to discussing new opportunities
          in geospatial technology, data science, and web development.
        </p>
      </section>

      {/* Contact Actions */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Get In Touch
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactActions.map((action, index) => {
            const IconComponent = action.Icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleAction(action)}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className={`w-14 h-14 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-foreground">{action.label}</h3>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Location & Support */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center">
                <MapPin className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{contactInfo.location.title}</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.location.value}</p>
              </div>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-pink-500" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{contactInfo.support.title}</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.support.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://buymeacoffee.com/hillarykoros"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <Coffee className="w-4 h-4 text-yellow-500" />
                <span>Buy Me A Coffee</span>
              </a>
              <a
                href="https://github.com/sponsors/HillaryKoros"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub Sponsors</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
