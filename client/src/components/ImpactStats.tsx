import { impact } from '../data/focus';
import Reveal from './Reveal';

/**
 * Figures are rendered at their real value from the first frame.
 *
 * An earlier version counted up from zero on scroll, which meant the band
 * spent about a second showing numbers that were simply untrue — a glance, or
 * a screenshot, could catch "2 IGAD member states". A tween is not worth
 * misstating the work. The section still fades in with everything else.
 */
export default function ImpactStats() {
  return (
    <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
      {impact.map((stat, i) => (
        <Reveal key={stat.label} index={i} className="px-6 py-8 first:pl-0 lg:last:pr-0">
          <dd className="text-[2.6rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">
            {stat.value.toLocaleString('en-US')}
            {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
          </dd>
          <dt className="mt-3">
            <span className="block text-sm font-medium">{stat.label}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
              {stat.note}
            </span>
          </dt>
        </Reveal>
      ))}
    </dl>
  );
}
