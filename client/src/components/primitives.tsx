import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Project } from '../data/projects';

/* ------------------------------------------------------------------ status */

const STATUS_LABEL: Record<Project['status'], string> = {
  operational: 'Operational',
  ongoing: 'Ongoing',
  completed: 'Completed',
  planned: 'Planned',
};

/**
 * Status is the only place colour carries meaning on this site, so each hue is
 * also paired with its label — colour is never the sole signal.
 */
export function StatusChip({ status, className }: { status: Project['status']; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.12em]',
        className,
      )}
      style={{ color: `hsl(var(--status-${status}))` }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: `hsl(var(--status-${status}))` }}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

/* -------------------------------------------------------------------- card */

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface',
        interactive &&
          'transition-colors duration-200 hover:border-border-strong focus-within:border-border-strong',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- chips */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-surface-sunken px-2 py-0.5 font-mono text-[0.8rem] text-muted-foreground">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------- links */

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  /** Hide the arrow glyph when the link already sits in an obvious affordance. */
  bare?: boolean;
};

export function ExternalLink({ children, className, bare, ...rest }: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline',
        className,
      )}
      {...rest}
    >
      {children}
      {!bare && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
    </a>
  );
}

/* ----------------------------------------------------------------- buttons */

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-200';

export const buttonStyles = {
  primary: cn(BUTTON_BASE, 'bg-primary text-primary-foreground hover:bg-primary-hover'),
  secondary: cn(
    BUTTON_BASE,
    'border border-border-strong bg-surface text-foreground hover:bg-surface-sunken',
  ),
  ghost: cn(BUTTON_BASE, 'text-muted-foreground hover:bg-surface-sunken hover:text-foreground'),
};

/* -------------------------------------------------------------- availability */

export function AvailabilityDot({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-status-operational',
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-status-operational" />
      {label}
    </span>
  );
}
