'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor component - High-performance dual-element cursor
 * 
 * Uses requestAnimationFrame + direct DOM manipulation instead of React state
 * to avoid ~60 re-renders/sec. The dot follows instantly via mousemove,
 * and the outline lerps toward the dot position each frame.
 * 
 * Hidden on mobile (below md breakpoint).
 * 
 * ============================================================================
 * ⚠️ CRITICAL HYDRATION & CSS PREVENTION WARNING ⚠️
 * ============================================================================
 * DO NOT USE `<style jsx>` tags inside this component (or conditionally render them).
 * Next.js App Router strongly dislikes dynamically injected JSX styles inside 
 * Client Components, especially when conditionally returned based on state or 
 * mounted status. It causes severe hydration mismatches that wipe out the entire
 * page's CSS, resulting in bare unstyled HTML (404 for layout.css).
 * 
 * All CSS for this component MUST be kept in `app/globals.css`.
 * ============================================================================
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const rafId = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't run on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const interactiveSelectors = 'a, button, input, textarea, .interactive, [role="button"]';

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Move dot instantly (no React re-render)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(interactiveSelectors)) {
        isHovering.current = true;
        if (outlineRef.current) {
          outlineRef.current.classList.add('cursor-hover');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      const relatedTarget = e.relatedTarget as Element | null;
      if (target.closest(interactiveSelectors) &&
          (!relatedTarget || !relatedTarget.closest(interactiveSelectors))) {
        isHovering.current = false;
        if (outlineRef.current) {
          outlineRef.current.classList.remove('cursor-hover');
        }
      }
    };

    // Smooth outline follow loop
    const animate = () => {
      const lerp = 0.12; // Lower = smoother trail
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * lerp;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * lerp;

      if (outlineRef.current) {
        const scale = isHovering.current ? 1.5 : 1;
        outlineRef.current.style.transform = `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px) translate(-50%, -50%) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        aria-hidden="true"
      >
        <div className="w-2 h-2 bg-forest rounded-full" />
      </div>

      {/* Cursor Outline */}
      <div
        ref={outlineRef}
        className="cursor-outline hidden md:block"
        aria-hidden="true"
      />
    </>
  );
}
