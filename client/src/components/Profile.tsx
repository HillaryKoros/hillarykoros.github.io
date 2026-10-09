import { site } from '../data/site';
import Reveal from './Reveal';

/**
 * The professional statement.
 *
 * The rebuilt site had no bio at all — a hero line, then straight into cards.
 * A reader deciding whether to engage someone needs a few paragraphs of
 * substance, and its absence is conspicuous on a senior profile.
 */
export default function Profile() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
      <Reveal>
        <div className="space-y-5">
          {site.profile.map((para) => (
            <p key={para.slice(0, 40)} className="max-w-measure text-lede text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal index={1}>
        <p className="label">Delivered with</p>
        <ul className="mt-4 space-y-2.5">
          {site.collaborators.map((c) => (
            <li key={c} className="text-sm text-muted-foreground">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
