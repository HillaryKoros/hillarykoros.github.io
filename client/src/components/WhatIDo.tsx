import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Activity, BrainCircuit, Cloud, Satellite, Database, type LucideIcon } from 'lucide-react';

interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: { fg: string; bg: string; ring: string };
}

const CAPABILITIES: Capability[] = [
  {
    title: 'Flood Early Warning',
    description: 'Operational regional early-warning infrastructure — gauge networks, alerts, and forecaster-facing decision tools.',
    icon: Waves,
    accent: { fg: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', ring: 'ring-blue-500/30' },
  },
  {
    title: 'Flood Hydroinformatics',
    description: 'Multi-model hydrological forecasting and ensemble pipelines — FloodPROOFS · GeoSFM · MIKE Hydro · HYPE · GEOGloWS · Google Flood Hub.',
    icon: Activity,
    accent: { fg: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10', ring: 'ring-sky-500/30' },
  },
  {
    title: 'AI/ML for Hydroclimatic Forecasting',
    description: 'ML pipelines for forecast skill enhancement, AIFS-class inference at regional scale, and explainable models for decision support.',
    icon: BrainCircuit,
    accent: { fg: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', ring: 'ring-purple-500/30' },
  },
  {
    title: 'Cloud-Native Geospatial',
    description: 'Zarr v3 + VirtualiZarr / Kerchunk / Icechunk over GRIB and NetCDF — lazy reads of global NWP archives from object storage.',
    icon: Cloud,
    accent: { fg: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/30' },
  },
  {
    title: 'Satellite Earth Observation',
    description: 'Sentinel / Landsat / GEE workflows for flood mapping, vegetation, and environmental covariate generation.',
    icon: Satellite,
    accent: { fg: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', ring: 'ring-green-500/30' },
  },
  {
    title: 'SDI & DevOps',
    description: 'PostGIS, FastAPI, Docker, GCP — productionising spatial pipelines with reproducible deployments and CI/CD.',
    icon: Database,
    accent: { fg: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', ring: 'ring-orange-500/30' },
  },
];

const WhatIDo: React.FC = () => {
  return (
    <section className="relative py-6">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
      >
        <span className="w-6 h-px bg-amber-500/60" />
        Capabilities
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
      >
        What I Do
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.10 }}
        className="text-sm text-muted-foreground mb-8 max-w-prose"
      >
        The capabilities I bring to operational climate-services work.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAPABILITIES.map((cap, index) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="
                group relative overflow-hidden rounded-xl border border-border/70
                bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
                p-5
                transition-[border-color,box-shadow,background-color] duration-300
                hover:border-border hover:bg-card/85 hover:shadow-lg
              "
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
                           bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400
                           transition-transform duration-500 ease-out
                           group-hover:scale-x-100"
              />
              <div className="relative flex items-center gap-3 mb-3">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${cap.accent.bg} ring-1 ${cap.accent.ring} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`w-5 h-5 ${cap.accent.fg}`} strokeWidth={2.25} />
                </span>
                <h3 className="text-base font-bold text-foreground tracking-tight">{cap.title}</h3>
              </div>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatIDo;
