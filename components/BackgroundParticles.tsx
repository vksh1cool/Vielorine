'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface Particle {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  floatDuration: number;
}

export default function BackgroundParticles() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      isMobileRef.current = window.innerWidth < 768;
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Track mouse via ref — desktop only (no listener on mobile)
  useEffect(() => {
    if (isMobileRef.current) return; // Skip on mobile entirely
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate particles — fewer on mobile
  const particles = useMemo<Particle[]>(() => {
    if (dimensions.width === 0) return [];
    const count = dimensions.width < 768 ? 8 : 20;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      baseX: Math.random() * dimensions.width,
      baseY: Math.random() * dimensions.height,
      size: 4 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.15,
      floatDuration: 8 + Math.random() * 12,
    }));
  }, [dimensions.width, dimensions.height]);

  // RAF loop for cursor-reactive displacement — DESKTOP ONLY
  // On mobile, particles just float via CSS animation (no RAF needed)
  useEffect(() => {
    if (!svgRef.current || particles.length === 0 || isMobileRef.current) return;

    const circles = svgRef.current.querySelectorAll('circle');
    let rafId: number;

    const animate = () => {
      const { x: cursorX, y: cursorY } = mouseRef.current;

      particles.forEach((particle, i) => {
        const circle = circles[i];
        if (!circle) return;

        let displaceX = 0;
        let displaceY = 0;

        if (cursorX !== 0 || cursorY !== 0) {
          const dx = cursorX - particle.baseX;
          const dy = cursorY - particle.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 250;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 25;
            const angle = Math.atan2(dy, dx);
            displaceX = -Math.cos(angle) * force;
            displaceY = -Math.sin(angle) * force;
          }
        }

        circle.setAttribute('cx', String(particle.baseX + displaceX));
        circle.setAttribute('cy', String(particle.baseY + displaceY));
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [particles]);

  if (dimensions.width === 0 || !isMounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes particleFloat {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(8px, -6px) scale(1.1); }
          66% { transform: translate(-6px, 8px) scale(0.9); }
        }
      `}</style>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      >
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.baseX}
            cy={particle.baseY}
            r={particle.size}
            fill="#3A5A36"
            opacity={particle.opacity}
            style={{
              animation: `particleFloat ${particle.floatDuration}s ease-in-out infinite alternate ${particle.id * 0.5}s`,
              transformOrigin: `${particle.baseX}px ${particle.baseY}px`,
              willChange: 'transform',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
