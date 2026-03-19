'use client';

import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    // Handle hash links on home page
    if (href.startsWith('/#') && pathname === '/') {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isHashLink = (href: string) => href.includes('#');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-linen/90 border-b border-sage/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo Only */}
          <Link 
            href="/" 
            className="interactive"
          >
            <Image
              src="/images/vielorine-logo.png"
              alt="Vielorine"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-sans text-shadow hover:text-forest transition-colors duration-300 interactive"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book Reading Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 border border-forest text-forest rounded-full font-sans text-sm hover:bg-forest hover:text-linen transition-all duration-300 interactive"
            >
              <Sparkles className="w-4 h-4" />
              Book Reading
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-forest interactive"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage/20">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans text-shadow hover:text-forest transition-colors duration-300 py-2 interactive"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-forest text-forest rounded-full font-sans text-sm hover:bg-forest hover:text-linen transition-all duration-300 mt-2 interactive"
              >
                <Sparkles className="w-4 h-4" />
                Book Reading
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
