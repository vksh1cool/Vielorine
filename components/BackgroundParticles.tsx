'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCursorPosition } from '@/hooks/useCursorPosition';

interface Particle {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  vibrateSpeed: number;
  vibrateAmount: number;
}

export default function BackgroundParticles() {
  const { x: cursorX, y: cursorY } = useCursorPosition();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [time, setTime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Continuous vibration animation
  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setTime((t) => (t + 0.08) % (Math.PI * 20));
    }, 30);
    return () => clearInterval(interval);
  }, [isMounted]);

  // Generate particles with stable positions but unique vibration properties
  const particles = useMemo<Particle[]>(() => {
    if (dimensions.width === 0) return [];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      baseX: Math.random() * dimensions.width,
      baseY: Math.random() * dimensions.height,
      size: 4 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.15, // 15-30% opacity (increased)
      vibrateSpeed: 0.5 + Math.random() * 1.5, // Different speeds
      vibrateAmount: 3 + Math.random() * 8, // Different vibration amounts
    }));
  }, [dimensions.width, dimensions.height]);

  // Calculate particle position with vibration and cursor interaction
  const getParticlePosition = (particle: Particle) => {
    // Base vibration (always active)
    const vibrateX = Math.sin(time * particle.vibrateSpeed + particle.id) * particle.vibrateAmount;
    const vibrateY = Math.cos(time * particle.vibrateSpeed * 0.7 + particle.id * 0.5) * particle.vibrateAmount;

    // Cursor interaction (additional displacement when cursor is near)
    let cursorDisplaceX = 0;
    let cursorDisplaceY = 0;

    if (cursorX !== 0 || cursorY !== 0) {
      const dx = cursorX - particle.baseX;
      const dy = cursorY - particle.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 250;

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 25;
        const angle = Math.atan2(dy, dx);
        // Particles move away from cursor
        cursorDisplaceX = -Math.cos(angle) * force;
        cursorDisplaceY = -Math.sin(angle) * force;
      }
    }

    return {
      x: particle.baseX + vibrateX + cursorDisplaceX,
      y: particle.baseY + vibrateY + cursorDisplaceY,
      // Opacity pulses slightly
      opacity: particle.opacity * (0.85 + Math.sin(time * 0.5 + particle.id) * 0.15),
    };
  };

  if (dimensions.width === 0 || !isMounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      >
        {particles.map((particle) => {
          const pos = getParticlePosition(particle);
          return (
            <circle
              key={particle.id}
              cx={pos.x}
              cy={pos.y}
              r={particle.size}
              fill="#3A5A36"
              opacity={pos.opacity}
              style={{
                transition: 'cx 0.15s ease-out, cy 0.15s ease-out',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
