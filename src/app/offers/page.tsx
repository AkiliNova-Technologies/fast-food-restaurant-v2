"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OfferCard } from "@/components/offers/OfferCard";
import { Button } from "@/components/ui/button";
import { getPublicOffers, type PublicOffer } from "@/services/api/public";

export default function OffersPage() {
  const [offers, setOffers] = useState<PublicOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await getPublicOffers();
        setOffers(data);
      } catch (error) {
        console.error("Failed to load offers", error);
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
  }, []);

  return (
    <main className="bg-[#fff7ed]">
      <Navbar />

      <section className="relative overflow-hidden bg-stone-950 px-4 pb-14 pt-28 text-white sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.28),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.24),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-2 text-xs font-bold text-white sm:px-4 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Fresh deals and limited promos
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Offers made for bigger cravings.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base sm:leading-8">
            Save on burgers, chicken buckets, pizza combos, lunch meals, and
            family orders with our current restaurant deals.
          </p>

          <Button
            asChild
            className="mt-7 h-12 w-full rounded-full bg-red-600 px-6 font-bold text-white hover:bg-red-700 sm:w-fit sm:px-8"
          >
            <Link href="/menu">
              Browse Full Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm sm:tracking-[0.3em]">
              Available Deals
            </p>

            <h2 className="mt-2 text-3xl font-bold text-stone-950 sm:text-4xl">
              Current Offers
            </h2>
          </div>

          <p className="text-sm font-bold text-stone-500">
            {loading
              ? "Loading offers..."
              : `${offers.length} offer${offers.length === 1 ? "" : "s"} available`}
          </p>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse rounded-[1.5rem] bg-white sm:h-[410px] sm:rounded-[2rem]"
              />
            ))}
          </div>
        ) : offers.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5 xl:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-orange-100 bg-white p-6 text-center sm:mt-10 sm:rounded-[2rem] sm:p-10">
            <h3 className="text-xl font-bold text-stone-950 sm:text-2xl">
              No offers available
            </h3>
            <p className="mt-3 text-sm text-stone-500 sm:text-base">
              Check back later for new deals and promotions.
            </p>

            <Button
              asChild
              className="mt-6 h-11 w-full rounded-full bg-red-600 px-6 font-bold text-white hover:bg-red-700 sm:w-fit"
            >
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}