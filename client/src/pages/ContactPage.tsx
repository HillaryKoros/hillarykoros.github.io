import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import { contactInfo } from '../data/contactInfo';

interface WindowWithCalendly extends Window {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
}

const ContactPage: React.FC = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email.value);
  };

  // Add Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    const windowWithCalendly = window as WindowWithCalendly;
    if (windowWithCalendly.Calendly) {
      windowWithCalendly.Calendly.initPopupWidget({
        url: 'https://calendly.com/koroshillary12/30min?hide_landing_page_details=1&hide_gdpr_banner=1'
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="animate-fade-in"
    >
      <motion.h2 
        className="text-2xl font-semibold mb-6 relative inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Contact
        <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-accent dark:bg-accent rounded-full"></span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ContactInfo
          title={contactInfo.email.title}
          subtitle={contactInfo.email.subtitle}
          value={contactInfo.email.value}
          icon={contactInfo.email.icon}
          actionButton={{
            text: "Copy",
            onClick: handleCopyEmail
          }}
        />
        
        <ContactInfo
          title={contactInfo.location.title}
          subtitle={contactInfo.location.subtitle}
          value={contactInfo.location.value}
          icon={contactInfo.location.icon}
        />
        
        <ContactInfo
          title={contactInfo.social.title}
          subtitle={contactInfo.social.subtitle}
          value=""
          icon={contactInfo.social.icon}
          socialLinks={contactInfo.social.links}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          className="bg-card dark:bg-card rounded-xl shadow-md p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mb-5 text-2xl shadow-md">
            {contactInfo.calendly.icon}
          </div>
          
          <h3 className="font-medium mb-2">{contactInfo.calendly.title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{contactInfo.calendly.subtitle}</p>
          
          <motion.button 
            className="px-4 py-2 bg-accent text-white dark:text-neutral-900 rounded-full hover:bg-opacity-90 transition-colors"
            onClick={openCalendly}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Call
          </motion.button>
        </motion.div>
        
        <motion.div
          className="bg-card dark:bg-card rounded-xl shadow-md p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mb-5 text-2xl shadow-md">
            {contactInfo.support.icon}
          </div>
          
          <h3 className="font-medium mb-2">{contactInfo.support.title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{contactInfo.support.subtitle}</p>
          
          <div className="flex space-x-4">
            {contactInfo.support.links.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-sm font-medium rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  {link.icon} {link.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <ContactForm />
    </motion.section>
  );
};

export default ContactPage;
