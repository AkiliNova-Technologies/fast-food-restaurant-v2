import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-stone-950 px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.3),transparent_35%)]" />

      <div className="relative mx-auto grid  max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative z-10 text-center lg:text-left">
          <Badge className="mx-auto rounded-full bg-red-600 px-4 py-3 text-xs text-white shadow-sm hover:bg-red-600 sm:text-sm lg:mx-0">
            <Flame className="mr-2 h-4 w-4 fill-orange-300 text-orange-300" />
            Hot meals delivered fresh
          </Badge>

          <h1 className="mx-auto mt-8 max-w-2xl text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:mx-0 lg:text-7xl">
            Fast food that hits different.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone-300 sm:text-lg sm:leading-8 lg:mx-0">
            Burgers, crispy chicken, pizza, loaded fries, and fresh drinks made
            for quick cravings, family orders, and late-night hunger.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-red-600 px-8 text-base font-bold text-white shadow-xl shadow-red-600/25 hover:bg-red-700"
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
              className="h-14 rounded-full border-white/15 bg-white/10 px-8 text-base font-bold text-white backdrop-blur hover:bg-white hover:text-stone-950"
            >
              <Link href="/#featured">View Best Sellers</Link>
            </Button>
          </div>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3 lg:mx-0">
            {[
              ["25+", "Menu Items"],
              ["30min", "Delivery"],
              ["4.9", "Rating"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold text-stone-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative mx-auto aspect-square w-full max-w-[360px] rounded-[2rem] bg-red-600 p-3 shadow-2xl shadow-red-600/20 sm:max-w-[520px] sm:rounded-[3rem] sm:p-5 lg:max-w-[620px]">
            <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-orange-100 sm:rounded-[2.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=1200&fit=crop"
                alt="Smoky beef burger"
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-4 left-3 max-w-[210px] rounded-2xl bg-white p-3 shadow-xl sm:-left-8 sm:bottom-10 sm:rounded-3xl sm:p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-orange-100 text-orange-600 sm:h-12 sm:w-12">
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

            <div className="absolute right-3 top-4 rounded-2xl bg-white p-3 shadow-xl sm:-right-8 sm:top-10 sm:rounded-3xl sm:p-4">
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