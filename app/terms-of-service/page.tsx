import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | Vielorine',
  description: 'Terms of Service for Vielorine Tarot Readings and Spiritual Guidance.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-linen">
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-forest hover:text-wood transition-colors mb-8 interactive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-sans text-sm">Back to Home</span>
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-forest prose-p:font-sans prose-p:text-shadow/80 prose-a:text-wood max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Vielorine website, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
          </p>

          <h2>2. Entertainment Purposes Only</h2>
          <p>
            All tarot readings, spiritual guidance, and content provided on Vielorine are for entertainment and self-reflection purposes only. They do not constitute and should not be used as a substitute for professional legal, financial, medical, or psychological counsel.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content, artwork, design elements, and functionality on Vielorine are the exclusive property of Vielorine and are protected by applicable copyright and trademark laws. You may not reproduce, distribute, or otherwise exploit any content without explicit written permission.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            When booking a reading or communicating with Vielorine at <a href="mailto:readforme@vielorine.com">readforme@vielorine.com</a>, you agree to communicate respectfully. We reserve the right to refuse service to anyone at our discretion.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            Vielorine shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or content. Your spiritual journey and life decisions are entirely your own responsibility.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We may update these terms occasionally to reflect changes to our services or for other operational, legal, or regulatory reasons. Your continued use of the website following the posting of changes will mean that you accept and agree to the changes.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
