"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { getImageUrl } from "@/lib/image-url";
import {
  getPublicCategories,
  type PublicCategory,
} from "@/services/api/public";

export function CategorySection() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getPublicCategories();
        setCategories(data.slice(0, 4)); // limit to 4
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 sm:text-sm">
              Categories
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
              Pick your craving.
            </h2>
          </div>

          <Link
            href="/menu"
            className="flex w-fit items-center gap-2 rounded-full bg-orange-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            View full menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[200px] animate-pulse rounded-[2rem] bg-orange-50"
              />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu?category=${category.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-orange-50 p-3 transition hover:-translate-y-1 hover:shadow-xl sm:p-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-square">
                  <Image
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
                  <h3 className="text-lg font-bold text-stone-950 sm:text-xl">
                    {category.name}
                  </h3>

                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-orange-100 bg-orange-50 p-8 text-center">
            <h3 className="text-xl font-bold text-stone-950">
              No categories available
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}