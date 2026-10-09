import type { Config } from 'tailwindcss';

/**
 * Colours are all token-backed (see client/src/index.css) so a component never
 * writes a raw hue and never needs a `dark:` variant just to stay legible.
 */
export default {
  darkMode: ['class'],
  content: ['./client/index.html', './client/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          sunken: 'hsl(var(--surface-sunken))',
        },
        foreground: 'hsl(var(--foreground))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        'faint-foreground': 'hsl(var(--faint-foreground))',
        border: {
          DEFAULT: 'hsl(var(--border))',
          strong: 'hsl(var(--border-strong))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          foreground: 'hsl(var(--primary-foreground))',
          soft: 'hsl(var(--primary-soft))',
        },
        status: {
          operational: 'hsl(var(--status-operational))',
          ongoing: 'hsl(var(--status-ongoing))',
          completed: 'hsl(var(--status-completed))',
          planned: 'hsl(var(--status-planned))',
        },
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        // Body copy: `text-sm` is used for most descriptive text, so it is
        // nudged up from Tailwind's 0.875rem rather than swapped per file.
        sm: ['0.9375rem', { lineHeight: '1.6' }],
        base: ['1.0625rem', { lineHeight: '1.65' }],
        // Display scale — tight leading, balanced for long technical headings
        'display': ['clamp(2.3rem, 1.4rem + 3.6vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'title':   ['clamp(1.75rem, 1.3rem + 1.7vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'heading': ['1.4rem', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        'lede':    ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.65' }],
      },
      maxWidth: {
        measure: '68ch',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config;
