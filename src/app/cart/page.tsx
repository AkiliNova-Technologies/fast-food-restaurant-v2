"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CartPage() {
  const DELIVERY_FEE = 5000;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  function increaseQuantity(id: number) {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
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
          : item,
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

      <section className="mx-auto max-w-7xl px-4 py-10 pt-24 sm:px-6 sm:pt-36 lg:px-8 lg:pt-36">
        <Button
          asChild
          variant="ghost"
          className="mb-8 rounded-full font-bold text-stone-600 hover:bg-orange-100 hover:text-red-600"
        >
          <Link href="/menu">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Ordering
          </Link>
        </Button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Guest Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Complete Your Order
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="rounded-[1.5rem] border border-orange-100 bg-white shadow-sm sm:rounded-[2rem]"
              >
                <CardContent className="grid gap-4 p-4 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:p-5">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-orange-50 sm:w-[100px]">
                    <Image
                      src={getImageUrl(item.image) || "/placeholder-food.jpg"}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-orange-500">
                      {item.category}
                    </p>

                    <h2 className="mt-1 text-base font-bold text-stone-950 sm:text-lg">
                      {item.name}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-xs text-stone-500 sm:text-sm">
                      {item.description}
                    </p>

                    <p className="mt-2 text-base font-bold text-red-600 sm:text-lg">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
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

                      <span className="w-8 text-center text-sm font-bold">
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
            ))}

            {cartItems.length === 0 && (
              <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center sm:p-10">
                <h3 className="text-lg font-bold sm:text-xl">
                  Your cart is empty
                </h3>

                <p className="mt-2 text-sm text-stone-500">
                  Add some delicious meals to get started.
                </p>

                <Button
                  asChild
                  className="mt-4 rounded-full bg-red-600 text-white"
                >
                  <Link href="/menu">Browse Menu</Link>
                </Button>
              </div>
            )}
          </div>

          <Card className="h-fit rounded-[1.5rem] border border-orange-100 bg-white lg:sticky lg:top-24 sm:rounded-[2rem]">
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-2xl font-bold text-stone-950">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-stone-500">
                  <span>Delivery</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-stone-950">Total</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Button
                asChild
                disabled={cartItems.length === 0}
                className="mt-6 h-11 w-full rounded-full bg-red-600 text-sm font-bold text-white hover:bg-red-700"
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
