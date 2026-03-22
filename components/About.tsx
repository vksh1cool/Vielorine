'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24"
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: Image */}
          <div
            className="relative aspect-[4/5] bg-sage rounded-2xl overflow-hidden shadow-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
            }}
          >
            <Image
              src="/images/riddhi_soul.png"
              alt="Riddhi Soul"
              width={400}
              height={500}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            {/* Gradient overlay to blend it slightly */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent pointer-events-none" />
          </div>

          {/* Right column: Content */}
          <div
            className="space-y-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
            }}
          >
            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl text-shadow leading-tight">
              The Soul Behind{' '}
              <span className="italic text-gold">Vielorine</span>
            </h2>

            {/* Wood brown divider */}
            <div className="w-12 h-[2px] bg-wood" />

            {/* Philosophy paragraphs */}
            <div className="space-y-6 text-shadow/80 font-sans leading-relaxed">
              <p>
                For over five years, I have guided seekers through the ancient wisdom of tarot, 
                helping them uncover the paths that lead to their truest selves. Each reading 
                is a sacred conversation between the cards and your soul.
              </p>
              <p>
                My approach blends traditional symbolism with intuitive insight, creating a 
                space where clarity emerges naturally. Whether you seek guidance on love, 
                career, or spiritual growth, the cards illuminate what your heart already knows.
              </p>
            </div>

            {/* Statistics section */}
            <div className="pt-8 border-t border-sage/20">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl text-forest">5+</p>
                  <p className="text-xs uppercase tracking-widest text-shadow/60 mt-1">
                    Years Exp
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl text-forest">2k+</p>
                  <p className="text-xs uppercase tracking-widest text-shadow/60 mt-1">
                    Readings
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl text-forest">100%</p>
                  <p className="text-xs uppercase tracking-widest text-shadow/60 mt-1">
                    Privacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
