import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Waves,
  Activity,
  BrainCircuit,
  Cloud,
  Satellite,
  Database,
  FileText,
  LucideIcon
} from 'lucide-react';

const CV_URL = "https://drive.google.com/file/d/191QzSUJbrNyoMm7ISvMVnwlzWGD0av1P/view";
import TechGrid from '../components/TechGrid';
import { humanLanguages } from '../data/skills';
import { talks } from '../data/talks';
import { experience } from '../data/experience';

interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: { fg: string; bg: string; ring: string };
}

const capabilities: Capability[] = [
  {
    title: 'Flood Early Warning Systems',
    description: 'Operational regional early-warning infrastructure — gauge networks, alerts, and forecaster-facing decision tools.',
    icon: Waves,
    accent: { fg: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', ring: 'ring-blue-500/20' }
  },
  {
    title: 'Flood Hydroinformatics',
    description: 'Multi-model hydrological forecasting and ensemble pipelines — FloodPROOFS, GeoSFM, MIKE Hydro, HYPE, GEOGloWS, and Google AI Flood Forecasting (Flood Hub).',
    icon: Activity,
    accent: { fg: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10', ring: 'ring-sky-500/20' }
  },
  {
    title: 'AI/ML for Hydroclimatic Forecasting',
    description: 'ML pipelines for forecast skill enhancement, AIFS-class inference at regional scale, and explainable models for decision support.',
    icon: BrainCircuit,
    accent: { fg: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', ring: 'ring-purple-500/20' }
  },
  {
    title: 'Cloud-Native Geospatial',
    description: 'Zarr v3 + VirtualiZarr / Kerchunk / Icechunk over GRIB and NetCDF — lazy reads of global NWP archives from object storage.',
    icon: Cloud,
    accent: { fg: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/20' }
  },
  {
    title: 'Satellite Earth Observation',
    description: 'Sentinel / Landsat / GEE workflows for flood mapping, vegetation, and environmental covariate generation.',
    icon: Satellite,
    accent: { fg: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', ring: 'ring-green-500/20' }
  },
  {
    title: 'Spatial Data Infrastructure & DevOps',
    description: 'PostGIS, FastAPI, Docker, GCP — productionising spatial pipelines with reproducible deployments and CI/CD.',
    icon: Database,
    accent: { fg: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', ring: 'ring-orange-500/20' }
  }
];

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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          About Me
        </h1>
        <p className="text-sm font-medium text-primary mb-4">
          GIS Researcher &amp; Engineer · IGAD Climate Prediction &amp; Applications Centre (ICPAC)
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          I work at the intersection of Earth observation, hydroinformatics, and climate decision-support
          systems. At ICPAC I lead engineering on the East Africa Flood Watch System for the Greater Horn
          of Africa — currently building its multi-model flood ensemble. My initial ICPAC mandate was the
          operational transfer of FloodPROOFS East Africa from CIMA, which the Flood Watch now builds on.
          Earlier work spans predictive spatial health systems at KEMRI–Wellcome, ML for spatial analysis,
          and county-level GIS.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Research interests: AI/ML for hydroclimatic and flood forecasting; flood hydroinformatics;
          satellite Earth observation for flood early warning; cloud-native architecture and DevOps for
          operational geospatial systems.
        </p>

        {/* Skill Tags — keyed off current research interests */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'AI / ML for Hydroclimatic Forecasting', color: 'bg-purple-500/10 text-purple-600 border-purple-500/30' },
            { label: 'Flood Hydroinformatics', color: 'bg-sky-500/10 text-sky-600 border-sky-500/30' },
            { label: 'Flood Early Warning', color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
            { label: 'Satellite Earth Observation', color: 'bg-green-500/10 text-green-600 border-green-500/30' },
            { label: 'Cloud-Native Architecture', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30' },
            { label: 'DevOps for Operational Systems', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' },
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

      {/* Talks & Publications */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Talks &amp; Publications
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Conference presentations and selected writing on operational geospatial systems.
        </p>

        <div className="space-y-4">
          {talks.map((talk, index) => {
            const isPresenting = talk.role === 'presenting';
            const roleLabel = isPresenting ? 'Presenting Author' : 'Co-author';
            const roleClass = isPresenting
              ? 'bg-primary/10 text-primary border-primary/20'
              : 'bg-secondary text-muted-foreground border-border';
            return (
              <motion.article
                key={talk.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${
                  isPresenting ? 'border-primary/40' : 'border-border'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide border ${roleClass}`}>
                    {roleLabel}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {talk.venue}{talk.location ? ` · ${talk.location}` : ''} · {talk.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{talk.title}</h3>
                {talk.session && (
                  <p className="text-xs font-medium text-muted-foreground mb-2">Session: {talk.session}</p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{talk.summary}</p>
                <p className="text-xs text-muted-foreground/80 mb-3">
                  <span className="font-semibold text-muted-foreground">Authors: </span>
                  {talk.authors.map((author, i) => {
                    const isMe = author === 'Hillary Koros';
                    return (
                      <span key={i}>
                        <span className={isMe ? 'font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-2' : ''}>
                          {author}
                        </span>
                        {i < talk.authors.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {talk.abstractUrl && (
                    <a
                      href={talk.abstractUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      Abstract <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {talk.slidesUrl && (
                    <a
                      href={talk.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      Slides <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {talk.recordingUrl && (
                    <a
                      href={talk.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      Recording <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Experience
          </h2>
          <motion.a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/40 hover:shadow-lg hover:shadow-primary/40 transition-shadow"
          >
            <FileText className="w-4 h-4" />
            Download CV
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </motion.a>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          A short overview — see the CV for full responsibilities and outputs.
        </p>

        <div className="relative">
          <div className="absolute left-2 top-1.5 bottom-1.5 w-0.5 bg-border" aria-hidden="true" />
          <ol className="space-y-3">
            {experience.map((role, index) => (
              <motion.li
                key={role.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="relative pl-7"
              >
                <span
                  className={`absolute left-0.5 top-1.5 w-3 h-3 rounded-full border-2 ${
                    role.current
                      ? 'bg-primary border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]'
                      : 'bg-background border-border'
                  }`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {role.title}
                    <span className="font-normal text-muted-foreground"> · {role.organization}</span>
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {role.start} – {role.end}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{role.summary}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* What I Do */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          What I Do
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          The capabilities I bring to operational climate-services work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="bg-card border border-border rounded-xl p-4 hover:border-border/80 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${cap.accent.bg} ring-1 ${cap.accent.ring}`}>
                    <Icon className={`w-4 h-4 ${cap.accent.fg}`} strokeWidth={2.25} />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{cap.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Languages */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Languages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          Technologies &amp; Tools
        </h2>
        <TechGrid />
      </section>
    </motion.div>
  );
};

export default AboutPage;
