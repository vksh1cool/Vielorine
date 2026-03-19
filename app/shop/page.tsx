import { Metadata } from 'next';
import ShopHero from '@/components/ShopHero';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products } from '@/lib/data/products';
import { pageMetadata } from '@/lib/data/pageMetadata';

export const metadata: Metadata = {
  title: pageMetadata.shop.title,
  description: pageMetadata.shop.description,
  openGraph: {
    title: pageMetadata.shop.openGraph.title,
    description: pageMetadata.shop.openGraph.description,
    type: 'website',
    url: pageMetadata.shop.openGraph.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.shop.title,
    description: pageMetadata.shop.description,
  },
  alternates: {
    canonical: pageMetadata.shop.canonical,
  },
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-linen">
      <ShopHero />
      
      {/* Products Grid */}
      <section className="pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-sage/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-forest mb-4">
            Looking for Something Special?
          </h2>
          <p className="font-sans text-shadow/70 mb-6">
            Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll help you find the perfect tools for your practice.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-forest text-linen rounded-full font-sans hover:bg-forest/90 transition-colors interactive"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
