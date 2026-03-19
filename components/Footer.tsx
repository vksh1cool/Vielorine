import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer component - Minimal footer with brand and links
 * 
 * Features:
 * - Linen background with top border
 * - Centered "Vielorine" brand (3xl)
 * - Horizontal link list (Home, Blogs, Shop, Contact)
 * - Copyright and "Designed with intention" tagline
 * - Border separators (shadow gray 10%)
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-linen border-t border-shadow/10">
      {/* Top section */}
      <div className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          {/* Brand with Logo */}
          <Link href="/" className="flex flex-col items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
            <Image
              src="/images/vielorine-logo.png"
              alt="Vielorine"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="font-serif text-3xl text-forest">Vielorine</span>
          </Link>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-shadow/70 hover:text-forest transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom section */}
      <div className="py-8 px-6 md:px-12 lg:px-24 border-t border-shadow/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Copyright */}
          <p className="text-shadow/50 text-sm">
            © {currentYear} Vielorine. All rights reserved.
          </p>

          {/* Designer credit */}
          <p className="text-shadow/50 text-sm">
            Designed & Developed by{' '}
            <a 
              href="https://launchpixel.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-forest hover:text-gold transition-colors font-medium"
            >
              LaunchPixel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
