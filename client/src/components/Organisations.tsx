import { organisations } from '../data/experience';
import Reveal from './Reveal';

/**
 * A plain roll-call of employers, derived from `experience.ts` so it can never
 * fall out of step with the timeline further down the page. It sits directly
 * under the hero because the current posting alone gave a misleading picture
 * of the range of the work.
 */
export default function Organisations() {
  return (
    <Reveal className="border-b border-border">
      <div className="container flex flex-wrap items-center gap-x-8 gap-y-3 py-6">
        <span className="label shrink-0">Worked with</span>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {organisations.map((org) => (
            <li
              key={org.id}
              className="font-mono text-[0.82rem] font-medium tracking-tight text-muted-foreground"
            >
              {org.name}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
