"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontalIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Order = {
  id: number;
  customer_name: string;
  phone: string;
  email?: string | null;
  delivery_address?: string | null;
  total_amount: string | number;
  status: "pending" | "accepted" | "preparing" | "completed" | "cancelled";
  notes?: string | null;
  created_at: string;
};

type OrderColumnsProps = {
  onView: (order: Order) => void;
};

function formatPrice(value: string | number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getStatusClass(status: Order["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-50 text-green-700 hover:bg-green-50";
    case "cancelled":
      return "bg-red-50 text-red-700 hover:bg-red-50";
    case "preparing":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100";
    case "accepted":
      return "bg-blue-50 text-blue-700 hover:bg-blue-50";
    default:
      return "bg-stone-100 text-stone-700 hover:bg-stone-100";
  }
}

function formatDate(value?: string | null) {
  if (!value) return "No expiry";

  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function getOrderColumns({
  onView,
}: OrderColumnsProps): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "id",
      header: "Order",
      cell: ({ row }) => (
        <p className="font-bold text-stone-950">#{row.original.id}</p>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-stone-950">
            {row.original.customer_name}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contact",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-stone-950">
            {row.original.phone}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => (
        <p className="font-bold text-red-600">
          {formatPrice(row.original.total_amount)}
        </p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={`rounded-full ${getStatusClass(row.original.status)}`}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-stone-600">{formatDate(row.original.created_at)}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-xl">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="rounded-md w-[200px]">
                <DropdownMenuItem onClick={() => onView(order)}>
                  <EyeIcon className="mr-2 size-4" />
                  View Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}