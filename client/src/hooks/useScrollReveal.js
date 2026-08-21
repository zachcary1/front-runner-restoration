import { useEffect } from 'react';

/**
 * Adds a one-time `.is-visible` class to each `.reveal` element as it enters
 * the viewport. Kept intentionally simple/subtle per design direction —
 * this is a corporate, confident site, not a flashy one.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
