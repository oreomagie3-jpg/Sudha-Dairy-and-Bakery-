
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'd1',
    name: 'Full Cream Milk',
    hindiName: 'फुल क्रीम दूध',
    price: 66,
    category: 'Dairy',
    unit: '1L',
    image: 'https://picsum.photos/seed/milk1/400/300',
    description: 'Fresh and nutritious full cream milk from the best cattle.',
    isFresh: true
  },
  {
    id: 'd2',
    name: 'Fresh Paneer',
    hindiName: 'ताजा पनीर',
    price: 110,
    category: 'Dairy',
    unit: '200g',
    image: 'https://picsum.photos/seed/paneer/400/300',
    description: 'Soft and succulent paneer made from pure milk.',
    isFresh: true
  },
  {
    id: 'd3',
    name: 'Desi Ghee',
    hindiName: 'देसी घी',
    price: 650,
    category: 'Dairy',
    unit: '1L',
    image: 'https://picsum.photos/seed/ghee/400/300',
    description: 'Traditional aroma and pure taste of Desi Ghee.'
  },
  {
    id: 'b1',
    name: 'Chocolate Truffle Cake',
    hindiName: 'चॉकलेट ट्रफल केक',
    price: 450,
    category: 'Bakery',
    unit: '0.5kg',
    image: 'https://picsum.photos/seed/cake1/400/300',
    description: 'Rich, moist chocolate cake layered with truffle ganache.'
  },
  {
    id: 'b2',
    name: 'Fruit Biscuits',
    hindiName: 'फ्रूट बिस्कुट',
    price: 120,
    category: 'Bakery',
    unit: '250g',
    image: 'https://picsum.photos/seed/biscuits/400/300',
    description: 'Crunchy biscuits packed with dried fruits.'
  },
  {
    id: 'b3',
    name: 'Brown Bread',
    hindiName: 'ब्राउन ब्रेड',
    price: 45,
    category: 'Bakery',
    unit: '400g',
    image: 'https://picsum.photos/seed/bread/400/300',
    description: 'Whole wheat bread for a healthy breakfast.',
    isFresh: true
  },
  {
    id: 's1',
    name: 'Gulab Jamun',
    hindiName: 'गुलाब जामुन',
    price: 180,
    category: 'Sweets',
    unit: '500g',
    image: 'https://picsum.photos/seed/gulab/400/300',
    description: 'Soft syrup-filled khoya balls.'
  },
  {
    id: 'v1',
    name: 'Fresh Lassi',
    hindiName: 'ताजा लस्सी',
    price: 30,
    category: 'Beverages',
    unit: '250ml',
    image: 'https://picsum.photos/seed/lassi/400/300',
    description: 'Chilled, sweet and creamy lassi.',
    isFresh: true
  }
];

export const CATEGORIES: { name: string; icon: string }[] = [
  { name: 'Dairy', icon: '🥛' },
  { name: 'Bakery', icon: '🥐' },
  { name: 'Sweets', icon: '🍬' },
  { name: 'Beverages', icon: '🥤' }
];
