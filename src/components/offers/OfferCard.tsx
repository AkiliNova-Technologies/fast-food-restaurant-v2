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
    <Card className="group overflow-hidden rounded-[2rem] border-orange-100 bg-white py-0 pb-6 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-72 overflow-hidden bg-orange-50">
        <Image
          src={getImageUrl(offer.image)}
          alt={offer.title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
          {offer.discount_percent}% OFF
        </div>
      </div>

      <CardContent className="px-6">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700">
            <Tag className="h-4 w-4" />
            Special Deal
          </div>

          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-stone-600">
            <CalendarDays className="h-4 w-4" />
            Until {formatDate(offer.expiresAt)}
          </div>
        </div>

        <h2 className="mt-5 text-2xl font-bold leading-tight text-stone-950">
          {offer.title}
        </h2>

        <p className="mt-3 leading-7 text-stone-500">{offer.description}</p>

        <Button
          asChild
          className="mt-6 rounded-full bg-stone-950 px-6 text-white hover:bg-red-600"
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