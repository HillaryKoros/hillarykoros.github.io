import { Link } from 'wouter';
import { ArrowRight, FileText, MapPin } from 'lucide-react';
import { site } from '../data/site';
import RotatingRole from './RotatingRole';
import { buttonStyles, AvailabilityDot } from './primitives';

export default function Hero() {
  return (
    <section className="border-b border-border">
      <div className="container grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-20 lg:py-20">
        <div className="animate-fade-up">
          <p className="label">
            {site.engagement} · {site.org.name} · Greater Horn of Africa
          </p>

          <h1 className="text-display mt-5 max-w-[17ch]">{site.tagline}</h1>

          <p className="mt-5 text-[1.15rem] font-semibold tracking-[-0.015em]">
            <RotatingRole />
          </p>

          <p className="text-lede mt-5 max-w-measure text-muted-foreground">{site.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/work" className={buttonStyles.primary}>
              View the work
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.secondary}
            >
              <FileText className="h-4 w-4" aria-hidden />
              Download CV
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {site.available && <AvailabilityDot label="Open for collaborations" />}
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-faint-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {site.location.city}, {site.location.countryCode}
            </span>
          </div>
        </div>

        {/*
          Fixed-width column so the portrait and the caption under it share one
          left and right edge — previously the caption ran wider than the image
          and the block read as ragged.
        */}
        <figure className="order-first w-28 lg:order-last lg:w-56">
          <img
            src="/assets/avatar.jpg"
            alt={site.name}
            width={224}
            height={272}
            loading="eager"
            className="aspect-[4/5] w-full rounded-lg border border-border object-cover object-top"
          />
          <figcaption className="mt-4 hidden lg:block">
            <p className="text-sm font-medium leading-snug">{site.role}</p>
            <p className="mt-1 font-mono text-[0.8rem] leading-relaxed text-faint-foreground">
              {site.engagement} · {site.org.name}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
