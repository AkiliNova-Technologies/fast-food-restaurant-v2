import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { ChefHat } from "lucide-react";

export function Footer() {
  const socialIcons = [
    IconBrandInstagram,
    IconBrandFacebook,
    IconBrandX,
  ];

  return (
    <footer className="bg-stone-950 px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4 md:col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-red-600 text-white shadow-lg sm:h-11 sm:w-11">
              <ChefHat className="h-5 w-5" />
            </div>

            <div>
              <p className="text-base font-bold leading-none sm:text-lg">
                FoodRush
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400 sm:text-xs">
                Fast Bite
              </p>
            </div>
          </Link>

          <p className="max-w-md text-sm leading-6 text-stone-400 sm:text-base sm:leading-7">
            Fresh fast food, bold flavors, quick delivery, and meals built for
            everyday cravings.
          </p>
        </div>

        {/* Explore */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Explore
          </h3>

          <div className="flex flex-col gap-2 text-sm text-stone-400">
            <Link href="/menu" className="hover:text-white transition">
              Menu
            </Link>
            <Link href="/cart" className="hover:text-white transition">
              Cart
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Follow Us
          </h3>

          <div className="flex gap-3">
            {socialIcons.map((Icon, index) => (
              <div
                key={index}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-red-600 sm:h-11 sm:w-11"
              >
                <Icon size={18} stroke={2} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-stone-500 sm:mt-10 sm:text-sm">
        © {new Date().getFullYear()} FoodRush. All rights reserved by AkiliNova Technologies.
      </div>
    </footer>
  );
}