import { Metadata } from 'next';
import { Mail, MapPin, Instagram, Twitter } from 'lucide-react';
import ContactHero from '@/components/ContactHero';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/data/pageMetadata';

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  openGraph: {
    title: pageMetadata.contact.openGraph.title,
    description: pageMetadata.contact.openGraph.description,
    type: 'website',
    url: pageMetadata.contact.openGraph.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
  },
  alternates: {
    canonical: pageMetadata.contact.canonical,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linen">
      <ContactHero />
      
      {/* Contact Content */}
      <section className="pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <div className="bg-forest rounded-3xl p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl text-linen mb-8">
                Send a Message
              </h2>
              <ContactForm />
              
              {/* Contact Info */}
              <div className="mt-12 pt-8 border-t border-linen/20">
                <a 
                  href="mailto:hello@vielorine.com"
                  className="flex items-center gap-3 text-linen/80 hover:text-gold transition-colors mb-4 interactive"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-sans">hello@vielorine.com</span>
                </a>
                
                {/* Social Links */}
                <div className="flex items-center gap-4 mt-6">
                  <a 
                    href="https://instagram.com/vielorine" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-linen/60 hover:text-gold transition-colors interactive"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com/vielorine" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-linen/60 hover:text-gold transition-colors interactive"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="flex flex-col">
              {/* Map Placeholder */}
              <div className="flex-1 bg-forest/90 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[400px]">
                {/* World Map Overlay */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%23F3EDE2' d='M150,100 Q200,80 250,100 T350,90 Q400,100 450,80 T550,100 Q600,90 650,100 T750,80 Q800,100 850,90 M100,200 Q150,180 200,200 T300,190 Q350,200 400,180 T500,200 Q550,190 600,200 T700,180 Q750,200 800,190 M200,300 Q250,280 300,300 T400,290 Q450,300 500,280 T600,300 Q650,290 700,300 T800,280'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Location Card */}
                <div className="relative z-10 bg-linen rounded-2xl p-6 max-w-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-forest mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg text-forest mb-1">
                        The Sanctuary
                      </h3>
                      <p className="font-sans text-shadow/70 text-sm">
                        Pune, Maharashtra, India<br />
                        <span className="text-forest/60 italic">Operating Virtually Worldwide</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Text */}
                <p className="absolute bottom-8 right-8 font-serif text-linen/30 text-lg italic">
                  Where paths converge
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-sage/20 rounded-2xl">
                <h3 className="font-serif text-lg text-forest mb-2">
                  Reading Sessions
                </h3>
                <p className="font-sans text-shadow/70 text-sm">
                  Available for in-person and virtual readings. Sessions typically last 45-60 minutes. 
                  Book your appointment and receive confirmation within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
