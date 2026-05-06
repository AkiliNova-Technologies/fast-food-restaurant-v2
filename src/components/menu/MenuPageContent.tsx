"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Grid3X3,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { ProductCard } from "@/components/food/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  getPublicCategories,
  getPublicProducts,
  type PublicCategory,
  type PublicProduct,
} from "@/services/api/public";

function getProductCategoryName(product: PublicProduct) {
  if (product.category_name) return product.category_name;
  if (product.categoryName) return product.categoryName;

  const category = (product as any).category;

  if (category && typeof category === "object") {
    return category.name;
  }

  return null;
}

export function MenuPageContent() {
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function loadMenuData() {
      try {
        const [categoryData, productData] = await Promise.all([
          getPublicCategories(),
          getPublicProducts(),
        ]);

        setCategories(categoryData);
        setProducts(productData);
      } catch (error) {
        console.error("Failed to load menu data", error);
      } finally {
        setLoading(false);
      }
    }

    loadMenuData();
  }, []);

  const categoryOptions = useMemo(
    () => ["All", ...categories.map((category) => category.name)],
    [categories],
  );

  useEffect(() => {
    const categorySlug = searchParams.get("category");

    if (!categorySlug || categories.length === 0) return;

    const matchedCategory = categories.find(
      (category) => category.slug === categorySlug,
    );

    if (matchedCategory) {
      setActiveCategory(matchedCategory.name);
    }
  }, [searchParams, categories]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(
        (product) => getProductCategoryName(product) === activeCategory,
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.description ?? "").toLowerCase().includes(query) ||
          (product.category_name ?? "").toLowerCase().includes(query),
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "high-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "rating") {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return result;
  }, [products, search, activeCategory, sort]);

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
    setSort("popular");
    setViewMode("grid");
  }

  const filterContent = (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-red-600" />
          <h2 className="text-lg font-bold text-stone-950">Filters</h2>
        </div>

        <p className="mt-2 text-sm leading-6 text-stone-500">
          Narrow down meals by category and craving.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">
          Categories
        </h3>

        <div className="mt-4 space-y-2">
          {categoryOptions.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                activeCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-orange-50 text-stone-700 hover:bg-orange-100"
              }`}
            >
              {category}
              <span className="text-xs opacity-70">
                {
                  products.filter((product) =>
                    category === "All"
                      ? true
                      : getProductCategoryName(product) === category,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={resetFilters}
        variant="outline"
        className="h-[48px] w-full rounded-full border-orange-200 font-bold hover:bg-orange-50"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>

      <div className="rounded-3xl bg-stone-950 p-5 text-white">
        <p className="text-sm font-bold text-orange-300">Special Offer</p>
        <h3 className="mt-2 text-2xl font-bold">
          Delicious deals you don’t want to miss.
        </h3>
        <p className="mt-3 text-sm leading-6 text-stone-300">
          Treat yourself to special offers made for every craving.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fff7ed]">
      <section className="relative overflow-hidden bg-stone-950 px-4 pt-28 pb-14 text-white sm:px-6 lg:px-8 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.25),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.2),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Badge className="bg-red-600 text-white px-3 py-1 text-xs sm:text-sm">
            Freshly prepared daily
          </Badge>

          <h1 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Explore our menu
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-stone-300 sm:text-base">
            Choose from smoky burgers, crispy chicken, loaded sides, pizza, and
            fresh drinks.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-8 lg:px-8">
        <aside className="hidden lg:block">
  <Card className="sticky top-24 rounded-2xl border border-orange-100 bg-white shadow-sm">
    <CardContent className="p-5">{filterContent}</CardContent>
  </Card>
</aside>

        <div>
          <div className="rounded-2xl border border-orange-100 bg-white p-3 sm:p-4">
  <div className="grid gap-3 md:grid-cols-[1fr_180px_auto] md:items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <Input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search meals..."
  className="h-11 rounded-full bg-orange-50 pl-10 text-sm"
/>
              </div>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="min-h-[52px] w-full rounded-full border-orange-100 bg-orange-50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="low-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-[52px] rounded-full border-orange-200 font-bold lg:hidden"
                    >
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="left" className="w-[320px] bg-white p-6">
                    <SheetHeader>
                      <SheetTitle className="text-left text-2xl font-bold">
                        Menu Filters
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-8">{filterContent}</div>
                  </SheetContent>
                </Sheet>

                <div className="hidden gap-2 md:flex">
                  <Button
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "default" : "outline"}
                    className={`rounded-full ${
                      viewMode === "grid"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "border-orange-200 bg-white text-stone-600 hover:bg-orange-50"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    onClick={() => setViewMode("list")}
                    variant={viewMode === "list" ? "default" : "outline"}
                    className={`rounded-full ${
                      viewMode === "list"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "border-orange-200 bg-white text-stone-600 hover:bg-orange-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {categoryOptions.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`shrink-0 rounded-full ${
                    activeCategory === category
                      ? "bg-red-600 hover:bg-red-700"
                      : "border-orange-200 bg-orange-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-stone-500">
                {loading
                  ? "Loading menu..."
                  : `Showing ${filteredProducts.length} item${
                      filteredProducts.length === 1 ? "" : "s"
                    }`}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-stone-950">
                {activeCategory === "All" ? "All Menu Items" : activeCategory}
              </h2>
            </div>

            {(search || activeCategory !== "All" || sort !== "popular") && (
              <Button
                onClick={resetFilters}
                variant="outline"
                className="w-fit rounded-full border-orange-200 font-bold hover:bg-orange-50"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {loading ? (
            <div
  className={
    viewMode === "grid"
      ? "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      : "mt-6 space-y-4"
  }
>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
  key={index}
  className="h-[320px] animate-pulse rounded-xl bg-white sm:h-[360px]"
/>
              ))}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  : "mt-8 space-y-5"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode}
                />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="mt-10 rounded-[2rem] border border-orange-100 bg-white p-10 text-center">
              <h3 className="text-2xl font-bold text-stone-950">
                No meals found
              </h3>
              <p className="mt-3 text-stone-500">
                Try another search term or category.
              </p>

              <Button
                onClick={resetFilters}
                className="mt-6 rounded-full bg-red-600 px-6 font-bold text-white hover:bg-red-700"
              >
                Reset Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
