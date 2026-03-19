'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * ContactForm component - Contact form with validation
 * 
 * Features:
 * - Name, Email (2-column grid), Message textarea
 * - Transparent background, bottom border (sage 30%)
 * - Focus state: border transitions to gold
 * - "Send Message" button (linen background, forest text)
 * - Basic client-side validation
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  const inputClasses = "w-full bg-transparent border-b border-sage/30 py-3 text-linen placeholder:text-linen/50 focus:border-gold focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email - 2 column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
          {errors.name && (
            <p className="text-gold/80 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
          {errors.email && (
            <p className="text-gold/80 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Message textarea */}
      <div>
        <textarea
          placeholder="Your message..."
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClasses} resize-none`}
        />
        {errors.message && (
          <p className="text-gold/80 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 bg-linen text-forest font-sans font-medium rounded-full hover:bg-linen/90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
