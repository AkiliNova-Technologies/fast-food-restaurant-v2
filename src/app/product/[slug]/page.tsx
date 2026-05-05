import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductCard } from "@/components/food/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, formatPrice } from "@/lib/food-data";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <main className="bg-[#fff7ed]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="mb-8 rounded-full font-bold text-stone-600 hover:bg-orange-100 hover:text-red-600"
        >
          <Link href="/menu">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[3rem] bg-white p-4 shadow-sm">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-orange-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {product.badge && (
              <Badge className="absolute left-8 top-8 rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-600">
                {product.badge}
              </Badge>
            )}
          </div>

          <div>
            <Badge
              variant="outline"
              className="rounded-full border-orange-200 bg-white px-4 py-2 text-orange-700"
            >
              {product.category}
            </Badge>

            <h1 className="mt-6 max-w-xl text-5xl font-bold leading-tight tracking-tight text-stone-950 sm:text-6xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-500">
                <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                {product.rating}
              </div>

              <p className="text-sm font-semibold text-stone-500">
                Freshly prepared after order
              </p>
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              {product.description}
            </p>

            <div className="mt-8 flex items-end gap-4">
              <p className="text-4xl font-bold text-red-600">
                {formatPrice(product.price)}
              </p>

              {product.oldPrice && (
                <p className="pb-1 text-lg font-bold text-stone-400 line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
            </div>

            <div className="mt-8 rounded-[2rem] border border-orange-100 bg-white p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">
                Quantity
              </p>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex w-fit items-center rounded-full border border-orange-100 bg-orange-50 p-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center text-lg font-bold text-stone-950">
                    1
                  </span>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="h-13 flex-1 rounded-full bg-red-600 px-8 text-base font-bold text-white shadow-xl shadow-red-600/20 hover:bg-red-700 sm:flex-none">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Fresh Ingredients", "Fast Delivery", "Secure Checkout"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white p-4 text-sm font-bold text-stone-700 shadow-sm"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              You may also like
            </p>
            <h2 className="mt-3 text-4xl font-bold text-stone-950">
              More from {product.category}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}