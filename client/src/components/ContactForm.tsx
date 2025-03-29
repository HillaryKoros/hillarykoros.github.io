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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Simple validation
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting me. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div 
      className="bg-card dark:bg-card rounded-xl shadow-md p-6 lg:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-medium mb-6">Send me a message</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent" 
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent" 
              placeholder="Your email"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent" 
            placeholder="Message subject"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent resize-none" 
            placeholder="Your message"
            required
          ></textarea>
        </div>
        
        <motion.button 
          type="submit" 
          className="px-6 py-3 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800 rounded-lg font-medium hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-800 dark:focus:ring-neutral-200"
          disabled={!isValid || isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
