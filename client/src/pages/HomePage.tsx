import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { techCount } from '../data/technologies';
import Hero from '../components/Hero';
import Profile from '../components/Profile';
import Organisations from '../components/Organisations';
import Section from '../components/Section';
import NowBuilding from '../components/NowBuilding';
import ImpactStats from '../components/ImpactStats';
import Capabilities from '../components/Capabilities';
import StackGrid from '../components/StackGrid';
import TalkList from '../components/TalkList';
import ExperienceList from '../components/ExperienceList';
import WorkCard from '../components/WorkCard';
import ContactBanner from '../components/ContactBanner';

const FEATURED = ['east-africa-flood-watch', 'grib-index-kerchunk', 'etl-utility-package'];

export default function HomePage() {
  useSeo({
    title: 'Home',
    description: site.summary,
    path: '/',
  });

  const featured = FEATURED.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <>
      <Hero />
      <Organisations />

      <div className="container space-y-20 py-20 lg:space-y-24">
        <Section label="Profile" title="About">
          <Profile />
        </Section>

        <Section
          label="Impact"
          title="Impact across organisations"
          lede="Not all of it at ICPAC. The work spans a regional climate centre, a county
                government, a medical research programme and open-source tooling."
        >
          <ImpactStats />
        </Section>

        <Section
          label="Selected work"
          title="Selected work"
          lede="Systems used by governments, county authorities, research programmes and NGOs — operational platforms, open-source tooling and applied research."
          action={
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              All work
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <WorkCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </Section>

        <Section
          label="In progress"
          title="Current work"
          lede="Systems and tooling under active development."
        >
          <NowBuilding />
        </Section>

        <Section
          label="Practice"
          title="Capabilities"
          lede="What I bring to operational climate-services work."
        >
          <Capabilities />
        </Section>

        <Section
          label="Research"
          title="Talks & publications"
          lede="Conference presentations and selected writing on operational geospatial systems."
        >
          <TalkList />
        </Section>

        <Section
          label="Career"
          title="Experience"
          lede="Nine years across climate services, medical research, county government and the private sector."
        >
          <ExperienceList />
        </Section>

        <Section
          label="Tooling"
          title="Tools & technologies"
          lede={`${techCount} tools spanning spatial computing, hydroinformatics, ML pipelines and cloud-native infrastructure — the operational stack behind regional early-warning platforms.`}
        >
          <StackGrid />
        </Section>

        <Section label="Languages" title="Languages I work in">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
            {site.languages.map((lang) => (
              <li key={lang.code} className="flex items-baseline gap-4">
                <span className="font-mono text-[0.82rem] font-semibold tracking-[0.14em] text-primary">
                  {lang.code}
                </span>
                <span>
                  <span className="block text-[1.05rem] font-semibold">{lang.name}</span>
                  <span className="block text-sm text-muted-foreground">{lang.level}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <ContactBanner />
    </>
  );
}
