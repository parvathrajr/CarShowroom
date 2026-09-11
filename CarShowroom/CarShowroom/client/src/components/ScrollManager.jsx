import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scroll behaviour across route changes:
 * - If the URL has a #hash, smooth-scroll to that section (once rendered).
 * - Otherwise scroll to top on navigation.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // wait a tick so the target section is in the DOM
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
