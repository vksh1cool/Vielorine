'use client';

import { products } from '@/lib/data/products';
import ProductCard from './ProductCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Shop section - Product grid with staggered reveal
 */
export default function Shop() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Label */}
          <span className="text-gold text-sm uppercase tracking-widest font-sans">
            Apothecary & Tools
          </span>
          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl text-shadow mt-2 mb-4">
            Curated for the Soul
          </h2>
          {/* Subtitle */}
          <p className="text-shadow/70 max-w-xl mx-auto">
            Handpicked spiritual accessories to enhance your practice and deepen your connection.
          </p>
        </div>

        {/* Products grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
                transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + index * 0.1}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + index * 0.1}s`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div
          className="text-center mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}
        >
          <a 
            href="/shop" 
            className="inline-block px-6 py-3 border border-forest text-forest rounded-full font-sans hover:bg-forest hover:text-linen transition-all duration-300 interactive"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
