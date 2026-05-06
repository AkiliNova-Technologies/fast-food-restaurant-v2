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
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm sm:tracking-[0.3em]">
              Best Sellers
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
              Customer favorites, cooked fresh every day.
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-11 w-fit rounded-full border-orange-200 bg-orange-50 px-5 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white sm:h-12"
          >
            <Link href="/menu">
              View full menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse rounded-[1.5rem] bg-orange-50 sm:h-[400px] sm:rounded-[2rem]"
              />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-orange-100 bg-orange-50 p-6 text-center sm:rounded-[2rem] sm:p-8">
            <h3 className="text-xl font-bold text-stone-950 sm:text-2xl">
              No featured meals yet
            </h3>
            <p className="mt-2 text-sm text-stone-500 sm:text-base">
              Mark products as featured from the dashboard to show them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}