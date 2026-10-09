import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Browsers restore scroll position on history navigation, which is right for
 * Back but wrong when following a link to a new route. Jump to the top on
 * forward navigation only.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);

  return null;
}
