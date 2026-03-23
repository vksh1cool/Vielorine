'use client';

import ContactForm from './ContactForm';
import { Mail, Instagram, Twitter, MapPin, Star, Moon, Sun } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Stack from './Stack';

/**
 * Contact section - Contact form and location info
 * 
 * Features:
 * - Forest green background with linen text
 * - Two-column layout (stacked on mobile)
 * - Left: form, email, social icons
 * - Right: mystical panel with location card
 */
export default function Contact() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-forest">
      <div
        className="max-w-7xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column: Form and contact info */}
          <div className="space-y-8">
            {/* Label */}
            <span className="text-gold text-sm uppercase tracking-widest font-sans">
              Get in Touch
            </span>
            
            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl text-linen">
              Begin Your Journey
            </h2>

            {/* Contact Form */}
            <ContactForm />

            {/* Full contact page link */}
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-linen text-forest rounded-full font-sans hover:bg-linen/90 transition-colors interactive"
            >
              Visit Contact Page
            </a>

            {/* Contact info */}
            <div className="pt-8 space-y-4">
              {/* Email */}
              <a 
                href="mailto:readforme@vielorine.com" 
                className="flex items-center gap-4 group p-4 rounded-xl hover:bg-linen/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-linen/10 rounded-full flex items-center justify-center text-linen group-hover:scale-110 group-hover:bg-gold group-hover:text-forest transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-sans text-lg text-linen/90 group-hover:text-gold transition-colors">readforme@vielorine.com</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/ree.tarot?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-linen/80 hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Mystical panel with location */}
          <div className="relative bg-forest/60 rounded-2xl overflow-hidden min-h-[400px] border border-linen/10">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-linen/5 via-transparent to-gold/5" />
            
            {/* Interactive Tarot Stack */}
            <div className="absolute inset-0 flex items-center justify-center pt-8 pb-32 lg:pb-36 z-0">
              <div className="w-[180px] h-[260px] sm:w-[220px] sm:h-[320px] lg:w-[260px] lg:h-[380px] -mt-12 sm:-mt-8 lg:-mt-4">
                <Stack 
                  randomRotation={true}
                  sensitivity={200}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={3500}
                  pauseOnHover={true}
                  cards={[
                    '/images/tarot-1.jpeg',
                    '/images/tarot-2.jpeg',
                    '/images/tarot-3.jpeg',
                    '/images/tarot-4.jpeg',
                    '/images/tarot-reading.png',
                    '/images/astrology-chart.png',
                    '/images/crystals.png',
                  ].map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`Mystical view ${i + 1}`} 
                      className="w-full h-full object-cover pointer-events-none" 
                    />
                  ))}
                />
              </div>
            </div>

            {/* Location card */}
            <div className="absolute bottom-6 left-6 right-6 bg-linen/95 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-linen" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-shadow">The Sanctuary</h3>
                  <p className="text-shadow/60 text-sm">
                    Pune, Maharashtra, India<br />
                    <span className="text-forest/70 italic">Operating Virtually Worldwide</span>
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

