import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-stone-950 px-4 pb-12 pt-24 text-white sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-20 lg:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.28),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.24),transparent_36%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
        <div className="relative z-10 text-center lg:text-left">
          <Badge className="mx-auto rounded-full bg-red-600 px-3 py-2 text-xs text-white shadow-sm hover:bg-red-600 sm:px-4 sm:text-sm lg:mx-0">
            <Flame className="mr-2 h-4 w-4 fill-orange-300 text-orange-300" />
            Hot meals delivered fresh
          </Badge>

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
            Fast food that hits different.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-300 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
            Burgers, crispy chicken, pizza, loaded fries, and fresh drinks made
            for quick cravings, family orders, and late-night hunger.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-red-600 px-6 text-sm font-bold text-white shadow-xl shadow-red-600/25 hover:bg-red-700 sm:h-14 sm:px-8 sm:text-base"
            >
              <Link href="/menu">
                Explore Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur hover:bg-white hover:text-stone-950 sm:h-14 sm:px-8 sm:text-base"
            >
              <Link href="/#featured">View Best Sellers</Link>
            </Button>
          </div>

          <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-2 sm:mt-10 sm:max-w-lg sm:gap-3 lg:mx-0">
            {[
              ["25+", "Menu Items"],
              ["30min", "Delivery"],
              ["4.9", "Rating"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur sm:rounded-3xl sm:p-4"
              >
                <p className="text-lg font-bold text-white sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-stone-300 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 lg:justify-self-end">
          <div className="relative mx-auto aspect-square w-full max-w-[320px] rounded-[1.75rem] bg-red-600 p-3 shadow-2xl shadow-red-600/20 sm:max-w-[460px] sm:rounded-[2.5rem] sm:p-4 lg:max-w-[580px] lg:rounded-[3rem] lg:p-5">
            <div className="relative h-full overflow-hidden rounded-[1.25rem] bg-orange-100 sm:rounded-[2rem] lg:rounded-[2.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=1200&fit=crop"
                alt="Smoky beef burger"
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-3 left-3 max-w-[190px] rounded-2xl bg-white p-3 shadow-xl sm:-left-6 sm:bottom-8 sm:max-w-[220px] sm:rounded-3xl sm:p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-orange-100 text-orange-600 sm:h-12 sm:w-12">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-950 sm:text-sm">
                    Quick Delivery
                  </p>
                  <p className="text-[11px] font-semibold text-stone-500 sm:text-xs">
                    Fresh in 30 minutes
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-3 top-3 rounded-2xl bg-white p-3 shadow-xl sm:-right-6 sm:top-8 sm:rounded-3xl sm:p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-orange-400 text-orange-400 sm:h-5 sm:w-5" />
                <span className="text-xs font-bold text-stone-950 sm:text-sm">
                  4.9 Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}