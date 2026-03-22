'use client';

import { articles } from '@/lib/data/articles';
import { ArticleCard } from './ArticleCard';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Journal section - Blog cards grid with staggered reveal
 */
export default function Journal() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-[#EAE3D2]/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
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

        {/* Articles grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <div
              key={article.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + index * 0.12}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + index * 0.12}s`,
              }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
