'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import TreeSVG from './TreeSVG';
import NodePopup from './NodePopup';
import { fruitContent, wisdomQuotes } from '@/lib/data/treePaths';
import { colors, SCROLL_CONFIG } from '@/lib/constants';

// Legacy exports for backward compatibility with existing tests
export function calculateTreeRotation(progress: number): number {
  return (progress - 0.5) * 30;
}

export function calculateTextOverlayOpacity(progress: number): number {
  if (progress <= 0.85) return 0;
  return Math.min(1, (progress - 0.85) / 0.15);
}

export function calculateTextOverlayTranslateY(progress: number): number {
  if (progress <= 0.85) return 32;
  const fadeProgress = Math.min(1, (progress - 0.85) / 0.15);
  return 32 * (1 - fadeProgress);
}

export function calculateQuoteOpacity(progress: number, index: number): number {
  const startThreshold = 0.15 + index * 0.1;
  const endThreshold = startThreshold + 0.15;
  if (progress < startThreshold) return 0;
  if (progress > endThreshold + 0.3) return Math.max(0, 1 - (progress - endThreshold - 0.3) / 0.2);
  if (progress > endThreshold) return 1;
  return (progress - startThreshold) / (endThreshold - startThreshold);
}

/**
 * TreeOfLife Component
 * 
 * Scroll-bound animated hero section using GSAP + ScrollTrigger.
 * Animation phases:
 * - Phase 1 (0-15%): Seed appears and glows
 * - Phase 2 (15-35%): Trunk grows, roots extend
 * - Phase 3 (35-65%): Branches animate with line-draw effect
 * - Phase 4 (65-85%): Canopy fades in with reducing blur
 * - Phase 5 (85-100%): Fruits appear and become interactive
 */
