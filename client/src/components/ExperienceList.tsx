import { experience } from '../data/experience';
import Reveal from './Reveal';

export default function ExperienceList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {experience.map((role, i) => (
        <Reveal as="li" key={role.id} index={i} className="py-7">
          <div className="grid gap-x-10 gap-y-2 md:grid-cols-[10rem_minmax(0,1fr)]">
            <p className="font-mono text-[0.8rem] text-faint-foreground md:pt-1">
              {role.start} – {role.end}
              {role.current && (
                <span className="ml-2 inline-flex items-center gap-1.5 text-status-operational">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-status-operational" />
                  Current
                </span>
              )}
            </p>

            <div className="min-w-0">
              <h3 className="text-[1.15rem] font-semibold leading-snug">{role.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {role.organization}
                {role.location && ` · ${role.location}`}
              </p>

              {/* Full sentences — the old timeline clipped these mid-word. */}
              <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted-foreground">
                {role.summary}
              </p>

              {detailed && (
                <ul className="mt-4 space-y-2">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative max-w-measure pl-5 text-sm leading-relaxed text-muted-foreground
                                 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1
                                 before:rounded-full before:bg-border-strong"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
