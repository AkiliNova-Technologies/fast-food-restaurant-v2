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
        setCategories(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm sm:tracking-[0.3em]">
              Categories
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
              Pick your craving.
            </h2>
          </div>

          <Link
            href="/menu"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-orange-50 px-5 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white sm:h-12"
          >
            View full menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[190px] animate-pulse rounded-[1.5rem] bg-orange-50 sm:h-[240px] sm:rounded-[2rem]"
              />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu?category=${category.slug}`}
                className="group overflow-hidden rounded-[1.5rem] bg-orange-50 p-3 transition hover:-translate-y-1 hover:shadow-xl sm:rounded-[2rem] sm:p-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-orange-100 sm:aspect-square sm:rounded-[1.5rem]">
                  <Image
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="line-clamp-1 text-base font-bold text-stone-950 sm:text-lg lg:text-xl">
                    {category.name}
                  </h3>

                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-red-600 transition group-hover:bg-red-600 group-hover:text-white sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-orange-100 bg-orange-50 p-6 text-center sm:rounded-[2rem] sm:p-8">
            <h3 className="text-lg font-bold text-stone-950 sm:text-xl">
              No categories available
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}