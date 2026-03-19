'use client';

import { useEffect, useState, useRef } from 'react';

import ZodiacWheelSVG from './ZodiacWheelSVG';

// Calculate hero tree rotation based on scroll position
export function calculateHeroTreeRotation(scrollY: number): number {
  return scrollY * 0.1;
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [cursorTilt, setCursorTilt] = useState({ x: 0, y: 0 });
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // Continuous wheel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWheelRotation((r) => (r + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor interaction for subtle wheel tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wheelContainerRef.current) return;
      
      const rect = wheelContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      // Only apply effect when cursor is near the wheel
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < 1.5) {
        // Subtle tilt effect (max 8 degrees)
        const tiltX = deltaY * 8 * Math.max(0, 1 - distance * 0.5);
        const tiltY = -deltaX * 8 * Math.max(0, 1 - distance * 0.5);
        setCursorTilt({ x: tiltX, y: tiltY });
      } else {
        setCursorTilt({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setCursorTilt({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleBookReading = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTarot = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Zodiac wheel shrinks as user scrolls
  const wheelScale = Math.max(0.4, 1 - scrollY / 1000);
  const wheelOpacity = Math.max(0.15, 0.5 - scrollY / 1500);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred circle gradient background */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="w-[60vw] h-[60vw] rounded-full bg-sage opacity-10 blur-3xl"
        />
      </div>

      {/* Rotating Zodiac Wheel behind hero content - smaller to fit within viewport */}
      <div 
        ref={wheelContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{
          transform: `scale(${wheelScale}) perspective(1000px) rotateX(${cursorTilt.x}deg) rotateY(${cursorTilt.y}deg)`,
          opacity: wheelOpacity,
          transition: 'transform 0.4s ease-out, opacity 0.3s ease-out',
        }}
      >
        <div 
          className="w-[62vw] max-w-[580px] aspect-square"
          style={{
            transform: `rotate(${wheelRotation}deg)`,
          }}
        >
          <ZodiacWheelSVG />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Mystical Guidance badge - higher z-index and background for visibility */}
        <div className="inline-block mb-8">
          <span className="px-4 py-2 border border-gold rounded-full text-gold text-sm uppercase tracking-widest font-sans bg-linen/80 backdrop-blur-sm">
            Mystical Guidance
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-forest leading-tight mb-6">
          Illuminate Your Inner Cosmos
        </h1>

        {/* Descriptive paragraph */}
        <p className="font-sans text-shadow text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover the wisdom of the tarot through personalized readings that illuminate your path, 
          reveal hidden truths, and guide you toward your highest potential.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleBookReading}
            className="px-8 py-4 bg-forest text-linen font-sans font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-opacity-90 interactive"
          >
            Book a Reading
          </button>
          <button
            onClick={handleExploreTarot}
            className="px-8 py-4 border-2 border-sage text-forest font-sans font-medium rounded-lg hover:bg-sage hover:bg-opacity-10 transition-all duration-300 interactive"
          >
            Explore Tarot
          </button>
        </div>
      </div>
    </section>
  );
}
