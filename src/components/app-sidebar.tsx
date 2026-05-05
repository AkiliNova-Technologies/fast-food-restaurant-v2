"use client";

import * as React from "react";
import {
  BadgePercentIcon,
  ChefHatIcon,
  CircleHelpIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MailIcon,
  Settings2Icon,
  ShoppingBagIcon,
  TagsIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Restaurant Admin",
    email: "admin@restaurant.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <TagsIcon />,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: <ShoppingBagIcon />,
    },
    {
      title: "Offers",
      url: "/dashboard/offers",
      icon: <BadgePercentIcon />,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: <MailIcon />,
    },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "/dashboard/settings",
    //   icon: <Settings2Icon />,
    // },
    // {
    //   title: "Help",
    //   url: "/dashboard/help",
    //   icon: <CircleHelpIcon />,
    // },
    // {
    //   title: "Logout",
    //   url: "/login",
    //   icon: <LogOutIcon />,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-orange-100 bg-white"
      {...props}
    >
      <SidebarHeader className="border-b border-orange-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-14 rounded-2xl px-3 hover:bg-orange-50"
            >
              <a href="/dashboard">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-red-600 text-white">
                  <ChefHatIcon className="size-5" />
                </div>

                <div className="grid leading-tight">
                  <span className="text-base font-bold text-stone-950">
                    Food Admin
                  </span>
                  <span className="text-xs font-medium text-stone-500">
                    Restaurant Control
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="border-t border-orange-100">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}