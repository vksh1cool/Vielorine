'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';

interface BlogGridProps {
  posts: BlogPost[];
}

const categories = ['All', 'Tarot Basics', 'Spiritual', 'Guide'] as const;

export default function BlogGrid({ posts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <section className="pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-300 interactive ${
                activeCategory === category
                  ? 'bg-forest text-linen'
                  : 'bg-sage/20 text-shadow hover:bg-sage/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Image Placeholder */}
                <div className="aspect-[16/10] bg-sage/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
                  <span className="absolute top-4 right-4 bg-linen/90 text-forest text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="font-serif text-xl text-forest group-hover:text-wood transition-colors duration-300 mb-3">
                    {post.title}
                  </h2>
                  <p className="font-sans text-shadow/70 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-shadow/50">
                    <span>{post.author}</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-shadow/50 font-sans">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
