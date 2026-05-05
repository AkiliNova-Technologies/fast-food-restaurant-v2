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

  function handleAddToCart() {
  addToCart({
    id: Number(normalizedProduct.id),
    name: normalizedProduct.name,
    slug: normalizedProduct.slug,
    description: normalizedProduct.description,
    category: normalizedProduct.category,
    image: normalizedProduct.image,
    price: Number(normalizedProduct.price),
  });

  setIsAdded(true);

  window.setTimeout(() => {
    setIsAdded(false);
  }, 1400);
}

  const normalizedProduct = {
  ...product,
  category:
    typeof product.category === "object" && product.category !== null
      ? product.category.name
      : product.categoryName ||
        product.category_name ||
        product.category ||
        "Uncategorized",
  oldPrice: product.oldPrice ?? product.old_price,
  rating: Number(product.rating),
  price: Number(product.price),
  image: getImageUrl(product.image),
};

  if (variant === "list") {
    return (
      <Card className="group overflow-hidden rounded-[2rem] border-orange-100 bg-white py-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="grid gap-5 p-4 md:grid-cols-[220px_1fr_auto] md:items-center">
          <Link
            href={`/product/${product.slug}`}
            className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-orange-50 md:aspect-[4/3]"
          >
            <Image
              src={normalizedProduct.image}
              alt={normalizedProduct.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {normalizedProduct.badge && (
              <Badge className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-600">
                {normalizedProduct.badge}
              </Badge>
            )}
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="rounded-full border-orange-200 text-orange-700"
              >
                {normalizedProduct.category}
              </Badge>

              <div className="flex items-center gap-1 text-sm font-semibold text-orange-500">
                <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                {normalizedProduct.rating}
              </div>
            </div>

            <Link href={`/product/${normalizedProduct.slug}`}>
              <h3 className="mt-4 text-2xl font-bold text-stone-950 transition-colors hover:text-red-600">
                {normalizedProduct.name}
              </h3>
            </Link>

            <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
              {normalizedProduct.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setIsFavorite((current) => !current)}
              className={`rounded-full shadow-md ${
                isFavorite
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-orange-50 text-red-600 hover:bg-white"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>

            <div className="text-right">
              <p className="text-xl font-bold text-red-600">
                {formatPrice(normalizedProduct.price)}
              </p>

              {normalizedProduct.oldPrice && (
                <p className="text-sm font-medium text-stone-400 line-through">
                  {formatPrice(normalizedProduct.oldPrice)}
                </p>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              className={`rounded-full px-5 text-white ${
                isAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-stone-950 hover:bg-red-600"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden rounded-[2rem] border-orange-100 bg-white py-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-orange-50">
        <Link href={`/product/${normalizedProduct.slug}`}>
          <Image
            src={normalizedProduct.image}
            alt={normalizedProduct.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {normalizedProduct.badge && (
          <Badge className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-600">
            {normalizedProduct.badge}
          </Badge>
        )}

        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsFavorite((current) => !current)}
          className={`absolute right-4 top-4 rounded-full shadow-md ${
            isFavorite
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-white/90 text-red-600 hover:bg-white hover:text-red-700"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="flex items-center justify-between gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-orange-200 text-orange-700"
          >
            {normalizedProduct.category}
          </Badge>

          <div className="flex items-center gap-1 text-sm font-semibold text-orange-500">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            {normalizedProduct.rating}
          </div>
        </div>

        <div>
          <Link href={`/product/${normalizedProduct.slug}`}>
            <h3 className="line-clamp-1 text-lg font-bold text-stone-950 transition-colors hover:text-red-600">
              {normalizedProduct.name}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
            {normalizedProduct.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-red-600">
              {formatPrice(normalizedProduct.price)}
            </p>

            {normalizedProduct.oldPrice && (
              <p className="text-sm font-medium text-stone-400 line-through">
                {formatPrice(normalizedProduct.oldPrice)}
              </p>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            className={`rounded-full px-5 text-white ${
              isAdded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-stone-950 hover:bg-red-600"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}