'use client';

import { Phone, MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '+918800964169';

/**
 * FloatingContact - Subtle floating call and WhatsApp buttons
 * Fixed position at bottom-right, always visible
 */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${PHONE_NUMBER.replace(/\+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        {/* Tooltip */}
        <span className="absolute right-14 px-3 py-1.5 bg-forest text-linen text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="group flex items-center justify-center w-12 h-12 bg-forest rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5 text-linen" />
        {/* Tooltip */}
        <span className="absolute right-14 px-3 py-1.5 bg-forest text-linen text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
}
