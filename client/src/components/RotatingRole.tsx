import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { site } from '../data/site';

/** Milliseconds per character, and how long a finished line is held. */
const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1900;
const BEFORE_NEXT_MS = 350;

/**
 * Types each entry of `site.roles` out character by character, holds it, then
 * deletes it and moves to the next.
 *
 * This replaced a cross-fade, which worked but was too quiet to read as an
 * effect at all. The caret is what makes it legible as typing rather than as
 * text that happens to change.
 *
 * Accessibility: the whole animation is aria-hidden and the canonical
 * `site.role` is exposed once in a visually hidden span, so a screen reader
 * announces the role a single time instead of on every keystroke. Under
 * prefers-reduced-motion nothing animates — the canonical role is shown
 * outright.
 */
export default function RotatingRole() {
  const reduced = useReducedMotion();
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    if (reduced) return;

    const full = site.roles[roleIndex];

    // Finished typing: hold, then start deleting.
    if (!deleting && text === full) {
      timer.current = window.setTimeout(() => setDeleting(true), HOLD_MS);
      return () => window.clearTimeout(timer.current);
    }

    // Finished deleting: advance to the next role.
    if (deleting && text === '') {
      timer.current = window.setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % site.roles.length);
      }, BEFORE_NEXT_MS);
      return () => window.clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(
      () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => window.clearTimeout(timer.current);
  }, [text, deleting, roleIndex, reduced]);

  if (reduced) {
    return <span className="text-primary">{site.role}</span>;
  }

  return (
    <>
      <span className="sr-only">{site.role}</span>
      <span aria-hidden className="text-primary">
        {text}
        <span className="ml-0.5 inline-block w-[0.11em] translate-y-[0.1em] self-stretch bg-primary align-middle [animation:caret_1.05s_steps(1)_infinite] h-[1.05em]" />
      </span>
    </>
  );
}
