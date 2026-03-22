'use client';

import { useEffect, useRef, useCallback } from 'react';
import ZodiacWheelSVG from './ZodiacWheelSVG';

// Calculate hero tree rotation based on scroll position
export function calculateHeroTreeRotation(scrollY: number): number {
  return scrollY * 0.1;
}

export default function Hero() {
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const wheelInnerRef = useRef<HTMLDivElement>(null);

  // Use RAF-based scroll and mouse handlers to avoid React re-renders
  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 1) return;
      lastScrollY = scrollY;

      // Zodiac wheel shrinks as user scrolls
      const wheelScale = Math.max(0.4, 1 - scrollY / 1000);
      const wheelOpacity = Math.max(0.15, 0.5 - scrollY / 1500);

      if (wheelContainerRef.current) {
        wheelContainerRef.current.style.transform = `scale(${wheelScale})`;
        wheelContainerRef.current.style.opacity = String(wheelOpacity);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Cursor interaction for subtle wheel tilt (desktop only, via refs)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!wheelContainerRef.current) return;
      
      const rect = wheelContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < 1.5) {
        const tiltX = deltaY * 8 * Math.max(0, 1 - distance * 0.5);
        const tiltY = -deltaX * 8 * Math.max(0, 1 - distance * 0.5);
        if (wheelInnerRef.current) {
          wheelInnerRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
      } else {
        if (wheelInnerRef.current) {
          wheelInnerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
      }
    };

    const handleMouseLeave = () => {
      if (wheelInnerRef.current) {
        wheelInnerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleBookReading = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreTarot = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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

      {/* Rotating Zodiac Wheel behind hero content */}
      <div 
        ref={wheelContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{
          transition: 'opacity 0.3s ease-out',
          willChange: 'transform, opacity',
        }}
      >
        <div 
          ref={wheelInnerRef}
          className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            transition: 'transform 0.4s ease-out',
          }}
        >
          <style jsx>{`
            @keyframes slowSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <div 
            className="w-[70vw] max-w-[700px] aspect-square"
            style={{ animation: 'slowSpin 120s linear infinite' }}
          >
            <ZodiacWheelSVG />
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div ref={heroContentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Mystical Guidance badge */}
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
