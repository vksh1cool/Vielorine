'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { ScrollProgress } from '@/lib/types';
import { treeThresholds } from '@/lib/constants';

/**
 * Determines the current phase based on scroll progress.
 * @param progress - Scroll progress value between 0 and 1
 * @returns The current phase of the tree animation
 */
export function getPhaseFromProgress(progress: number): ScrollProgress['phase'] {
  if (progress >= treeThresholds.textOverlay) {
    return 'complete';
  }
  if (progress >= treeThresholds.nodesFadeIn) {
    return 'connection';
  }
  if (progress >= treeThresholds.rootsFadeIn) {
    return 'growth';
  }
  return 'roots';
}

/**
 * Calculates scroll progress (0-1) within a section.
 * @param scrollTop - Current scroll position
 * @param sectionTop - Top position of the section
 * @param sectionHeight - Total height of the section
 * @param viewportHeight - Height of the viewport
 * @returns Progress value clamped between 0 and 1
 */
export function calculateScrollProgress(
  scrollTop: number,
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): number {
  // Calculate how far we've scrolled into the section
  const scrollIntoSection = scrollTop - sectionTop;
  // The scrollable distance is section height minus viewport (since sticky takes one viewport)
  const scrollableDistance = sectionHeight - viewportHeight;
  
  if (scrollableDistance <= 0) return 0;
  
  const progress = scrollIntoSection / scrollableDistance;
  return Math.max(0, Math.min(1, progress));
}

/**
 * Hook that calculates scroll progress within a section using IntersectionObserver
 * and scroll position tracking.
 * 
 * @param sectionRef - Reference to the section element to track
 * @returns ScrollProgress object with progress (0-1) and current phase
 */
export function useScrollProgress(sectionRef: RefObject<HTMLElement | null>): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    phase: 'roots',
  });
  const [isInView, setIsInView] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return;

    // Set up IntersectionObserver to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  useEffect(() => {
    if (!isInView || typeof window === 'undefined') return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        const progress = calculateScrollProgress(
          scrollTop,
          sectionTop,
          sectionHeight,
          viewportHeight
        );

        const phase = getPhaseFromProgress(progress);

        setScrollProgress({ progress, phase });
      });
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, sectionRef]);

  return scrollProgress;
}
