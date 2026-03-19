'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component - Individual product card for Shop section
 * 
 * Features:
 * - White rounded container with product image
 * - Product name, description, price
 * - Hover effect: elevated shadow, sage border
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-sage/20 hover:border-sage border border-transparent">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-linen rounded-xl overflow-hidden mb-4 shadow-sm">
        <Image
          src="/images/crystals.png"
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Product name */}
      <h3 className="font-serif text-xl text-shadow mb-1">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-shadow/60 text-sm mb-3">
        {product.description}
      </p>

      {/* Price */}
      <p className="font-serif text-lg text-gold">
        ${product.price.toFixed(2)}
      </p>

      {/* Floating "+" button - appears on hover */}
      <button 
        className="absolute bottom-4 right-4 w-10 h-10 bg-forest rounded-full flex items-center justify-center text-linen opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-forest/90"
        aria-label={`Add ${product.name} to cart`}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
