export type FoodCategory = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export type FoodProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  badge?: string;
};

export const categories: FoodCategory[] = [
  {
    id: "1",
    name: "Burgers",
    slug: "burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Pizza",
    slug: "pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Chicken",
    slug: "chicken",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Drinks",
    slug: "drinks",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=600&fit=crop",
  },
];

export const products: FoodProduct[] = [
  {
    id: "1",
    name: "Smoky Beef Burger",
    slug: "smoky-beef-burger",
    category: "Burgers",
    description: "Juicy grilled beef patty, cheese, lettuce, tomato, and smoky house sauce.",
    price: 28000,
    oldPrice: 34000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=900&fit=crop",
    isFeatured: true,
    isPopular: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Crispy Chicken Bucket",
    slug: "crispy-chicken-bucket",
    category: "Chicken",
    description: "Golden fried chicken pieces served with fries and signature dipping sauce.",
    price: 42000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&h=900&fit=crop",
    isFeatured: true,
    badge: "Family Deal",
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    slug: "pepperoni-pizza",
    category: "Pizza",
    description: "Stone-baked pizza topped with mozzarella, pepperoni, and tomato sauce.",
    price: 36000,
    oldPrice: 45000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=900&h=900&fit=crop",
    isFeatured: true,
    isPopular: true,
    badge: "Hot",
  },
  {
    id: "4",
    name: "Loaded Fries",
    slug: "loaded-fries",
    category: "Sides",
    description: "Crispy fries topped with cheese sauce, grilled beef bits, and herbs.",
    price: 18000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=900&h=900&fit=crop",
    isPopular: true,
  },
  {
    id: "5",
    name: "Fresh Lemonade",
    slug: "fresh-lemonade",
    category: "Drinks",
    description: "Refreshing lemon drink served chilled with mint and citrus slices.",
    price: 9000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=900&h=900&fit=crop",
    isFeatured: true,
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(price);
}

export type FoodOffer = {
  id: string;
  title: string;
  slug: string;
  description: string;
  discount: string;
  image: string;
  validUntil: string;
  tag: string;
};

export const offers: FoodOffer[] = [
  {
    id: "1",
    title: "Buy 2 Burgers, Get Fries Free",
    slug: "burger-fries-deal",
    description:
      "Order any two burgers and receive a free portion of loaded fries.",
    discount: "Free Fries",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=900&fit=crop",
    validUntil: "This Week",
    tag: "Burger Deal",
  },
  {
    id: "2",
    title: "Family Chicken Bucket",
    slug: "family-chicken-bucket",
    description:
      "Crispy chicken bucket served with fries, dips, and chilled drinks.",
    discount: "15% OFF",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=1200&h=900&fit=crop",
    validUntil: "Weekend Offer",
    tag: "Family Combo",
  },
  {
    id: "3",
    title: "Pizza Lunch Combo",
    slug: "pizza-lunch-combo",
    description:
      "Get a medium pizza, fries, and a fresh drink at a lunch-friendly price.",
    discount: "UGX 32,000",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=1200&h=900&fit=crop",
    validUntil: "Mon - Fri",
    tag: "Lunch Deal",
  },
];