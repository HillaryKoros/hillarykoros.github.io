import React from 'react';
import { motion } from 'framer-motion';
import TechGrid from '../components/TechGrid';
import { services } from '../data/services';
import { humanLanguages } from '../data/skills';

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          About Me
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed text-justify mb-6">
          I transform complex geospatial data into operational tools that drive real-world impact through designing ETL pipelines,
          spatial databases, and web applications for decision support, early warning, land information, and AI/ML systems
          across Africa and beyond.
        </p>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'GIS & Remote Sensing', color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
            { label: 'Spatial Databases', color: 'bg-green-500/10 text-green-600 border-green-500/30' },
            { label: 'Machine Learning', color: 'bg-purple-500/10 text-purple-600 border-purple-500/30' },
            { label: 'ETL Pipelines', color: 'bg-orange-500/10 text-orange-600 border-orange-500/30' },
            { label: 'Cloud Computing', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30' },
            { label: 'Full Stack Development', color: 'bg-pink-500/10 text-pink-600 border-pink-500/30' },
            { label: 'Data Visualization', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30' },
            { label: 'Climate Technology', color: 'bg-teal-500/10 text-teal-600 border-teal-500/30' },
          ].map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border ${skill.color}`}
            >
              {skill.label}
            </span>
          ))}
        </div>
      </section>

      {/* Areas of Expertise */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Areas of Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.primary.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-base font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Creative Interests */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Creative Interests
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.creative.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-base font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Languages
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {humanLanguages.map((lang, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl font-bold text-primary mb-2">{lang.code}</div>
              <h3 className="text-base font-bold text-foreground mb-1">{lang.name}</h3>
              <p className="text-sm text-muted-foreground">{lang.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Technologies & Tools
        </h2>
        <TechGrid />
      </section>
    </motion.div>
  );
};

export default AboutPage;
