"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/food/ProductCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, type PublicProduct } from "@/services/api/public";

export function BestProductsSection() {
  const [featuredProducts, setFeaturedProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await getFeaturedProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <section
      id="featured"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 sm:text-sm">
              Best Sellers
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
              Customer favorites, cooked fresh every day.
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-[48px] w-fit rounded-full border-orange-200 px-6 font-bold hover:bg-orange-50"
          >
            <Link
            href="/menu"
            className="flex w-fit items-center gap-2 rounded-full bg-orange-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            View full menu
            <ArrowRight className="h-4 w-4" />
          </Link>
          </Button>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-[2rem] bg-orange-50"
              />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-orange-100 bg-orange-50 p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-950">
              No featured meals yet
            </h3>
            <p className="mt-2 text-stone-500">
              Mark products as featured from the dashboard to show them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}