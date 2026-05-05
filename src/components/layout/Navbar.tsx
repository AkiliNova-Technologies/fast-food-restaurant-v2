"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChefHat, Menu, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

import { getCartItems } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function updateCartCount() {
      const items = getCartItems();
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? "h-16 max-w-5xl border-orange-100 bg-white/95 px-4 shadow-xl shadow-stone-950/10 backdrop-blur-xl"
            : "h-20 max-w-7xl border-white/70 bg-white/80 px-5 shadow-lg shadow-stone-950/5 backdrop-blur-xl"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            className={`grid place-items-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/25 transition-all duration-300 ${
              scrolled ? "h-10 w-10" : "h-12 w-12"
            }`}
          >
            <ChefHat className="h-5 w-5" />
          </div>

          <div>
            <p className="text-lg font-black leading-none text-stone-950">
              Fast Bite
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
              Food Rush
            </p>
          </div>
        </Link>

        <nav className="hidden items-center rounded-full bg-orange-50/80 p-1 md:flex">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/menu" && pathname.startsWith("/product"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-stone-600 hover:bg-white hover:text-red-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="relative hidden h-11 rounded-full bg-stone-950 px-6 font-bold text-white hover:bg-red-600 sm:inline-flex"
          >
            <Link href="/cart">
              <span className="relative mr-2">
                <ShoppingBag className="h-4 w-4" />

                {cartCount > 0 && (
                  <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
              My Orders
            </Link>
          </Button>

          <Link
            href="/cart"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-orange-50 text-stone-700 transition hover:bg-red-600 hover:text-white sm:hidden"
          >
            <ShoppingBag className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-orange-200 bg-white hover:bg-orange-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}