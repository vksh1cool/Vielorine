'use client';

import React, { useEffect, useState } from 'react';

export default function CosmosBackground() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: string; duration: string; color: string }[]>([]);

  useEffect(() => {
    // Generate star coordinates on the client to prevent hydration mismatch
    const colors = ["#D9C39A", "#B88A55", "#A7B88A", "#FFFFFF", "#F3EDE2"];
    const generatedStars = Array.from({ length: 250 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setStars(generatedStars);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-10 bg-linen" />;

  return (
    <div className="fixed inset-0 -z-10 bg-linen overflow-hidden pointer-events-none">
      {/* Deep ambient animated mystical fog / glowing auras */}
      <div 
        className="absolute w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-sage opacity-40 blur-[80px] lg:blur-[100px]" 
        style={{ top: '-10%', left: '-10%', animation: 'float 20s ease-in-out infinite alternate' }} 
      />
      <div 
        className="absolute w-[70vw] h-[70vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-gold opacity-30 blur-[80px] lg:blur-[100px]" 
        style={{ bottom: '-10%', right: '-10%', animation: 'float 25s ease-in-out infinite alternate-reverse' }} 
      />
      <div 
        className="absolute w-[90vw] h-[90vw] lg:w-[60vw] lg:h-[60vw] rounded-full bg-wood opacity-20 blur-[100px] lg:blur-[120px]" 
        style={{ top: '20%', left: '20%', animation: 'float 30s ease-in-out infinite alternate' }} 
      />

      {/* Slowly rotating cosmic starfield */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%]"
        style={{ animation: 'RotateUniverse 240s linear infinite' }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full pointer-events-none mix-blend-multiply"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
              opacity: 0.9,
              animation: `twinkle ${star.duration} ease-in-out infinite alternate`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
