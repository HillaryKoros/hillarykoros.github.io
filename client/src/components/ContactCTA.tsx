import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const links = [
  {
    label: 'Email',
    detail: 'koroshillary12@gmail.com',
    href: 'mailto:koroshillary12@gmail.com',
    icon: Mail,
    accent: 'group-hover:border-amber-500/50 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400',
  },
  {
    label: 'Book a call',
    detail: 'cal.com / calendly',
    href: 'https://cal.com/hillarykoros',
    icon: Calendar,
    accent: 'group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
  },
  {
    label: 'GitHub',
    detail: 'HillaryKoros',
    href: 'https://github.com/HillaryKoros',
    icon: Github,
    accent: 'group-hover:border-foreground/40 group-hover:bg-foreground/5 group-hover:text-foreground',
  },
  {
    label: 'LinkedIn',
    detail: 'hillarykoros',
    href: 'https://linkedin.com/in/hillarykoros',
    icon: Linkedin,
    accent: 'group-hover:border-blue-500/50 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
];

const ContactCTA: React.FC = () => {
  return (
    <section className="relative py-8">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
      >
        <span className="w-6 h-px bg-amber-500/60" />
        Contact
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
      >
        Let's build something.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.10 }}
        className="text-sm text-muted-foreground mb-7 max-w-prose"
      >
        Open to research positions, consulting, conference talks, and collaborations across
        climate, geospatial, hydrology, and disaster decision-support work.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((l, i) => {
          const Icon = l.icon;
          return (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.04 + i * 0.05 }}
              whileHover={{ y: -2 }}
              className={`group flex items-center justify-between gap-4 p-4
                          rounded-xl border border-border/70 bg-card/65
                          supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
                          transition-colors duration-300 ${l.accent}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/40 border border-border/40 text-muted-foreground transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-base font-mono font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {l.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground truncate">
                    {l.detail}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export default ContactCTA;
