export interface Product {
  id: number;
  slug: string;
  category: string;
  name: string;
  price: string;
  img: string;
  description: string;
  items: string[];
}

export const products: Product[] = [
  // Small Bouquet
  {
    id: 1,
    slug: 'rose-whisper',
    category: 'small',
    name: 'Rose Whisper',
    price: 'Rp 85.000',
    img: '/bunga1.jpg',
    description: 'A delicate arrangement of fresh roses perfect for intimate occasions. Expertly curated with premium blooms.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 2,
    slug: 'tulip-dream',
    category: 'small',
    name: 'Tulip Dream',
    price: 'Rp 95.000',
    img: '/bunga2.jpg',
    description: 'Vibrant tulips arranged in a simple yet elegant style. Perfect for brightening any space.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 3,
    slug: 'daisy-fresh',
    category: 'small',
    name: 'Daisy Fresh',
    price: 'Rp 75.000',
    img: '/bunga3.jpg',
    description: `
A soft and elegant pastel bouquet, perfect as a gift for birthdays, graduations, or anniversaries. The gentle color palette creates a sweet and warm impression.
`,
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },

  // Medium Bouquet
  {
    id: 4,
    slug: 'rose-bliss',
    category: 'medium',
    name: 'Rose Bliss',
    price: 'Rp 125.000',
    img: '/bunga1.jpg',
    description: 'A beautifully balanced bouquet featuring our finest seasonal roses. Perfect for celebrations.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },

  {
    id: 5,
    slug: 'lily-elegance',
    category: 'medium',
    name: 'Lily Elegance',
    price: 'Rp 135.000',
    img: '/bunga2.jpg',
    description: 'Stunning lilies with sophisticated charm. Perfect for romantic moments and special events.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 6,
    slug: 'sunflower-joy',
    category: 'medium',
    name: 'Sunflower Joy',
    price: 'Rp 115.000',
    img: '/bunga3.jpg',
    description: 'Bright and cheerful sunflowers perfect for spreading happiness and positive vibes.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 7,
    slug: 'orchid-passion',
    category: 'medium',
    name: 'Orchid Passion',
    price: 'Rp 145.000',
    img: '/bunga4.jpg',
    description: 'Exotic orchids arranged with elegance and sophistication. A true statement piece.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  

  // Large Bouquet
  {
    id: 8,
    slug: 'premium-rose-garden',
    category: 'large',
    name: 'Premium Rose Garden',
    price: 'Rp 175.000',
    img: '/bunga1.jpg',
    description: 'An impressive arrangement with lush greenery and vibrant blooms. Ideal for grand occasions.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 9,
    slug: 'wildflower-cascade',
    category: 'large',
    name: 'Wildflower Cascade',
    price: 'Rp 165.000',
    img: '/bunga2.jpg',
    description: 'A beautiful mix of wildflowers creating a natural and romantic cascade effect.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 10,
    slug: 'luxury-exotic-blend',
    category: 'large',
    name: 'Luxury Exotic Blend',
    price: 'Rp 185.000',
    img: '/bunga3.jpg',
    description: 'A premium selection of exotic flowers creating a luxurious and unforgettable display.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },


  // Round Bouquet
  {
    id: 11,
    slug: 'sphere-elegance',
    category: 'round',
    name: 'Sphere Elegance',
    price: 'Rp 155.000',
    img: '/bunga1.jpg',
    description: 'Perfectly spherical arrangement of premium flowers. A classic choice for formal events.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 12,
    slug: 'globe-romance',
    category: 'round',
    name: 'Globe Romance',
    price: 'Rp 165.000',
    img: '/bunga2.jpg',
    description: 'A romantic spherical bouquet perfect for anniversaries and special romantic occasions.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],

  },
  {
    id: 13,
    slug: 'zen-sphere',
    category: 'round',
    name: 'Zen Sphere',
    price: 'Rp 160.000',
    img: '/bunga4.jpg',
    description: 'A minimalist round arrangement with calming, balanced aesthetics.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },

  // Money Bouquet
  {
    id: 14,
    slug: 'prosperity-bloom',
    category: 'money',
    name: 'Prosperity Bloom',
    price: 'Rp 225.000',
    img: '/bunga1.jpg',
    description: 'A unique and luxurious arrangement combining premium flowers with elegant accents. Perfect for celebrations.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],

  },
  {
    id: 15,
    slug: 'golden-abundance',
    category: 'money',
    name: 'Golden Abundance',
    price: 'Rp 245.000',
    img: '/bunga2.jpg',
    description: 'Radiant flowers with golden accents bringing prosperity and joy to any celebration.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 16,
    slug: 'luxury-crown',
    category: 'money',
    name: 'Luxury Crown',
    price: 'Rp 265.000',
    img: '/bunga3.jpg',
    description: 'A regal arrangement fit for royalty. Premium flowers with luxury packaging.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],

  },

  // Custom Bouquet
  {
    id: 17,
    slug: 'custom-romantic',
    category: 'custom',
    name: 'Custom Romantic',
    price: 'Rp 135.000',
    img: '/bunga1.jpg',
    description: 'Create your own romantic masterpiece. Mix and match your favorite flowers for a personalized touch.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 18,
    slug: 'custom-celebration',
    category: 'custom',
    name: 'Custom Celebration',
    price: 'Rp 155.000',
    img: '/bunga2.jpg',
    description: 'Design your perfect celebration bouquet with our unlimited customization options.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
  {
    id: 19,
    slug: 'custom-elegant',
    category: 'custom',
    name: 'Custom Elegant',
    price: 'Rp 175.000',
    img: '/bunga3.jpg',
    description: 'Craft an elegant arrangement tailored to your exact preferences and style.',
    items: [
      '5 white daisy stems',
      '3 baby’s breath stems',
      'Premium pastel paper wrapping',
      'Cream satin ribbon',
      'Custom greeting card',
    ],
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductBySlug(category: string, slug: string): Product | undefined {
  return products.find(p => p.category === category && p.slug === slug);
}