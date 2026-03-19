'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import NodePopup from './NodePopup';
import FruitOverlay from './FruitOverlay';
import { fruitContent } from '@/lib/data/treePaths';
import { colors } from '@/lib/constants';

/**
 * TreeImageSection - Tree of Life with scroll animations
 */
export default function TreeImageSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [hoveredFruit, setHoveredFruit] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  const handleFruitClick = useCallback((fruitId: string) => {
    setSelectedFruit(fruitId);
  }, []);

  const handleFruitHover = useCallback((fruitId: string | null) => {
    setHoveredFruit(fruitId);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedFruit(null);
  }, []);

  // Heading stays visible - only fades when scrolling past 50%
  const headingOpacity = prefersReducedMotion ? 1 : Math.max(0, 1 - Math.max(0, scrollProgress - 0.5) * 3);
  const treeScale = prefersReducedMotion ? 1 : 1 + scrollProgress * 0.02;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[80vh] md:min-h-screen overflow-hidden py-4 md:py-0"
      style={{ backgroundColor: colors.linen }}
    >
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes breathing {
          0%, 100% { transform: scale(0.998); }
          50% { transform: scale(1.002); }
        }
        .tree-breathing {
          animation: breathing 6s ease-in-out infinite;
        }
      `}</style>

      {/* Heading - at top, always visible initially */}
      <div
        className="pt-16 md:pt-20 pb-1 md:pb-2 text-center px-4"
        style={{
          opacity: headingOpacity,
          transform: `translateY(${prefersReducedMotion ? 0 : -scrollProgress * 15}px)`,
        }}
      >
        <h2 
          className="font-serif text-lg md:text-2xl lg:text-3xl italic tracking-wide"
          style={{ color: colors.forest }}
        >
          Every path is connected.
        </h2>
      </div>

      {/* Main container - tree below heading */}
      <div className="relative flex items-center justify-center">
        {/* Tree container */}
        <div
          className={`relative w-full max-w-6xl mx-auto px-2 md:px-4 ${!prefersReducedMotion ? 'tree-breathing' : ''}`}
          style={{ 
            transform: `scale(${treeScale})`,
            transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          {/* Tree image */}
          <div 
            className="relative aspect-[16/9] w-full"
            style={{ backgroundColor: colors.linen }}
          >
            <Image
              src="/images/tree-of-life.jpg"
              alt="Tree of Life"
              fill
              priority
              className="object-contain"
              style={{ mixBlendMode: 'multiply' }}
              sizes="(max-width: 768px) 100vw, 80vw"
            />

            {/* Fruit overlay */}
            <FruitOverlay
              onFruitClick={handleFruitClick}
              onFruitHover={handleFruitHover}
              hoveredFruit={hoveredFruit}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>

      {/* Popup backdrop */}
      {selectedFruit && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={handleClosePopup}
        />
      )}

      {/* Fruit popup */}
      <NodePopup
        isOpen={selectedFruit !== null}
        onClose={handleClosePopup}
        content={selectedFruit ? fruitContent[selectedFruit] : null}
      />
    </section>
  );
}
