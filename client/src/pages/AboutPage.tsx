import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import SkillBar from '../components/SkillBar';
import TechScroll from '../components/TechScroll';
import { services } from '../data/services';
import { programmingSkills, humanLanguages } from '../data/skills';
import { technologies } from '../data/technologies';

const AboutPage: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="animate-fade-in"
    >
      {/* Hero Section with Professional Summary */}
      <motion.div
        className="relative bg-gradient-to-br from-background/80 to-background rounded-3xl shadow-lg mb-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-primary/10 to-transparent rounded-l-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-secondary/10 to-transparent rounded-tr-full"></div>
        
        <div className="relative z-10 p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="w-full">
              <h2 className="text-3xl font-bold text-foreground mb-1">About Me</h2>
              <div className="h-1 w-20 bg-primary mb-3 rounded-full"></div>
            </div>
            
            <div className="w-full">
              <div className="prose dark:prose-invert">
                <p className="leading-relaxed mb-3 text-lg">
                  A skilled geospatial technology expert combining AI/data science and full-stack development capabilities to create innovative solutions for complex spatial challenges through insightful analytics and modern web applications.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    {tag: "GIS & Remote Sensing", color: "bg-blue-400/50 text-blue-900 dark:text-blue-100"},
                    {tag: "Spatial Databases", color: "bg-green-400/50 text-green-900 dark:text-green-100"},
                    {tag: "Machine Learning", color: "bg-purple-400/50 text-purple-900 dark:text-purple-100"},
                    {tag: "Data Visualization", color: "bg-amber-400/50 text-amber-900 dark:text-amber-100"},
                    {tag: "Web Development", color: "bg-rose-400/50 text-rose-900 dark:text-rose-100"}
                  ].map((item, index) => (
                    <span 
                      key={index} 
                      className={`text-base font-medium ${item.color} px-3 py-1 rounded-full`}
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Primary Focus Section */}
      <div className="mb-12">
        <motion.div
          className="flex items-center mb-6 gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-8 w-1 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-semibold">Areas of Expertise</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {services.primary.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
      
      {/* Creative Section */}
      <div className="mb-12">
        <motion.div
          className="flex items-center mb-6 gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-8 w-1 bg-secondary rounded-full"></div>
          <h2 className="text-2xl font-semibold">Exploring Creativity</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {services.creative.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
      
      {/* Skills Section */}
      <div className="mb-12">
        <motion.div
          className="flex items-center mb-6 gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-8 w-1 bg-accent rounded-full"></div>
          <h2 className="text-2xl font-semibold">Language Proficiency</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Programming Languages */}
          <motion.div 
            className="bg-card dark:bg-card rounded-xl shadow-md p-6 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 16 4-4-4-4"/>
                  <path d="m6 8-4 4 4 4"/>
                  <path d="m14.5 4-5 16"/>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Programming Languages</h3>
            </div>
            
            <div className="space-y-4">
              {programmingSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Human Languages */}
          <motion.div 
            className="bg-card dark:bg-card rounded-xl shadow-md p-6 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="m2 12 20 0"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Human Languages</h3>
            </div>
            
            <div className="space-y-4">
              {humanLanguages.map((language, index) => (
                <SkillBar
                  key={index}
                  name={language.name}
                  percentage={language.percentage}
                  label={language.label}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Development Tools Section */}
      <div className="mb-6">
        <motion.div
          className="flex items-center mb-6 gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-8 w-1 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-semibold">Technologies & Tools</h2>
        </motion.div>
        
        <TechScroll technologies={technologies} />
      </div>
    </motion.section>
  );
};

export default AboutPage;