export default function TreeOfLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [hoveredFruit, setHoveredFruit] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFruitClick = useCallback((fruitId: string) => {
    setSelectedFruit(fruitId);
  }, []);

  const handleFruitHover = useCallback((fruitId: string | null) => {
    setHoveredFruit(fruitId);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedFruit(null);
  }, []);

  // Initialize GSAP ScrollTrigger animation
  useEffect(() => {
    if (!sectionRef.current || !svgRef.current || prefersReducedMotion) return;

    const svg = svgRef.current;
    const seed = svg.querySelector('#seed');
    const roots = svg.querySelector('#roots');
    const trunk = svg.querySelector('#trunk');
    const primaryBranches = svg.querySelectorAll('#primaryBranches .branch');
    const secondaryBranches = svg.querySelectorAll('#secondaryBranches .branch');
    const canopy = svg.querySelector('#canopy');
    const fruits = svg.querySelectorAll('.fruit');

    // Set initial states via GSAP (not inline styles)
    // This ensures GSAP has full control over the animation
    if (seed) {
      gsap.set(seed, { 
        opacity: 0, 
        scale: 0, 
        transformOrigin: 'center center'
      });
    }
    
    if (roots) {
      gsap.set(roots, { opacity: 0 });
    }
    
    if (trunk) {
      gsap.set(trunk, { 
        scaleY: 0, 
        transformOrigin: 'center bottom'
      });
    }
    
    if (canopy) {
      gsap.set(canopy, { opacity: 0 });
    }
    
    fruits.forEach((fruit) => {
      gsap.set(fruit, { 
        opacity: 0, 
        scale: 0, 
        transformOrigin: 'center center'
      });
    });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${SCROLL_CONFIG.pinDuration}`,
        scrub: 0.5, // Smooth scrubbing
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      },
    });

    // Phase 1: Seed (0-15%)
    tl.to(seed, {
      opacity: 1,
      scale: 1,
      duration: 0.15,
      ease: 'power2.out',
    }, 0);

    // Phase 2: Trunk & Roots (15-35%)
    tl.to(roots, {
      opacity: 1,
      duration: 0.1,
      ease: 'power1.out',
    }, 0.15);

    tl.to(trunk, {
      scaleY: 1,
      duration: 0.2,
      ease: 'power2.out',
    }, 0.15);

    // Phase 3: Branches (35-65%)
    // Primary branches with stagger
    tl.to(primaryBranches, {
      strokeDashoffset: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: 'power1.inOut',
    }, 0.35);

    // Secondary branches with stagger
    tl.to(secondaryBranches, {
      strokeDashoffset: 0,
      duration: 0.15,
      stagger: 0.015,
      ease: 'power1.inOut',
    }, 0.45);

    // Phase 4: Canopy (65-85%)
    tl.to(canopy, {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    }, 0.65);

    // Phase 5: Fruits (85-100%)
    tl.to(fruits, {
      opacity: 1,
      scale: 1,
      duration: 0.15,
      stagger: 0.01,
      ease: 'back.out(1.2)',
    }, 0.85);

    timelineRef.current = tl;

    // Refresh ScrollTrigger after a short delay to ensure proper positioning
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [prefersReducedMotion]);

  // Reduced motion: show static final state
  useEffect(() => {
    if (!prefersReducedMotion || !svgRef.current) return;

    const svg = svgRef.current;
    gsap.set(svg.querySelector('#seed'), { opacity: 1, scale: 1 });
    gsap.set(svg.querySelector('#roots'), { opacity: 1 });
    gsap.set(svg.querySelector('#trunk'), { scaleY: 1 });
    gsap.set(svg.querySelectorAll('.branch'), { strokeDashoffset: 0 });
    gsap.set(svg.querySelector('#canopy'), { opacity: 1 });
    gsap.set(svg.querySelectorAll('.fruit'), { opacity: 1, scale: 1 });
  }, [prefersReducedMotion]);

  // Hover effect for fruits
  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion) return;

    const fruits = svgRef.current.querySelectorAll('.fruit');
    fruits.forEach((fruit) => {
      const fruitId = fruit.getAttribute('data-type');
      const isHovered = fruitId === hoveredFruit;
      
      gsap.to(fruit, {
        scale: isHovered ? 1.15 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, [hoveredFruit, prefersReducedMotion]);

  // Life effects: breathing and pulse
  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion || progress < 0.85) return;

    const canopy = svgRef.current.querySelector('#canopy');
    const fruitGlows = svgRef.current.querySelectorAll('.fruit-glow');

    // Breathing effect for canopy (±1% scale)
    if (canopy) {
      gsap.to(canopy, {
        scale: 1.01,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Pulse effect for fruit glows
    fruitGlows.forEach((glow, index) => {
      gsap.to(glow, {
        opacity: 0.5,
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1,
      });
    });

    return () => {
      if (canopy) gsap.killTweensOf(canopy);
      fruitGlows.forEach(glow => gsap.killTweensOf(glow));
    };
  }, [prefersReducedMotion, progress]);

  return (
    <section
      ref={sectionRef}
      className="tree-of-life-section relative bg-linen"
      style={{ minHeight: '100vh' }}
    >
      {/* Background cosmic layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center 30%, 
            rgba(217, 195, 154, 0.15) 0%, 
            rgba(167, 184, 138, 0.08) 40%, 
            transparent 70%
          )`,
        }}
      />

      {/* Main content container */}
      <div className="h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Wisdom quotes - left side */}
        <div className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 w-48 md:w-56 pointer-events-none hidden md:block">
          {wisdomQuotes
            .filter(q => q.side === 'left')
            .map((quote, index) => {
              const opacity = prefersReducedMotion
                ? (progress > 0.3 + index * 0.15 ? 0.6 : 0)
                : calculateQuoteOpacity(progress, index);
              return (
                <p
                  key={quote.id}
                  className="font-serif text-sm md:text-base italic mb-8 leading-relaxed"
                  style={{
                    color: colors.forest,
                    opacity: opacity * 0.7,
                    transform: `translateY(${(1 - opacity) * 20}px)`,
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
              );
            })}
        </div>

        {/* Tree SVG */}
        <div className="relative w-full max-w-4xl mx-auto">
          <TreeSVG
            ref={svgRef}
            onFruitClick={handleFruitClick}
            onFruitHover={handleFruitHover}
          />
        </div>

        {/* Wisdom quotes - right side */}
        <div className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 w-48 md:w-56 text-right pointer-events-none hidden md:block">
          {wisdomQuotes
            .filter(q => q.side === 'right')
            .map((quote, index) => {
              const opacity = prefersReducedMotion
                ? (progress > 0.35 + index * 0.15 ? 0.6 : 0)
                : calculateQuoteOpacity(progress, index + 0.5);
              return (
                <p
                  key={quote.id}
                  className="font-serif text-sm md:text-base italic mb-8 leading-relaxed"
                  style={{
                    color: colors.forest,
                    opacity: opacity * 0.7,
                    transform: `translateY(${(1 - opacity) * 20}px)`,
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
              );
            })}
        </div>

        {/* Text overlay at end */}
        <div
          className="absolute bottom-20 left-0 right-0 text-center pointer-events-none px-4"
          style={{
            opacity: calculateTextOverlayOpacity(progress),
            transform: `translateY(${calculateTextOverlayTranslateY(progress)}px)`,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <p className="font-serif text-2xl md:text-4xl italic drop-shadow-sm" style={{ color: colors.forest }}>
            Every path is connected.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: progress < 0.08 ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: `${colors.forest}50` }}>
            <div className="w-1.5 h-3 rounded-full mt-2 animate-bounce" style={{ backgroundColor: `${colors.forest}80` }} />
          </div>
        </div>
      </div>

      {/* Fruit popup */}
      <NodePopup
        isOpen={selectedFruit !== null}
        onClose={handleClosePopup}
        content={selectedFruit ? fruitContent[selectedFruit] : null}
      />
    </section>
  );
}
