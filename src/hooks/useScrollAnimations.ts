import { useEffect } from 'react';

/**
 * High-energy scroll-driven animation observer for agency website.
 * Uses Vanilla IntersectionObserver and CSS transitions for optimal 60/120fps performance.
 * Respects `prefers-reduced-motion`.
 */
export function useScrollAnimations() {
  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = document.querySelectorAll<HTMLElement>('.scroll-section');

    if (prefersReducedMotion) {
      sections.forEach((sec) => sec.classList.add('is-revealed'));
      return;
    }

    // Immediately reveal hero / first section if at top
    if (window.scrollY < 100 && sections.length > 0) {
      sections[0].classList.add('is-revealed');
      sections[0].classList.add('is-active-chapter');
    }

    // 2. Intersection Observer configured for ~40% viewport entry
    // On smaller screens where a section may exceed the viewport height,
    // we set a balanced threshold array or margin so it triggers reliably.
    const isMobile = window.innerWidth <= 768;
    const observerThreshold = isMobile ? 0.2 : 0.4;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: observerThreshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // 3. Chapter active observer for subtle background atmosphere shift
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            sections.forEach((s) => s.classList.remove('is-active-chapter'));
            entry.target.classList.add('is-active-chapter');
          }
        });
      },
      {
        threshold: [0.35, 0.6],
      }
    );

    sections.forEach((section) => {
      revealObserver.observe(section);
      chapterObserver.observe(section);
    });

    return () => {
      revealObserver.disconnect();
      chapterObserver.disconnect();
    };
  }, []);
}
