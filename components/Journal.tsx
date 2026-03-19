'use client';

import { articles } from '@/lib/data/articles';
import { ArticleCard } from './ArticleCard';
import { ArrowRight } from 'lucide-react';

/**
 * Journal section - Blog cards grid
 * 
 * Features:
 * - Header with "Journal" label, "Words of Wisdom" heading
 * - "View all articles" link (desktop only)
 * - Responsive grid (1 col mobile, 3 col desktop)
 * - Renders 3 ArticleCard components
 */
export default function Journal() {
  return (
    <section id="journal" className="py-24 px-6 md:px-12 lg:px-24 bg-[#EAE3D2]/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            {/* Label */}
            <span className="text-gold text-sm uppercase tracking-widest font-sans">
              Journal
            </span>
            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl text-shadow mt-2">
              Words of Wisdom
            </h2>
          </div>
          
          {/* View all link - desktop only */}
          <a 
            href="/blogs" 
            className="hidden md:flex items-center gap-2 text-shadow/70 hover:text-forest transition-colors group mt-4 md:mt-0 interactive"
          >
            <span className="text-sm">View all articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
