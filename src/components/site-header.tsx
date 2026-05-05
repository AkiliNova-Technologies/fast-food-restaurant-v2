"use client";

import { usePathname } from "next/navigation";
import { BellIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/categories": "Categories",
  "/dashboard/products": "Products",
  "/dashboard/offers": "Offers",
  "/dashboard/orders": "Orders",
  "/dashboard/messages": "Messages",
  "/dashboard/settings": "Settings",
};

function getPageTitle(pathname: string) {
  const match = Object.keys(titles)
    .sort((a, b) => b.length - a.length)
    .find((path) => pathname.startsWith(path));

  return match ? titles[match] : "Dashboard";
}

export function SiteHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center border-b border-orange-100 bg-white backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 rounded-xl text-stone-700 hover:bg-orange-100 hover:text-red-700" />

          <Separator
            orientation="vertical"
            className="bg-orange-200 data-[orientation=vertical]:h-5"
          />

          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-950">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl border-orange-200 bg-white text-stone-600 hover:bg-orange-50 hover:text-red-700"
          >
            <SearchIcon className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl border-orange-200 bg-white text-stone-600 hover:bg-orange-50 hover:text-red-700"
          >
            <BellIcon className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}