/**
 * Theme.
 *
 * The previous build force-wrote `theme=light` on every load, so a visitor's
 * choice never survived a refresh and `prefers-color-scheme` was ignored.
 * Resolution order is now: stored choice -> system preference -> light. The
 * class is applied by an inline script in index.html before first paint, so
 * there is no flash; this module only keeps React in sync with it.
 */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function currentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode — the class is still applied for this session */
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

/** Subscribe helper for `useSyncExternalStore`. */
export function subscribeTheme(onChange: () => void): () => void {
  window.addEventListener('themechange', onChange);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystem = () => {
    // Only follow the system when the visitor has not made an explicit choice.
    if (readStoredTheme() === null) {
      applyTheme(systemTheme());
    }
  };
  media.addEventListener('change', onSystem);
  return () => {
    window.removeEventListener('themechange', onChange);
    media.removeEventListener('change', onSystem);
  };
}
