"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EllipsisVerticalIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";

import {
  getStoredUser,
  logout,
  type AuthUser,
} from "@/services/api/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

function getInitials(name?: string) {
  if (!name) return "RA";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  const name = user?.name ?? "Restaurant Admin";
  const email = user?.email ?? "admin@restaurant.com";
  const initials = getInitials(name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-2xl hover:bg-orange-50 data-[state=open]:bg-orange-100 data-[state=open]:text-red-700"
            >
              <Avatar className="h-9 w-9 rounded-2xl">
                <AvatarFallback className="rounded-2xl bg-stone-950 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-stone-950">
                  {name}
                </span>
                <span className="truncate text-xs text-stone-500">
                  {email}
                </span>
              </div>

              <EllipsisVerticalIcon className="ml-auto size-4 text-stone-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 ml-2 rounded-md border-orange-100"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex items-center gap-3 rounded-xl bg-orange-50 px-3 py-2">
                <Avatar className="h-9 w-9 rounded-2xl">
                  <AvatarFallback className="rounded-2xl bg-stone-950 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid text-sm leading-tight">
                  <span className="font-bold text-stone-950">{name}</span>
                  <span className="text-xs text-stone-500">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem disabled>
              <ShieldCheckIcon />
              {user?.role === "admin" ? "Administrator" : "Staff"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}