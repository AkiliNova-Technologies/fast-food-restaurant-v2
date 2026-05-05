import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password = await bcrypt.hash("admin12345", 12);

  await prisma.user.upsert({
    where: { email: "admin@restaurant.com" },
    update: {},
    create: {
      name: "Restaurant Admin",
      email: "admin@restaurant.com",
      password,
      role: "admin",
    },
  });

  const categoryData = [
    {
      name: "Burgers",
      slug: "burgers",
      sortOrder: 1,
    },
    {
      name: "Pizza",
      slug: "pizza",
      sortOrder: 2,
    },
    {
      name: "Chicken",
      slug: "chicken",
      sortOrder: 3,
    },
    {
      name: "Drinks",
      slug: "drinks",
      sortOrder: 4,
    },
    {
      name: "Sides",
      slug: "sides",
      sortOrder: 5,
    },
  ];

  for (const category of categoryData) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        sortOrder: category.sortOrder,
        isActive: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: `${category.name} menu category.`,
        sortOrder: category.sortOrder,
        isActive: true,
      },
    });
  }

  const categories = await prisma.category.findMany();

  const categoryMap = new Map(
    categories.map((category) => [category.name, category.id])
  );

  const productData = [
    {
      name: "Smoky Beef Burger",
      slug: "smoky-beef-burger",
      category: "Burgers",
      description:
        "Juicy grilled beef patty, cheese, lettuce, tomato, and smoky house sauce.",
      price: 28000,
      oldPrice: 34000,
      rating: 4.9,
      isFeatured: true,
      isAvailable: true,
      badge: "Best Seller",
    },
    {
      name: "Crispy Chicken Bucket",
      slug: "crispy-chicken-bucket",
      category: "Chicken",
      description:
        "Golden fried chicken pieces served with fries and signature dipping sauce.",
      price: 42000,
      oldPrice: null,
      rating: 4.8,
      isFeatured: true,
      isAvailable: true,
      badge: "Family Deal",
    },
    {
      name: "Pepperoni Pizza",
      slug: "pepperoni-pizza",
      category: "Pizza",
      description:
        "Stone-baked pizza topped with mozzarella, pepperoni, and tomato sauce.",
      price: 36000,
      oldPrice: 45000,
      rating: 4.7,
      isFeatured: true,
      isAvailable: true,
      badge: "Hot",
    },
    {
      name: "Loaded Fries",
      slug: "loaded-fries",
      category: "Sides",
      description:
        "Crispy fries topped with cheese sauce, grilled beef bits, and herbs.",
      price: 18000,
      oldPrice: null,
      rating: 4.6,
      isFeatured: false,
      isAvailable: true,
      badge: null,
    },
    {
      name: "Fresh Lemonade",
      slug: "fresh-lemonade",
      category: "Drinks",
      description:
        "Refreshing lemon drink served chilled with mint and citrus slices.",
      price: 9000,
      oldPrice: null,
      rating: 4.5,
      isFeatured: true,
      isAvailable: true,
      badge: null,
    },
  ];

  for (const product of productData) {
    const categoryId = categoryMap.get(product.category);

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        isFeatured: product.isFeatured,
        isAvailable: product.isAvailable,
        badge: product.badge,
        categoryId,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        isFeatured: product.isFeatured,
        isAvailable: product.isAvailable,
        badge: product.badge,
        categoryId,
      },
    });
  }

  const offerData = [
    {
      title: "Buy 2 Burgers, Get Fries Free",
      slug: "burger-fries-deal",
      description:
        "Order any two burgers and receive a free portion of loaded fries.",
      discountPercent: 0,
      isActive: true,
    },
    {
      title: "Family Chicken Bucket",
      slug: "family-chicken-bucket",
      description:
        "Crispy chicken bucket served with fries, dips, and chilled drinks.",
      discountPercent: 15,
      isActive: true,
    },
    {
      title: "Pizza Lunch Combo",
      slug: "pizza-lunch-combo",
      description:
        "Get a medium pizza, fries, and a fresh drink at a lunch-friendly price.",
      discountPercent: 0,
      isActive: true,
    },
  ];

  for (const offer of offerData) {
    await prisma.offer.upsert({
      where: { slug: offer.slug },
      update: offer,
      create: offer,
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });