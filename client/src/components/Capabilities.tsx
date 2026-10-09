import { capabilities } from '../data/focus';
import { icon } from '../lib/icons';
import Reveal from './Reveal';

export default function Capabilities() {
  return (
    <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((cap, i) => {
        const Icon = icon(cap.icon);
        return (
          <Reveal as="li" key={cap.title} index={i}>
            <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-4 text-[1.05rem] font-semibold">{cap.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}
