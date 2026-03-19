'use client';

import { useRef, useEffect, useState } from 'react';
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
 * FruitOverlay - Apple fruits with pop effect and glow
 */
export default function FruitOverlay({
  onFruitClick,
  onFruitHover,
  hoveredFruit,
  prefersReducedMotion,
}: FruitOverlayProps) {
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (fruitId: string) => {
    onFruitHover(fruitId);
  };

  const handleMouseLeave = () => {
    onFruitHover(null);
  };

  const handleClick = (fruitId: string) => {
    onFruitClick(fruitId);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Pulsating glow and bob animations to indicate interactivity */}
      {!prefersReducedMotion && (
        <style jsx>{`
          @keyframes applePulse {
            0%, 100% { 
              transform: scale(1);
              filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(200,80,80,0.3));
            }
            50% { 
              transform: scale(1.08);
              filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4)) drop-shadow(0 0 18px rgba(200,80,80,0.5));
            }
          }
          @keyframes appleBob {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-3px); }
          }
          @keyframes ringPulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.4;
            }
            50% { 
              transform: scale(1.3);
              opacity: 0.7;
            }
          }
        `}</style>
      )}

      {fruitPositions.map((fruit, index) => {
        const content = fruitContent[fruit.dataType];
        const isHovered = fruit.id === hoveredFruit;
        
        return (
          <button
            key={fruit.id}
            className="absolute pointer-events-auto transition-all duration-300 ease-out"
            style={{
              left: `${fruit.positionX}%`,
              top: `${fruit.positionY}%`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1})`,
              zIndex: isHovered ? 10 : 1,
              animation: !prefersReducedMotion 
                ? `appleBob ${3 + index * 0.3}s ease-in-out infinite ${index * 0.2}s`
                : 'none',
            }}
            onClick={() => handleClick(fruit.id)}
            onMouseEnter={() => handleMouseEnter(fruit.id)}
            onMouseLeave={handleMouseLeave}
            aria-label={`${fruit.label}: ${content?.subtitle || 'Explore'}`}
          >
            {/* Pulsating glow ring - indicates clickability */}
            <div
              className="absolute rounded-full"
              style={{
                width: '56px',
                height: '56px',
                left: '-12px',
                top: '-12px',
                background: `radial-gradient(circle, rgba(200,80,80,${isHovered ? 0.6 : 0.35}) 0%, transparent 70%)`,
                transition: 'background 0.3s ease',
                animation: !prefersReducedMotion && !isHovered
                  ? `ringPulse ${2.5 + index * 0.2}s ease-in-out infinite ${index * 0.3}s`
                  : 'none',
              }}
            />

            {/* Apple image with pulse animation */}
            <div
              className="relative w-8 h-8 md:w-10 md:h-10"
              style={{
                filter: isHovered 
                  ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(200,80,80,0.6))' 
                  : 'drop-shadow(0 3px 6px rgba(0,0,0,0.35)) drop-shadow(0 0 10px rgba(200,80,80,0.35))',
                transition: 'filter 0.3s ease, transform 0.3s ease',
                animation: !prefersReducedMotion && !isHovered
                  ? `applePulse ${2 + index * 0.15}s ease-in-out infinite ${index * 0.2}s`
                  : 'none',
              }}
            >
              <Image
                src="/images/apple.png"
                alt="Apple"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>

            {/* Label on hover */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{
                top: '100%',
                marginTop: '6px',
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
