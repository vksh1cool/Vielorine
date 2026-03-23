'use client';

import { useEffect, useRef, useCallback } from 'react';
import ZodiacWheelSVG from './ZodiacWheelSVG';
import TextType from './TextType';

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
      const wheelOpacity = Math.max(0.05, 1 - scrollY / 600);

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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 lg:pt-0">
      {/* Blurred circle gradient background */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-sage opacity-20 blur-[120px] translate-x-1/2"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto relative z-10">
        {/* LEFT SIDE: Hero content */}
        <div ref={heroContentRef} className="w-full lg:w-1/2 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left order-1 mb-10 lg:mb-0 lg:pr-10 xl:pr-0">
          {/* Authoritative Primary Headline */}
          <h1 className="font-serif font-black text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[7rem] text-shadow leading-[1.05] tracking-tighter mb-4 drop-shadow-sm">
            Mystical
            <br className="hidden lg:block" /> Guidance.
          </h1>

          {/* Dynamic Typing Sub-Headline */}
          <div className="font-serif text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-snug mb-8 min-h-[90px] sm:min-h-[110px] flex items-center lg:items-start justify-center lg:justify-start w-full">
            <TextType 
              text={[
                "Illuminate Your Cosmos", 
                "Reveal Hidden Truths", 
                "Embrace Your Spirit"
              ]}
              typingSpeed={80}
              pauseDuration={2500}
              showCursor={true}
              cursorCharacter="|"
              deletingSpeed={40}
              textColors={["#3A5A36", "#B88A55", "#4A4A40"]}
              className="text-center lg:text-left font-medium drop-shadow-md"
              cursorClassName="text-gold opacity-70"
            />
          </div>

          {/* Descriptive paragraph */}
        <p className="font-sans text-shadow/80 text-lg md:text-xl max-w-md mb-10 leading-relaxed mx-auto lg:mx-0">
          Find clarity and purpose. Honest, personalized tarot readings to help you navigate your unique journey.
        </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full">
            <button
              onClick={handleBookReading}
              className="px-8 py-4 w-full sm:w-auto bg-forest text-linen font-sans font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-opacity-90 interactive"
            >
              Book a Reading
            </button>
            <button
              onClick={handleExploreTarot}
              className="px-8 py-4 w-full sm:w-auto border-2 border-sage text-forest font-sans font-medium rounded-lg hover:bg-sage hover:bg-opacity-10 transition-all duration-300 interactive"
            >
              Explore Tarot
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Rotating Zodiac Wheel */}
        <div 
          ref={wheelContainerRef}
          className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[40vh] lg:min-h-screen pointer-events-none order-2 mt-12 lg:mt-0"
          aria-hidden="true"
          style={{
            transition: 'opacity 0.3s ease-out',
            willChange: 'transform, opacity',
          }}
        >
          <div 
            ref={wheelInnerRef}
            className="flex justify-center items-center pointer-events-none opacity-90 drop-shadow-sm"
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
              className="w-[80vw] sm:w-[60vw] lg:w-[45vw] max-w-[700px] aspect-square"
              style={{ animation: 'slowSpin 120s linear infinite' }}
            >
              <ZodiacWheelSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
