'use client';

import Image from 'next/image';
import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
}

/**
 * ArticleCard component - Individual article card for Journal section
 * 
 * Features:
 * - 16:10 image with category badge
 * - Title in Fraunces serif
 * - 2-line excerpt with line-clamp
 * - Hover effect: title color change, overlay removal
 */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group cursor-pointer">
      {/* Image with 16:10 aspect ratio */}
      <div className="relative aspect-[16/10] bg-sage/30 rounded-xl overflow-hidden mb-4 shadow-lg">
        <Image
          src={article.image || "/images/tarot-reading.png"}
          alt={article.title}
          width={600}
          height={375}
          className="w-full h-full object-cover scale-[1.196] transition-transform duration-700 group-hover:scale-[1.30]"
        />
        {/* Overlay that fades on hover */}
        <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-300" />
        
        {/* Category badge - top right */}
        <span className="absolute top-3 right-3 px-3 py-1 bg-linen/90 backdrop-blur-sm text-xs uppercase tracking-wider text-shadow rounded-full">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-shadow group-hover:text-wood transition-colors duration-300 mb-2">
        {article.title}
      </h3>

      {/* Excerpt with 2-line clamp */}
      <p className="text-shadow/70 text-sm leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
    </article>
  );
}
