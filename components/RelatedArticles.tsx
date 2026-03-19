import Link from 'next/link';
import { BlogPost } from '@/lib/types';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-sage/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-forest text-center mb-12">
          Continue Your Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
                  <h3 className="font-serif text-lg text-forest group-hover:text-wood transition-colors duration-300 mb-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-shadow/70 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
