"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";
import { useEffect, useState } from "react";

import { getImageUrl } from "@/lib/image-url";
import { getPublicOffers, type PublicOffer } from "@/services/api/public";
import { Button } from "@/components/ui/button";

export function PromoSection() {
  const [offer, setOffer] = useState<PublicOffer | null>(null);

  useEffect(() => {
    async function loadOffer() {
      try {
        const offers = await getPublicOffers();
        setOffer(offers[0] ?? null);
      } catch (error) {
        console.error("Failed to load promo offer", error);
      }
    }

    loadOffer();
  }, []);

  if (!offer) return null;

  return (
    <section
      id="offers"
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] bg-stone-950 shadow-2xl shadow-stone-950/10 sm:rounded-[2.25rem] lg:grid-cols-[0.95fr_1.05fr] lg:rounded-[3rem]">
        <div className="order-2 flex flex-col justify-center p-6 text-white sm:p-8 md:p-10 lg:order-1 lg:p-14">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30 sm:h-14 sm:w-14">
            <Percent className="h-5 w-5 sm:h-7 sm:w-7" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-orange-300 sm:mt-6 sm:text-sm sm:tracking-[0.3em]">
            Limited Offer
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {offer.title}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-stone-300 sm:text-base sm:leading-8">
            {offer.description}
          </p>

          <Button
            asChild
            size="lg"
            className="mt-6 h-12 w-full rounded-full bg-red-600 px-6 font-bold text-white hover:bg-red-700 sm:w-fit sm:h-[52px] sm:px-8"
          >
            <Link href="/menu">
              Order the Deal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="relative order-1 min-h-[220px] sm:min-h-[300px] md:min-h-[360px] lg:order-2 lg:min-h-[520px]">
          <Image
            src={getImageUrl(offer.image)}
            alt={offer.title}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-stone-950/30 lg:to-transparent" />
        </div>
      </div>
    </section>
  );
}