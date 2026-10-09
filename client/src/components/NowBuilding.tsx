import { nowBuilding } from '../data/focus';
import { icon } from '../lib/icons';
import Reveal from './Reveal';

export default function NowBuilding() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
      {nowBuilding.map((item, i) => {
        const Icon = icon(item.icon);
        return (
          <Reveal as="li" key={item.title} index={i} className="bg-surface p-6">
            <div className="flex items-start gap-4">
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                strokeWidth={1.75}
                aria-hidden
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-[1.05rem] font-semibold">{item.title}</h3>
                  {item.state === 'active' && (
                    <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary">
                      Current focus
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
