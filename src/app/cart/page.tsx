"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
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

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-36">
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

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Guest Checkout
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-stone-950">
            Complete Your Order
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="rounded-[2rem] border-orange-100 bg-white py-0"
              >
                <CardContent className="grid gap-5 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                  <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-orange-50">
                    <Image
                      src={getImageUrl(item.image) || "/placeholder-food.jpg"}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-orange-600">
                      {item.category}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-stone-950">
                      {item.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
                      {item.description}
                    </p>

                    <p className="mt-3 text-lg font-bold text-red-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full text-stone-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center rounded-full border border-orange-100 bg-orange-50 p-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => decreaseQuantity(item.id)}
                        className="h-9 w-9 rounded-full hover:bg-white"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-10 text-center font-bold text-stone-950">
                        {item.quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => increaseQuantity(item.id)}
                        className="h-9 w-9 rounded-full hover:bg-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit rounded-[2rem] bg-white lg:sticky lg:top-24">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-stone-950">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm font-bold text-stone-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-500">
                  <span>Delivery</span>
                  <span>
                    {cartItems.length > 0
                      ? formatPrice(DELIVERY_FEE)
                      : formatPrice(0)}
                  </span>
                </div>

                <div className="border-t border-orange-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-stone-950">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                disabled={cartItems.length === 0}
                className="mt-8 h-[52px] w-full rounded-full bg-red-600 text-base font-bold text-white shadow-xl shadow-red-600/20 hover:bg-red-700"
              >
                <Link href="/checkout">
                  <ShoppingBag className="mr-2 h-5 w-5" />
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
