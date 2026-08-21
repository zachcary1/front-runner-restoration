import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Keeps navigation feeling right in an SPA: jumps to the top on a plain
 * route change, or scrolls to the matching element when the URL carries
 * a #hash (e.g. Link to="/#contact" from a different page).
 */
export default function useScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
}
