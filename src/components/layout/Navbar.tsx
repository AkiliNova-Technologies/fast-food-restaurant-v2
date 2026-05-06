"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChefHat, Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { getCartItems } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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

  function isActiveLink(href: string) {
    return (
      pathname === href ||
      (href === "/menu" && pathname.startsWith("/product"))
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? "h-14 max-w-5xl border-orange-100 bg-white/95 px-3 shadow-xl shadow-stone-950/10 backdrop-blur-xl sm:h-16 sm:px-4"
            : "h-16 max-w-7xl border-white/70 bg-white/85 px-3 shadow-lg shadow-stone-950/5 backdrop-blur-xl sm:h-20 sm:px-5"
        }`}
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div
            className={`grid shrink-0 place-items-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/25 transition-all duration-300 ${
              scrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-10 w-10 sm:h-12 sm:w-12"
            }`}
          >
            <ChefHat className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black leading-none text-stone-950 sm:text-lg">
              Fast Bite
            </p>
            <p className="hidden text-xs font-bold uppercase tracking-[0.22em] text-orange-500 sm:block">
              Food Rush
            </p>
          </div>
        </Link>

        <nav className="hidden items-center rounded-full bg-orange-50/80 p-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                isActiveLink(item.href)
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-stone-600 hover:bg-white hover:text-red-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
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
            className="relative grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-stone-700 transition hover:bg-red-600 hover:text-white sm:hidden"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full border-orange-200 bg-white hover:bg-orange-50 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-orange-100 bg-white p-0 sm:w-[360px]"
            >
              <SheetHeader className="border-b border-orange-100 p-5 text-left">
                <div className="flex items-center justify-between gap-3">
                  <SheetTitle className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-600 text-white">
                      <ChefHat className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-lg font-black text-stone-950">
                        Fast Bite
                      </span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                        Food Rush
                      </span>
                    </span>
                  </SheetTitle>

                </div>
              </SheetHeader>

              <div className="p-5">
                <nav className="space-y-2">
                  {navLinks.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition ${
                          isActiveLink(item.href)
                            ? "bg-red-600 text-white"
                            : "bg-orange-50 text-stone-700 hover:bg-orange-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <SheetClose asChild>
                  <Button
                    asChild
                    className="mt-6 h-12 w-full rounded-full bg-stone-950 font-bold text-white hover:bg-red-600"
                  >
                    <Link href="/cart">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      View My Orders {cartCount > 0 ? `(${cartCount})` : ""}
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}