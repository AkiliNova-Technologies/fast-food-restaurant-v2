import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";

import { getImageUrl } from "@/lib/image-url";
import type { PublicOffer } from "@/services/api/public";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type OfferCardProps = {
  offer: PublicOffer;
};

function formatDate(value?: string | null) {
  if (!value) return "Limited time";

  return new Intl.DateTimeFormat("en-UG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="group overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white py-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:rounded-[2rem]">
      <div className="relative aspect-[4/3] overflow-hidden bg-orange-50 sm:aspect-[16/10]">
        <Image
          src={getImageUrl(offer.image)}
          alt={offer.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
          {offer.discountPercent ?? offer.discount_percent ?? 0}% OFF
        </div>
      </div>

      <CardContent className="space-y-4 px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700">
            <Tag className="h-4 w-4" />
            Special Deal
          </div>

          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-stone-600">
            <CalendarDays className="h-4 w-4" />
            Until {formatDate(offer.expiresAt ?? offer.expires_at)}
          </div>
        </div>

        <div>
          <h2 className="line-clamp-2 text-xl font-bold leading-tight text-stone-950 sm:text-2xl">
            {offer.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-500 sm:text-base sm:leading-7">
            {offer.description}
          </p>
        </div>

        <Button
          asChild
          className="h-11 w-full rounded-full bg-stone-950 px-5 text-sm font-bold text-white hover:bg-red-600 sm:w-fit"
        >
          <Link href="/menu">
            Order Deal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}