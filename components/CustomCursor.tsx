'use client';

import { useState, useEffect, useRef } from 'react';
import { useCursorPosition } from '@/hooks/useCursorPosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CustomCursor component - Dual-element cursor system
 * 
 * Features:
 * - cursor-dot (8px, forest green) - follows mouse instantly
 * - cursor-outline (40px, sage border) - follows with 500ms animation
 * - Scales to 60px with gold background on interactive element hover
 * - Hidden on mobile (below md breakpoint)
 * - Respects reduced motion preference
 */
export function CustomCursor() {
  const position = useCursorPosition();
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const outlineRef = useRef<HTMLDivElement>(null);

  // Track outline position for smooth animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Show cursor after first mouse move
    const handleFirstMove = () => {
      setIsVisible(true);
    };
    window.addEventListener('mousemove', handleFirstMove, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, []);


  // Detect hover over interactive elements
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const interactiveSelectors = 'a, button, input, textarea, .interactive, [role="button"]';

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest(interactiveSelectors)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as Element;
      const relatedTarget = event.relatedTarget as Element | null;
      
      // Only set hovering to false if we're not moving to another interactive element
      if (target.closest(interactiveSelectors) && 
          (!relatedTarget || !relatedTarget.closest(interactiveSelectors))) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Don't render on server or if not visible yet
  if (!isVisible) {
    return null;
  }

  // Calculate outline position with animation delay (handled via CSS transition)
  const dotStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -50%)',
  };

  const outlineStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
    transition: 'left 500ms ease-out, top 500ms ease-out, transform 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out',
  };

  return (
    <>
      {/* Cursor Dot - 8px, forest green, instant follow */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={dotStyle}
        aria-hidden="true"
      >
        <div 
          className="w-2 h-2 bg-forest rounded-full"
          style={{ 
            transition: prefersReducedMotion ? 'none' : 'transform 100ms ease-out' 
          }}
        />
      </div>

      {/* Cursor Outline - 40px (60px on hover), sage border, 500ms animation */}
      <div
        ref={outlineRef}
        className={`fixed pointer-events-none z-[9998] hidden md:block w-10 h-10 rounded-full border-2 ${
          isHovering 
            ? 'border-gold bg-gold/20' 
            : 'border-sage bg-transparent'
        }`}
        style={outlineStyle}
        aria-hidden="true"
      />
    </>
  );
}
