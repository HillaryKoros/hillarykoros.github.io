import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ContactForm: React.FC = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { name, email, subject, message } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setIsValid(
      name.trim() !== '' &&
      emailPattern.test(email) &&
      subject.trim() !== '' &&
      message.trim() !== ''
    );
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendViaWhatsApp = () => {
    if (!isValid) return;

    const { name, email, subject, message } = formData;
    const whatsappMessage = `*New Contact Form Message*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A%0A*Message:*%0A${message}`;
    const whatsappUrl = `https://wa.me/254719588603?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: "Opening WhatsApp",
      description: "Your message is ready to send via WhatsApp.",
    });
  };

  const sendViaEmail = () => {
    if (!isValid) return;

    const { name, email, subject, message } = formData;
    const emailBody = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
    const mailtoUrl = `mailto:koroshillary12@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

    window.location.href = mailtoUrl;

    toast({
      title: "Opening Email Client",
      description: "Your message is ready to send via email.",
    });
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-card to-primary/5 rounded-3xl border-2 border-border p-8 lg:p-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-base font-semibold text-foreground mb-3">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-secondary/30 border-2 border-border text-foreground text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-semibold text-foreground mb-3">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-secondary/30 border-2 border-border text-foreground text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Your email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-base font-semibold text-foreground mb-3">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-secondary/30 border-2 border-border text-foreground text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Message subject"
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-base font-semibold text-foreground mb-3">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-secondary/30 border-2 border-border text-foreground text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Your message"
              required
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              type="button"
              onClick={sendViaWhatsApp}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              Send via WhatsApp
            </motion.button>

            <motion.button
              type="button"
              onClick={sendViaEmail}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send via Email
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
