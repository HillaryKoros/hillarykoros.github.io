import { Link } from 'wouter';
import { ArrowRight, Mail } from 'lucide-react';
import { site, actions } from '../data/site';
import { buttonStyles } from './primitives';

export default function ContactBanner() {
  return (
    <section className="border-t border-border bg-surface-sunken">
      <div className="container flex flex-wrap items-center justify-between gap-8 py-16">
        <div>
          <h2 className="text-title">Work with me</h2>
          <p className="mt-3 max-w-measure text-lede text-muted-foreground">
            {site.availableFor}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={actions.mailto} className={buttonStyles.primary}>
            <Mail className="h-4 w-4" aria-hidden />
            Email me
          </a>
          <Link href="/contact" className={buttonStyles.secondary}>
            Contact
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
