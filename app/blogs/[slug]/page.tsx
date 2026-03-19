import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostComponent from '@/components/BlogPost';
import RelatedArticles from '@/components/RelatedArticles';
import Footer from '@/components/Footer';
import { blogPosts, getBlogPost, getRelatedPosts } from '@/lib/data/blogPosts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Vielorine',
    };
  }

  return {
    title: `${post.title} | Vielorine Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url: `https://vielorine.com/blogs/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `https://vielorine.com/blogs/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category, 3);

  return (
    <main className="min-h-screen bg-linen">
      <BlogPostComponent post={post} />
      <RelatedArticles posts={relatedPosts} />
      <Footer />
    </main>
  );
}
