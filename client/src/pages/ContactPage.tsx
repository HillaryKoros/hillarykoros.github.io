import { Calendar, Github, Linkedin, Mail, MessageCircle, Phone, Youtube, type LucideIcon } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { site, actions } from '../data/site';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import LocationCard from '../components/LocationCard';
import { AvailabilityDot } from '../components/primitives';

interface Channel {
  id: string;
  label: string;
  detail: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

const channels: Channel[] = [
  { id: 'email',    label: 'Email',        detail: site.email,         href: actions.mailto,       icon: Mail },
  { id: 'whatsapp', label: 'WhatsApp',     detail: site.phone,         href: actions.whatsapp,     icon: MessageCircle, external: true },
  { id: 'call',     label: 'Call',         detail: site.phone,         href: actions.tel,          icon: Phone },
  { id: 'schedule', label: 'Book a call',  detail: '30-minute slot',   href: site.calendlyUrl,     icon: Calendar,      external: true },
];

const SOCIAL_ICON: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  x: MessageCircle,
};

export default function ContactPage() {
  useSeo({
    title: 'Contact',
    description: `${site.availableFor} Reach ${site.name} by email, WhatsApp or book a call.`,
    path: '/contact',
  });

  return (
    <div className="container py-16 lg:py-20">
      <header>
        <p className="label">Contact</p>
        <h1 className="text-display mt-5 max-w-[16ch]">Get in touch.</h1>
        <p className="text-lede mt-6 max-w-measure text-muted-foreground">{site.availableFor}</p>
        {site.available && <AvailabilityDot label="Replies within 24 hours · Mon–Fri" className="mt-6" />}
      </header>

      <div className="mt-16 space-y-16">
        <Section label="Direct">
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal as="li" key={c.id} index={i} className="bg-surface">
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-4 p-6 transition-colors hover:bg-surface-sunken"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-[1.05rem] font-semibold">{c.label}</span>
                      <span className="block truncate font-mono text-[0.85rem] text-muted-foreground">
                        {c.detail}
                      </span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </Section>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Section label="Based in">
            <LocationCard />
          </Section>

          <Section label="Elsewhere">
            <ul className="space-y-4">
              {site.socials.map((s) => {
                const Icon = SOCIAL_ICON[s.id] ?? Github;
                return (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3"
                    >
                      <Icon
                        className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className="font-mono text-[0.85rem] text-faint-foreground">
                        {s.handle}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>

      </div>
    </div>
  );
}
