import { useReducedMotion, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger index — each step adds 50ms, capped so long lists never crawl. */
  index?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Scroll reveal.
 *
 * Two rules the previous implementation broke:
 *   1. Under `prefers-reduced-motion` the element renders plainly — no opacity
 *      animation at all, rather than an animation that is merely instant.
 *   2. `amount: 'some'` means an element counts as visible as soon as any part
 *      of it enters the viewport. The old `margin: '-50px'` required 50px of
 *      penetration, which left cards sitting at the fold half-faded.
 */
export default function Reveal({ children, index = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 6) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
