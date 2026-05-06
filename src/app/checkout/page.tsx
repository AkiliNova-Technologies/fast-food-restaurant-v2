"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCartItems,
  removeCartItem,
  saveCartItems,
  type CartItem,
} from "@/lib/cart";
import { getImageUrl } from "@/lib/image-url";

const DELIVERY_FEE = 5000;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  function increaseQuantity(id: number) {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      saveCartItems(updated);
      return updated;
    });
  }

  function decreaseQuantity(id: number) {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

      saveCartItems(updated);
      return updated;
    });
  }

  function removeItem(id: number) {
    const updated = removeCartItem(id);
    setCartItems(updated);
  }

  return (
    <main className="bg-[#fff7ed]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-12 mt-24 sm:px-6 sm:pb-16 lg:px-8 lg:pt-36">
        <Button
          asChild
          variant="ghost"
          className="mb-6 rounded-full px-0 font-bold text-stone-600 hover:bg-transparent hover:text-red-600 sm:px-4"
        >
          <Link href="/menu">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Ordering
          </Link>
        </Button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm sm:tracking-[0.3em]">
            Guest Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
            Complete Your Order
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-[1.5rem] border border-orange-100 bg-white p-6 text-center sm:rounded-[2rem] sm:p-10">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-red-600">
                  <ShoppingBag className="h-7 w-7" />
                </div>

                <h3 className="mt-4 text-xl font-bold text-stone-950">
                  Your cart is empty
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
                  Add some delicious meals to your cart before proceeding to
                  checkout.
                </p>

                <Button
                  asChild
                  className="mt-5 h-11 rounded-full bg-red-600 px-6 font-bold text-white hover:bg-red-700"
                >
                  <Link href="/menu">Browse Menu</Link>
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-[1.5rem] border border-orange-100 bg-white py-0 shadow-sm sm:rounded-[2rem]"
                >
                  <CardContent className="grid gap-4 p-4 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:p-5">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-orange-50 sm:w-[100px]">
                      <Image
                        src={getImageUrl(item.image) || "/placeholder-food.jpg"}
                        alt={item.name}
                        fill
                        unoptimized
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-orange-500">
                        {item.category}
                      </p>

                      <h2 className="mt-1 line-clamp-1 text-base font-bold text-stone-950 sm:text-lg">
                        {item.name}
                      </h2>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-stone-500 sm:text-sm">
                        {item.description}
                      </p>

                      <p className="mt-2 text-base font-bold text-red-600 sm:text-lg">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 rounded-full text-stone-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center rounded-full border border-orange-100 bg-orange-50 px-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => decreaseQuantity(item.id)}
                          className="h-8 w-8 rounded-full hover:bg-white"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-8 text-center text-sm font-bold text-stone-950">
                          {item.quantity}
                        </span>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => increaseQuantity(item.id)}
                          className="h-8 w-8 rounded-full hover:bg-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Card className="h-fit rounded-[1.5rem] border border-orange-100 bg-white sm:rounded-[2rem] lg:sticky lg:top-24">
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-xl font-bold text-stone-950 sm:text-2xl">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between font-bold text-stone-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between font-bold text-stone-500">
                  <span>Delivery</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>

                <div className="border-t border-orange-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-stone-950 sm:text-lg">
                      Total
                    </span>
                    <span className="text-xl font-bold text-red-600 sm:text-2xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                disabled={cartItems.length === 0}
                className="mt-6 h-11 w-full rounded-full bg-red-600 text-sm font-bold text-white shadow-xl shadow-red-600/20 hover:bg-red-700 disabled:pointer-events-none disabled:opacity-50 sm:h-12"
              >
                <Link href="/checkout">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Link>
              </Button>

              <p className="mt-4 text-center text-xs font-medium leading-6 text-stone-400">
                Review your cart, then continue to checkout to add delivery and
                payment details.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}