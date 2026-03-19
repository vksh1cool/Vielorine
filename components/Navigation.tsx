'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Menu, X, Moon, BookOpen, Sun, Feather } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Highlight nav when scrolled past very top
      setIsScrolled(currentScrollY > 20);
      
      // Hide on scroll down, show on scroll up (don't hide if mobile menu is open)
      if (currentScrollY > lastScrollY.current && currentScrollY > 150 && !isMobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Moon },
    { href: '/blogs', label: 'Blogs', icon: BookOpen },
    { href: '/shop', label: 'Shop', icon: Sun },
    { href: '/contact', label: 'Contact', icon: Feather },
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${isHidden ? '-translate-y-full' : 'translate-y-0'}
        ${isScrolled || isMobileMenuOpen
          ? 'py-2 backdrop-blur-md bg-linen/95 border-b border-sage/20 shadow-sm' 
          : 'py-6 bg-transparent border-transparent'
        }
      `}
    >
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
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-1.5 font-serif text-lg tracking-wide text-shadow hover:text-forest transition-colors duration-300 interactive"
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Book Reading Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 border border-forest text-forest rounded-full font-serif text-base tracking-wide hover:bg-forest hover:text-linen transition-all duration-300 interactive"
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
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-3 font-serif text-xl tracking-wide text-shadow hover:text-forest transition-colors duration-300 py-2 interactive"
                  >
                    <Icon className="w-5 h-5 text-forest/70" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-forest text-forest rounded-full font-serif text-lg tracking-wide hover:bg-forest hover:text-linen transition-all duration-300 mt-4 interactive"
              >
                <Sparkles className="w-5 h-5" />
                Book Reading
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
