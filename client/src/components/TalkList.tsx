import { talks } from '../data/talks';
import { site } from '../data/site';
import Reveal from './Reveal';
import { ExternalLink } from './primitives';

export default function TalkList({ limit }: { limit?: number }) {
  const shown = limit ? talks.slice(0, limit) : talks;

  return (
    <ol className="divide-y divide-border border-y border-border">
      {shown.map((talk, i) => {
        const presenting = talk.role === 'presenting';
        return (
          <Reveal as="li" key={talk.id} index={i} className="py-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={
                  presenting
                    ? 'font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary'
                    : 'font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-faint-foreground'
                }
              >
                {presenting ? 'Presenting author' : 'Co-author'}
              </span>
              <span className="font-mono text-[0.8rem] text-faint-foreground">
                {talk.venue}
                {talk.location && ` · ${talk.location}`} · {talk.date}
              </span>
            </div>

            <h3 className="mt-2.5 text-[1.15rem] font-semibold leading-snug">{talk.title}</h3>

            {talk.session && (
              <p className="mt-1 font-mono text-[0.8rem] text-faint-foreground">
                Session {talk.session}
              </p>
            )}

            <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted-foreground">
              {talk.summary}
            </p>

            <p className="mt-3 text-[0.88rem] leading-relaxed text-faint-foreground">
              {talk.authors.map((author, idx) => (
                <span key={author}>
                  <span className={author === site.name ? 'font-semibold text-foreground' : undefined}>
                    {author}
                  </span>
                  {idx < talk.authors.length - 1 && ', '}
                </span>
              ))}
            </p>

            {(talk.abstractUrl || talk.slidesUrl || talk.recordingUrl) && (
              <div className="mt-4 flex flex-wrap gap-5 text-sm">
                {talk.abstractUrl && <ExternalLink href={talk.abstractUrl}>Abstract</ExternalLink>}
                {talk.slidesUrl && <ExternalLink href={talk.slidesUrl}>Slides</ExternalLink>}
                {talk.recordingUrl && <ExternalLink href={talk.recordingUrl}>Recording</ExternalLink>}
              </div>
            )}
          </Reveal>
        );
      })}
    </ol>
  );
}
