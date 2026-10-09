import { impact } from '../data/focus';
import Reveal from './Reveal';
import { cn } from '../lib/utils';

/**
 * Figures render at their real value from the first frame. An earlier version
 * counted up from zero, which meant the band spent about a second showing
 * numbers that were untrue — a glance could catch "2 IGAD member states".
 */
export default function ImpactStats() {
  return (
    <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
      {impact.map((stat, i) => (
        <Reveal key={stat.label} index={i} className="px-6 py-8 first:pl-0 lg:last:pr-0">
          <dd
            className={cn(
              'font-semibold leading-none tracking-[-0.03em] tabular-nums',
              // A worded measure needs to sit on one line beside the numerals.
              stat.display ? 'text-[1.85rem]' : 'text-[2.6rem]',
            )}
          >
            {stat.display ?? stat.value?.toLocaleString('en-US')}
            {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
          </dd>
          <dt className="mt-4">
            <span className="block text-sm font-medium">{stat.label}</span>
            {/* Naming the organisation is the point of this band. */}
            <span className="mt-1.5 block font-mono text-[0.78rem] uppercase tracking-[0.1em] text-primary">
              {stat.org}
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
              {stat.note}
            </span>
          </dt>
        </Reveal>
      ))}
    </dl>
  );
}
