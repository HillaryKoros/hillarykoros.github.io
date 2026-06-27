import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Coffee, Heart, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { contactInfo } from '../data/contactInfo';

interface WindowWithCalendly extends Window {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
}

interface ContactAction {
  id: string;
  label: string;
  detail: string;
  Icon: typeof Mail;
  url: string;
  isCalendly?: boolean;
  accent: string;     // hover border + bg
  iconColor: string;
}

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
      try {
        document.body.removeChild(script);
        document.head.removeChild(link);
      } catch { /* no-op on unmount race */ }
    };
  }, []);

  const actions: ContactAction[] = [
    {
      id: 'email', label: 'Email', detail: 'Send a message',
      Icon: Mail,
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email.value}`,
      accent: 'hover:border-amber-500/50 hover:bg-amber-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'schedule', label: 'Schedule a call', detail: 'Book a 30-min slot',
      Icon: Calendar,
      url: contactInfo.calendly.url,
      isCalendly: true,
      accent: 'hover:border-cyan-500/50 hover:bg-cyan-500/10',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      id: 'whatsapp', label: 'WhatsApp', detail: 'Chat on WhatsApp',
      Icon: FaWhatsapp as unknown as typeof Mail,
      url: `https://wa.me/${contactInfo.phone.value.replace('+', '')}`,
      accent: 'hover:border-emerald-500/50 hover:bg-emerald-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'call', label: 'Call', detail: 'Place a call',
      Icon: Phone,
      url: `tel:${contactInfo.phone.value}`,
      accent: 'hover:border-violet-500/50 hover:bg-violet-500/10',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
  ];

  const socials = [
    { id: 'github',   label: 'GitHub',   handle: 'View profile', url: 'https://github.com/HillaryKoros',          Icon: Github,       accent: 'hover:border-foreground/40 hover:bg-foreground/5'    },
    { id: 'linkedin', label: 'LinkedIn', handle: 'View profile', url: 'https://www.linkedin.com/in/hillarykoros',  Icon: Linkedin,    accent: 'hover:border-blue-500/50 hover:bg-blue-500/10'         },
    { id: 'x',        label: 'X',        handle: 'View profile', url: 'https://x.com/Hill_Koros',                  Icon: ArrowUpRight, accent: 'hover:border-foreground/40 hover:bg-foreground/5'  },
  ];

  const handleAction = (action: ContactAction) => {
    if (action.isCalendly) {
      const w = window as WindowWithCalendly;
      if (calendlyLoaded && w.Calendly) {
        w.Calendly.initPopupWidget({
          url: `${action.url}?hide_landing_page_details=1&hide_gdpr_banner=1`,
        });
      } else {
        window.open(action.url, '_blank');
      }
    } else if (action.url.startsWith('tel:') || action.url.startsWith('mailto:')) {
      window.location.href = action.url;
    } else {
      window.open(action.url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Hero */}
      <section className="pt-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
        >
          <span className="w-6 h-px bg-amber-500/60" />
          Contact
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="text-3xl md:text-4xl lg:text-[42px] font-bold mb-4 leading-[1.1] tracking-tight"
        >
          Let's build something.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-base text-muted-foreground leading-relaxed mb-2 max-w-2xl"
        >
          Open to research positions, consulting, conference talks, and collaborations across
          climate, geospatial, hydrology, and disaster decision-support work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="inline-flex items-center gap-1.5 mt-3 px-3 py-1
                     text-base font-mono font-bold uppercase tracking-[0.14em]
                     text-emerald-700 dark:text-emerald-400
                     bg-emerald-500/10 border border-emerald-500/30 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Replies within 24 hours · Mon–Fri
        </motion.div>
      </section>

      {/* Primary actions — 4-tile grid */}
      <section>
        <div className="inline-flex items-center gap-2 mb-2 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
          <span className="w-6 h-px bg-amber-500/60" />
          Reach me
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-5 tracking-tight">
          Get in touch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((a, i) => {
            const Icon = a.Icon;
            return (
              <motion.button
                key={a.id}
                onClick={() => handleAction(a)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden flex items-center justify-between gap-4 p-4
                            rounded-xl border border-border/70 bg-card/65
                            supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
                            transition-colors duration-300 text-left
                            ${a.accent}`}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
                             bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400
                             transition-transform duration-500 ease-out
                             group-hover:scale-x-100"
                />
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-secondary/40 border border-border/40 transition-transform duration-300 group-hover:scale-110">
                    <Icon className={`w-5 h-5 ${a.iconColor}`} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-mono font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {a.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground truncate">
                      {a.detail}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Location + Socials side by side */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 group relative overflow-hidden rounded-xl border border-border/70 bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150 p-5"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 ring-1 ring-blue-500/30">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </span>
            <div>
              <div className="text-base font-mono font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Based in
              </div>
              <div className="text-sm font-semibold text-foreground">
                {contactInfo.location.value}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            EAT (UTC+3) · Open to remote and travel for work across the Horn of Africa and beyond.
          </p>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="md:col-span-3 rounded-xl border border-border/70 bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150 p-5"
        >
          <div className="text-base font-mono font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">
            Around the web
          </div>
          <div className="grid grid-cols-3 gap-2">
            {socials.map((s) => {
              const Icon = s.Icon;
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-start gap-1 rounded-lg border border-border/40 bg-secondary/30 p-3 transition-colors duration-300 ${s.accent}`}
                >
                  <Icon className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <div className="text-base font-mono font-semibold text-foreground">{s.label}</div>
                  <div className="text-base font-mono text-muted-foreground truncate w-full">{s.handle}</div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Support — proper cards with icons */}
      <section>
        <div className="inline-flex items-center gap-2 mb-2 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
          <span className="w-6 h-px bg-amber-500/60" />
          Sponsor
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">
          Support the open work
        </h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-prose">
          If the open-source tools, notebooks, or talks here have helped you, a small token goes
          straight into keeping them maintained.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              href: 'https://buymeacoffee.com/hillarykoros',
              label: 'Buy me a coffee',
              detail: 'One-off support',
              Icon: Coffee,
              tone: 'hover:border-amber-500/50 hover:bg-amber-500/10',
              iconColor: 'text-amber-600 dark:text-amber-400',
              iconBg: 'bg-amber-500/10 ring-amber-500/30',
            },
            {
              href: 'https://github.com/sponsors/HillaryKoros',
              label: 'GitHub Sponsors',
              detail: 'Monthly support',
              Icon: Heart,
              tone: 'hover:border-rose-500/50 hover:bg-rose-500/10',
              iconColor: 'text-rose-600 dark:text-rose-400',
              iconBg: 'bg-rose-500/10 ring-rose-500/30',
            },
          ].map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -2 }}
                className={`group flex items-center justify-between gap-4 p-4 rounded-xl border border-border/70
                            bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
                            transition-colors duration-300 ${s.tone}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`flex items-center justify-center w-11 h-11 rounded-lg ring-1 ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-5 h-5 ${s.iconColor}`} strokeWidth={2.25} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {s.detail}
                    </div>
                    <div className="text-sm font-semibold text-foreground truncate">
                      {s.label}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
              </motion.a>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
