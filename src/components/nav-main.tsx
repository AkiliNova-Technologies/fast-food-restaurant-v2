"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CirclePlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
        Management
      </SidebarGroupLabel>

      <SidebarGroupContent className="mt-2 flex flex-col gap-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              asChild
              className="h-11 w-full justify-start rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
            >
              <Link href="/dashboard/products/create">
                <CirclePlusIcon className="mr-2 size-4" />
                Add Product
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.url === "/dashboard"
                ? pathname === item.url
                : pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`h-11 rounded-2xl font-semibold transition-colors ${
                    isActive
                      ? "bg-orange-100 text-red-700 hover:bg-orange-100 hover:text-red-700"
                      : "text-stone-600 hover:bg-orange-50 hover:text-stone-950"
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}