import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Vielorine',
  description: 'Privacy Policy for Vielorine Tarot Readings and Spiritual Guidance.',
};

export default function PrivacyPolicyPage() {
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
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-forest prose-p:font-sans prose-p:text-shadow/80 prose-a:text-wood max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <h2>1. Information We Collect</h2>
          <p>
            Welcome to Vielorine. We respect your privacy and are committed to protecting your personal data. 
            When you visit our site or book a reading, we may collect information such as your name, email 
            address (`readforme@vielorine.com`), and any specific details you choose to share for your tarot readings or spiritual guidance sessions.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to provide you with insightful tarot readings, respond to your inquiries, and improve our website's user experience. We do not sell, rent, or lease your spiritual insights or personal data to third parties.
          </p>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use standard analytics and cookies to understand website traffic patterns and to ensure our website functions beautifully across all devices. You may disable cookies in your browser, though it might affect certain styling or functionality.
          </p>

          <h2>4. Data Protection</h2>
          <p>
            We take reasonable measures to protect your personal information in an effort to prevent loss, misuse, and unauthorized access, disclosure, alteration, and destruction. All reading details are kept strictly confidential.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:readforme@vielorine.com">readforme@vielorine.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
