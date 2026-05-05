"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getImageUrl } from "@/lib/image-url";

export type Offer = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  discountPercent: number;
  image?: string | null;
  startsAt?: string | null;
  expiresAt?: string | null;
  isActive: boolean;
  createdAt: string;
};

type OfferColumnsProps = {
  onEdit: (offer: Offer) => void;
  onDelete: (offer: Offer) => void;
};

function formatDate(value?: string | null) {
  if (!value) return "No expiry";

  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function getOfferColumns({
  onEdit,
  onDelete,
}: OfferColumnsProps): ColumnDef<Offer>[] {
  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative size-14 overflow-hidden rounded-2xl bg-orange-50">
          {row.original.image ? (
            <Image
              src={getImageUrl(row.original.image)}
              alt={row.original.title}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs font-bold text-orange-500">
              N/A
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Offer",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-stone-950">{row.original.title}</p>
          <p className="text-xs text-stone-500">{row.original.slug}</p>
        </div>
      ),
    },
     {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-sm">
          <p className="text-stone-950 text-wrap line-clamp-2 ">{row.original.description}</p>
        </div>
      ),
    },
    {
      accessorKey: "discountPercent",
      header: "Discount",
      cell: ({ row }) => (
        <Badge className="rounded-full bg-orange-100 text-orange-700 hover:bg-orange-100">
          {row.original.discountPercent}% OFF
        </Badge>
      ),
    },
    {
      accessorKey: "expiresAt",
      header: "Expires",
      cell: ({ row }) => (
        <span className="text-sm text-stone-600">
          {formatDate(row.original.expiresAt)}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.isActive
              ? "rounded-full bg-green-50 text-green-700 hover:bg-green-50"
              : "rounded-full bg-red-50 text-red-700 hover:bg-red-50"
          }
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const offer = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-xl">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="rounded-md w-[200px]">
                <DropdownMenuItem onClick={() => onEdit(offer)}>
                  <PencilIcon className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(offer)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2Icon className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}