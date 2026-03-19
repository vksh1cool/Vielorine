// Product data for Vielorine Shop section
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'amethyst-bracelet',
    name: 'Amethyst Bracelet',
    description: 'For intuition & peace',
    price: 24.00,
    icon: 'gem',
    image: '/images/product-amethyst.png'
  },
  {
    id: 'tarot-journal',
    name: 'Tarot Journal',
    description: 'Linen bound, gold foil',
    price: 32.00,
    icon: 'book-open',
    image: '/images/product-journal.png'
  },
  {
    id: 'ritual-candle',
    name: 'Ritual Candle',
    description: 'Sage & Sandalwood',
    price: 18.00,
    icon: 'flame',
    image: '/images/product-candle.png'
  },
  {
    id: 'vielorine-deck',
    name: 'Vielorine Deck',
    description: 'Limited Edition',
    price: 55.00,
    icon: 'layers',
    image: '/images/product-deck.png'
  }
];
