'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { fruitPositions, fruitContent } from '@/lib/data/treePaths';
import { colors } from '@/lib/constants';

interface FruitOverlayProps {
  onFruitClick: (fruitId: string) => void;
  onFruitHover: (fruitId: string | null) => void;
  hoveredFruit: string | null;
  prefersReducedMotion: boolean;
}

/**
 * Recalculate fruit positions for mobile where the video uses object-contain + scale.
 * 
 * With object-contain + scale(1.4), the video is centered and scaled up.
 * The fruit percentage positions are relative to the container,
 * so they work directly — no cropping adjustment needed.
 */
function useMobileAdjustedPositions(isMobile: boolean) {
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return useMemo(() => {
    if (!isMobile) return fruitPositions;

    const videoAspect = 16 / 9;
    const viewportAspect = viewport.w / viewport.h;

    // With object-contain, the video is letterboxed (black bars on top/bottom or sides)
    // With scale(1.4), it's zoomed in. The fruit positions need to account for:
    // 1. The letterbox offset (where the video actually starts)
    // 2. The scale factor
    
    if (viewportAspect < videoAspect) {
      // Portrait: video fits width, letterboxed vertically
      // Video display width = viewport.w, video display height = viewport.w / videoAspect
      const displayHeight = viewport.w / videoAspect;
      const scale = 1.4;
      const scaledHeight = displayHeight * scale;
      const scaledWidth = viewport.w * scale;
      
      // After scaling, the video overflows. The center stays centered.
      // Offset from viewport edge to video edge (in viewport coordinates)
      const offsetX = (scaledWidth - viewport.w) / 2;
      const offsetY = (viewport.h - scaledHeight) / 2 + (scaledHeight - viewport.h) / 2;
      // Simplified: the video center aligns with viewport center
      
      return fruitPositions.map(fruit => {
        // Map fruit position (% of video frame) to viewport position
        // The video's (0,0) in viewport coords, accounting for scale and centering:
        const videoPixelX = (fruit.positionX / 100) * viewport.w * scale;
        const videoPixelY = (fruit.positionY / 100) * displayHeight * scale;
        
        // Centered in viewport
        const vpX = videoPixelX - (scaledWidth - viewport.w) / 2;
        const vpY = videoPixelY - (scaledHeight - viewport.h) / 2;
        
        return {
          ...fruit,
          positionX: (vpX / viewport.w) * 100,
          positionY: (vpY / viewport.h) * 100,
        };
      });
    }

    return fruitPositions;
  }, [isMobile, viewport]);
}

/**
 * FruitOverlay - Lightweight apple fruits with simple animations
 * 
 * Performance optimized: uses CSS transforms only (no drop-shadow animations),
 * GPU-composited via will-change, minimal repaints.
 */
export default function FruitOverlay({
  onFruitClick,
  onFruitHover,
  hoveredFruit,
  prefersReducedMotion,
}: FruitOverlayProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const adjustedPositions = useMobileAdjustedPositions(isMobile);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Lightweight bob animation — transform-only, GPU composited */}
      {!prefersReducedMotion && (
        <style jsx>{`
          @keyframes fruitBob {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-3px); }
          }
        `}</style>
      )}

      {adjustedPositions.map((fruit, index) => {
        const content = fruitContent[fruit.dataType];
        const isHovered = fruit.id === hoveredFruit;
        
        // Hide fruits that are off-screen
        const isOffScreen = isMobile && (fruit.positionX < -5 || fruit.positionX > 105 || fruit.positionY < -5 || fruit.positionY > 105);
        if (isOffScreen) return null;

        return (
          <button
            key={fruit.id}
            className="absolute pointer-events-auto flex items-center justify-center group"
            style={{
              left: `${fruit.positionX}%`,
              top: `${fruit.positionY}%`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1})`,
              transition: 'transform 0.25s ease-out',
              zIndex: isHovered ? 10 : 1,
              animation: !prefersReducedMotion 
                ? `fruitBob ${3 + index * 0.3}s ease-in-out infinite ${index * 0.2}s`
                : 'none',
              willChange: 'transform',
              // Larger touch target on mobile
              minWidth: isMobile ? '44px' : undefined,
              minHeight: isMobile ? '44px' : undefined,
            }}
            onClick={() => onFruitClick(fruit.id)}
            onMouseEnter={() => onFruitHover(fruit.id)}
            onMouseLeave={() => onFruitHover(null)}
            aria-label={`${fruit.label}: ${content?.subtitle || 'Explore'}`}
          >
            {/* Simple glow — static, no animation */}
            <div
              className="absolute rounded-full"
              style={{
                width: isMobile ? '36px' : '56px',
                height: isMobile ? '36px' : '56px',
                background: `radial-gradient(circle, rgba(200,80,80,${isHovered ? 0.35 : 0.15}) 0%, transparent 65%)`,
                transition: 'background 0.3s ease',
              }}
            />

            {/* Apple Image — no heavy filter animations */}
            <div
              className="relative w-6 h-6 md:w-10 md:h-10 flex items-center justify-center"
              style={{
                filter: isHovered 
                  ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' 
                  : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                transition: 'filter 0.3s ease, transform 0.3s ease',
              }}
            >
              <Image
                src="/images/apple.png"
                alt="Apple"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 24px, 40px"
              />
            </div>

            {/* Label on hover / tap */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-sm font-medium transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{
                top: '100%',
                marginTop: isMobile ? '2px' : '6px',
                backgroundColor: colors.linen,
                color: colors.forest,
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                border: `1px solid ${colors.gold}40`,
              }}
            >
              {fruit.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
