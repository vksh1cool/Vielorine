import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/lib/types';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-forest hover:text-wood transition-colors mb-8 interactive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-sans text-sm">Back to Blogs</span>
        </Link>

        {/* Category Badge */}
        <span className="inline-block bg-sage/30 text-forest text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-shadow/60 text-sm mb-8 pb-8 border-b border-sage/20">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Featured Image or Placeholder */}
        <div className="relative aspect-[16/9] bg-sage/30 rounded-2xl mb-12 overflow-hidden flex items-center justify-center">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover scale-[1.156]"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <span className="text-forest/40 font-sans text-sm">Featured Image</span>
          )}
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-forest
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:font-sans prose-p:text-shadow/80 prose-p:leading-relaxed
            prose-a:text-forest prose-a:underline prose-a:hover:text-wood
            prose-strong:text-forest prose-strong:font-medium
            prose-ul:font-sans prose-ul:text-shadow/80
            prose-ol:font-sans prose-ol:text-shadow/80
            prose-li:my-1
            prose-blockquote:border-l-gold prose-blockquote:bg-sage/10 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-code:bg-sage/20 prose-code:px-1 prose-code:rounded prose-code:text-forest
            prose-pre:bg-forest prose-pre:text-linen"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Tags/Keywords */}
        <div className="mt-12 pt-8 border-t border-sage/20">
          <h3 className="font-sans text-sm text-shadow/50 uppercase tracking-wider mb-4">
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-sage/20 text-forest text-sm px-3 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// Simple markdown-like content formatter
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Code blocks
    .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Paragraphs (double newlines)
    .split(/\n\n+/)
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
}
