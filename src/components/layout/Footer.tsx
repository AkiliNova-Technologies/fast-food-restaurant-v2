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
    <footer className="bg-stone-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-600 text-lg font-bold text-white">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none">FoodRush</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                Fast Bite
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-md leading-7 text-stone-400">
            Fresh fast food, bold flavors, quick delivery, and meals built for
            everyday cravings.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-4 space-y-3 text-sm text-stone-400">
            <Link href="/menu" className="block hover:text-white">
              Menu
            </Link>
            <Link href="/cart" className="block hover:text-white">
              Cart
            </Link>
            <Link href="/contact" className="block hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            <div className="mt-4 flex gap-3">
  {socialIcons.map((Icon, index) => (
    <div
      key={index}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-red-600"
    >
      <Icon size={18} stroke={2} />
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </footer>
  );
}