'use client';

import { products } from '@/lib/data/products';
import ProductCard from './ProductCard';

/**
 * Shop section - Product grid
 * 
 * Features:
 * - Centered header with "Apothecary & Tools" label
 * - "Curated for the Soul" heading
 * - Responsive grid (1/2/4 columns)
 * - Renders 4 ProductCard components
 */
export default function Shop() {
  return (
    <section id="shop" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Centered header */}
        <div className="text-center mb-12">
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

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
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
