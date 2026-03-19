// Type definitions for Vielorine Website

export interface ColorPalette {
  sage: '#A7B88A';
  forest: '#3A5A36';
  gold: '#D9C39A';
  wood: '#B88A55';
  linen: '#F3EDE2';
  shadow: '#4A4A40';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'Tarot Basics' | 'Spiritual' | 'Guide';
  slug: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Tarot Basics' | 'Spiritual' | 'Guide';
  author: string;
  publishedAt: string;
  readingTime: number;
  featuredImage?: string;
  metaDescription: string;
  keywords: string[];
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
  };
}

export interface TreeNode {
  id: string;
  cx: number;
  cy: number;
  r: number;
  label: string;
}

export interface TreeNodeContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tarotCards: string[];
  keywords: string[];
}

export interface ScrollProgress {
  progress: number;
  phase: 'roots' | 'growth' | 'connection' | 'complete';
}
