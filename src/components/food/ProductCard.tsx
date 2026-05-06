"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/lib/image-url";
import { addToCart } from "@/lib/cart";

type ProductCardProps = {
  product: any;
  variant?: "grid" | "list";
};

function formatPrice(value: string | number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const normalizedProduct = {
    ...product,
    category:
      typeof product.category === "object"
        ? product.category?.name
        : product.categoryName ||
          product.category_name ||
          product.category ||
          "Uncategorized",
    oldPrice: product.oldPrice ?? product.old_price,
    rating: Number(product.rating),
    price: Number(product.price),
    image: getImageUrl(product.image),
  };

  function handleAddToCart() {
    addToCart({
      id: Number(normalizedProduct.id),
      name: normalizedProduct.name,
      slug: normalizedProduct.slug,
      description: normalizedProduct.description,
      category: normalizedProduct.category,
      image: normalizedProduct.image,
      price: normalizedProduct.price,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  }

  /* ================= LIST VIEW ================= */
  if (variant === "list") {
    return (
      <Card className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="grid gap-4 p-4 sm:gap-5 md:grid-cols-[180px_1fr_auto] md:items-center">
          {/* Image */}
          <Link
            href={`/product/${normalizedProduct.slug}`}
            className="relative aspect-square overflow-hidden rounded-xl bg-orange-50 md:aspect-[4/3]"
          >
            <Image
              src={normalizedProduct.image}
              alt={normalizedProduct.name}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            {normalizedProduct.badge && (
              <Badge className="absolute left-3 top-3 bg-red-600 text-white">
                {normalizedProduct.badge}
              </Badge>
            )}
          </Link>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-orange-200 text-orange-700">
                {normalizedProduct.category}
              </Badge>

              <span className="flex items-center gap-1 text-sm font-semibold text-orange-500">
                <Star className="h-4 w-4 fill-orange-400" />
                {normalizedProduct.rating}
              </span>
            </div>

            <Link href={`/product/${normalizedProduct.slug}`}>
              <h3 className="mt-3 text-lg font-bold text-stone-950 hover:text-red-600 sm:text-xl">
                {normalizedProduct.name}
              </h3>
            </Link>

            <p className="mt-2 line-clamp-2 text-sm text-stone-500">
              {normalizedProduct.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setIsFavorite((v) => !v)}
              className={`rounded-full ${
                isFavorite
                  ? "bg-red-600 text-white"
                  : "bg-orange-50 text-red-600"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>

            <div className="text-right">
              <p className="text-lg font-bold text-red-600 sm:text-xl">
                {formatPrice(normalizedProduct.price)}
              </p>

              {normalizedProduct.oldPrice && (
                <p className="text-xs text-stone-400 line-through">
                  {formatPrice(normalizedProduct.oldPrice)}
                </p>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              className={`rounded-full px-4 text-sm text-white ${
                isAdded
                  ? "bg-green-600"
                  : "bg-stone-950 hover:bg-red-600"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-1 h-4 w-4" /> Add
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ================= GRID VIEW ================= */
  return (
    <Card className="group overflow-hidden rounded-2xl py-0 border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-orange-50">
        <Link href={`/product/${normalizedProduct.slug}`}>
          <Image
            src={normalizedProduct.image}
            alt={normalizedProduct.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        {normalizedProduct.badge && (
          <Badge className="absolute left-3 top-3 bg-red-600 text-white">
            {normalizedProduct.badge}
          </Badge>
        )}

        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsFavorite((v) => !v)}
          className={`absolute right-3 top-3 rounded-full ${
            isFavorite
              ? "bg-red-600 text-white"
              : "bg-white/90 text-red-600"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Content */}
      <CardContent className="space-y-3 px-4 pb-4 sm:px-5 sm:pt-0 sm:pb-5">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <Badge variant="outline" className="border-orange-200 text-orange-700">
            {normalizedProduct.category}
          </Badge>

          <span className="flex items-center gap-1 font-semibold text-orange-500">
            <Star className="h-4 w-4 fill-orange-400" />
            {normalizedProduct.rating}
          </span>
        </div>

        <div>
          <Link href={`/product/${normalizedProduct.slug}`}>
            <h3 className="line-clamp-1 text-base font-bold text-stone-950 hover:text-red-600 sm:text-lg">
              {normalizedProduct.name}
            </h3>
          </Link>

          <p className="mt-1 line-clamp-2 text-xs text-stone-500 sm:text-sm">
            {normalizedProduct.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-red-600 sm:text-xl">
              {formatPrice(normalizedProduct.price)}
            </p>

            {normalizedProduct.oldPrice && (
              <p className="text-xs text-stone-400 line-through">
                {formatPrice(normalizedProduct.oldPrice)}
              </p>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`rounded-full px-4 text-white ${
              isAdded
                ? "bg-green-600"
                : "bg-stone-950 hover:bg-red-600"
            }`}
          >
            {isAdded ? "Added" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}