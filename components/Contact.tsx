'use client';

import ContactForm from './ContactForm';
import TarotCardTrail from './TarotCardTrail';
import { Mail, Instagram, Twitter, MapPin } from 'lucide-react';

/**
 * Contact section - Contact form and map placeholder
 * 
 * Features:
 * - Forest green background with linen text
 * - Two-column layout (stacked on mobile)
 * - Left: form, email, social icons
 * - Right: map placeholder with location card
 */
export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-forest">
      <div className="max-w-7xl mx-auto">
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
                href="mailto:hello@vielorine.com" 
                className="flex items-center gap-3 text-linen/80 hover:text-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@vielorine.com</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="#" 
                  className="text-linen/80 hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-linen/80 hover:text-gold transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Interactive tarot card trail area */}
          <div className="relative bg-forest/80 rounded-2xl overflow-hidden min-h-[400px] border border-dashed border-linen/30">
            {/* Dotted pattern background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor" className="text-linen" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Tarot card trail - follows cursor */}
            <TarotCardTrail />

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
