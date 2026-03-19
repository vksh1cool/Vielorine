import Hero from '@/components/Hero';
import TreeAnimatedWebPSection from '@/components/TreeOfLife/TreeAnimatedWebPSection';
import About from '@/components/About';
import Journal from '@/components/Journal';
import Shop from '@/components/Shop';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Vielorine Home Page
 * 
 * Single-page application with section-based navigation.
 * Sections are ordered: Hero → Tree of Life → About → Journal → Shop → Contact → Footer
 * 
 * Navigation IDs:
 * - #about - About section
 * - #journal - Journal/Blog section
 * - #shop - Shop section
 * - #contact - Contact section
 */
export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      {/* Hero Section - Landing area with brand intro and CTAs, with Zodiac Wheel behind */}
      <Hero />
      
      {/* Tree of Life - Animated WebP sequence with interactive fruits */}
      <TreeAnimatedWebPSection />
      
      {/* About Section - id="about" - Brand story and statistics */}
      <About />
      
      {/* Journal Section - id="journal" - Blog articles grid */}
      <Journal />
      
      {/* Shop Section - id="shop" - Product cards grid */}
      <Shop />
      
      {/* Contact Section - id="contact" - Form and location info */}
      <Contact />
      
      {/* Footer - Brand, links, and copyright */}
      <Footer />
    </main>
  );
}
