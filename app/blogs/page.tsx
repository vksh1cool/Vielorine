import { Metadata } from 'next';
import BlogsHero from '@/components/BlogsHero';
import BlogGrid from '@/components/BlogGrid';
import Footer from '@/components/Footer';
import { blogPosts } from '@/lib/data/blogPosts';
import { pageMetadata } from '@/lib/data/pageMetadata';

export const metadata: Metadata = {
  title: pageMetadata.blogs.title,
  description: pageMetadata.blogs.description,
  openGraph: {
    title: pageMetadata.blogs.openGraph.title,
    description: pageMetadata.blogs.openGraph.description,
    type: 'website',
    url: pageMetadata.blogs.openGraph.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.blogs.title,
    description: pageMetadata.blogs.description,
  },
  alternates: {
    canonical: pageMetadata.blogs.canonical,
  },
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-linen">
      <BlogsHero />
      <BlogGrid posts={blogPosts} />
      <Footer />
    </main>
  );
}
