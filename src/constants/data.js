// Mock product data — all eggs from Rhode Island Red chickens
export const CATEGORIES = [
  { id: 'all', label: 'All Eggs', emoji: '🥚' },
  { id: 'dozen', label: 'Dozen', emoji: '🐔' },
  { id: 'bulk', label: 'Bulk', emoji: '📦' },
  { id: 'fertile', label: 'Fertile', emoji: '🐣' },
  { id: 'special', label: 'Special', emoji: '✨' },
];

export const PRODUCTS = [
  {
    id: '1',
    name: 'Classic Dozen',
    category: 'dozen',
    price: 5.99,
    unit: 'per dozen',
    eggs: 12,
    description:
      'Fresh farm eggs from our prized Rhode Island Red hens. Rich, golden yolks and thick shells — perfect for everyday cooking and baking. Collected fresh daily and carefully hand-washed.',
    badge: 'Best Seller',
    badgeColor: '#C8340A',
    emoji: '🥚',
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    highlights: ['Hand collected daily', 'Free-range hens', 'No hormones', 'Rich golden yolks'],
  },
  {
    id: '2',
    name: 'Half Dozen',
    category: 'dozen',
    price: 3.49,
    unit: 'per 6 eggs',
    eggs: 6,
    description:
      'Perfect size for smaller households. Same premium quality Rhode Island Red eggs in a convenient half-dozen pack. Great for trying our eggs for the first time!',
    badge: 'Great Value',
    badgeColor: '#E87B0A',
    emoji: '🥚',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    highlights: ['Perfect for small families', 'Fresh daily', 'Farm to table', 'Pasture-raised'],
  },
  {
    id: '3',
    name: 'Jumbo Flat 30',
    category: 'bulk',
    price: 13.99,
    unit: 'per 30 eggs',
    eggs: 30,
    description:
      'Our jumbo-size Rhode Island Red eggs packed in a convenient flat of 30. Great for restaurants, bakeries, or families who love eggs. Biggest yolks, richest flavor!',
    badge: 'Bulk Buy',
    badgeColor: '#5D9E30',
    emoji: '🥚',
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    highlights: ['Jumbo sized', 'Best for baking', 'Restaurant quality', 'Bulk savings'],
  },
  {
    id: '4',
    name: 'Mega Flat 60',
    category: 'bulk',
    price: 24.99,
    unit: 'per 60 eggs',
    eggs: 60,
    description:
      'Stock up and save with our largest pack! 60 premium Rhode Island Red eggs — ideal for large families, catering, or meal prep enthusiasts. Maximum freshness guaranteed.',
    badge: 'Best Price',
    badgeColor: '#5D9E30',
    emoji: '🥚',
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    highlights: ['Maximum savings', 'Fresh 7 days', 'Catering size', 'Premium grade A'],
  },
  {
    id: '5',
    name: 'Fertile Eggs Dozen',
    category: 'fertile',
    price: 18.99,
    unit: 'per dozen',
    eggs: 12,
    description:
      'Certified fertile eggs from our purebred Rhode Island Red flock. Perfect for hatching your own backyard chickens. High hatch rate guaranteed. Each egg is carefully inspected before packing.',
    badge: 'Hatchable',
    badgeColor: '#3B82F6',
    emoji: '🐣',
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    highlights: ['90%+ hatch rate', 'Purebred RIR', 'Certificate included', 'Carefully candled'],
  },
  {
    id: '6',
    name: 'Fertile Eggs 6-Pack',
    category: 'fertile',
    price: 10.99,
    unit: 'per 6 eggs',
    eggs: 6,
    description:
      'Starter pack of 6 fertile Rhode Island Red eggs — great for small incubators or first-time hatchers. Comes with a basic hatching guide. Watch the magic happen!',
    badge: 'Starter Kit',
    badgeColor: '#3B82F6',
    emoji: '🐣',
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    highlights: ['Includes hatching guide', 'Small incubator size', 'Beginner friendly', 'High fertility'],
  },
  {
    id: '7',
    name: 'Gift Box Dozen',
    category: 'special',
    price: 9.99,
    unit: 'per dozen',
    eggs: 12,
    description:
      'Our premium eggs beautifully presented in a handcrafted gift box! Perfect for gifting to egg lovers, foodies, or anyone who appreciates farm-fresh quality. Comes with a personalized note card.',
    badge: 'Gift Ready',
    badgeColor: '#C8340A',
    emoji: '🎁',
    rating: 5.0,
    reviewCount: 22,
    inStock: true,
    highlights: ['Beautiful gift box', 'Personalized card', 'Perfect for gifting', 'Premium selection'],
  },
  {
    id: '8',
    name: 'Weekly Egg Box',
    category: 'special',
    price: 21.99,
    unit: 'per week (36 eggs)',
    eggs: 36,
    description:
      'Subscribe and save! Our weekly farm box delivers 36 fresh Rhode Island Red eggs straight to your door (or available for pickup). Never run out of eggs again — freshness guaranteed every time.',
    badge: 'Subscribe',
    badgeColor: '#9E2508',
    emoji: '📦',
    rating: 4.9,
    reviewCount: 55,
    inStock: true,
    highlights: ['Weekly fresh delivery', '36 eggs per box', 'Best value', 'Never run out'],
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter(p =>
  ['1', '5', '7'].includes(p.id)
);

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Maria Santos',
    rating: 5,
    comment: 'The freshest eggs I have ever tasted! The yolks are so vibrant and golden. My family absolutely loves them!',
    avatar: '👩',
  },
  {
    id: '2',
    name: 'James Reyes',
    rating: 5,
    comment: 'Ordered the fertile eggs and had a fantastic hatch rate. My kids love watching the baby chicks grow!',
    avatar: '👨',
  },
  {
    id: '3',
    name: 'Ana Mendoza',
    rating: 5,
    comment: 'Been ordering weekly for 3 months now. Consistently fresh, thick-shelled eggs every time. Highly recommend!',
    avatar: '👩‍🦱',
  },
];

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const STATUS_LABELS = {
  pending: { label: 'Pending', color: '#F59E0B', bg: '#FEF3C7' },
  confirmed: { label: 'Confirmed', color: '#3B82F6', bg: '#EFF6FF' },
  preparing: { label: 'Preparing', color: '#8B5CF6', bg: '#F5F3FF' },
  ready: { label: 'Ready', color: '#5D9E30', bg: '#F0FDF4' },
  delivered: { label: 'Delivered', color: '#059669', bg: '#ECFDF5' },
  cancelled: { label: 'Cancelled', color: '#E53E3E', bg: '#FEE2E2' },
};
