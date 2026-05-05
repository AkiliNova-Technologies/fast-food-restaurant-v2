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
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-stone-950 lg:grid-cols-2 lg:rounded-[3rem]">
        <div className="flex flex-col justify-center p-6 text-white sm:p-10 lg:p-14">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-600 sm:h-14 sm:w-14">
            <Percent className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-300 sm:text-sm">
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
            className="mt-6 h-[52px] w-fit rounded-full bg-red-600 px-6 font-bold text-white hover:bg-red-700 sm:mt-8 sm:px-8"
          >
            <Link href="/menu">
              Order the Deal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-full">
          <Image
            src={getImageUrl(offer.image)}
            alt={offer.title}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}