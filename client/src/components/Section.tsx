import type { ReactNode } from 'react';
import { cn } from '../lib/utils';
import Reveal from './Reveal';

interface SectionProps {
  /** Mono eyebrow, e.g. "Selected work". */
  label: string;
  title?: string;
  lede?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Right-hand slot in the header row, e.g. a "View all" link. */
  action?: ReactNode;
}

/**
 * Every section on the site opens the same way: a hairline rule, a mono label,
 * then an optional title and lede. That repetition is what gives the page its
 * rhythm, so it lives in one component rather than being re-typed per page.
 */
export default function Section({
  label,
  title,
  lede,
  children,
  className,
  id,
  action,
}: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <Reveal>
        <div className="rule" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <span className="label">{label}</span>
          {action}
        </div>
        {title && <h2 className="text-title mt-3">{title}</h2>}
        {lede && <p className="text-lede text-muted-foreground mt-3 max-w-measure">{lede}</p>}
      </Reveal>
      <div className={cn(title || lede ? 'mt-8' : 'mt-6')}>{children}</div>
    </section>
  );
}
