"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getImageUrl } from "@/lib/image-url";

export type Product = {
  id: number;
  categoryId?: number | null;
  name: string;
  slug: string;
  description?: string | null;
  price: string | number;
  oldPrice?: string | number | null;
  image?: string | null;
  badge?: string | null;
  rating: string | number;
  isFeatured: number;
  isAvailable: number;
  createdAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
};

type ProductColumnsProps = {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function formatPrice(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";

  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function getProductColumns({
  onEdit,
  onDelete,
}: ProductColumnsProps): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.original.image;

        return (
          <div className="relative size-14 overflow-hidden rounded-2xl bg-orange-50">
            {image ? (
              <Image
                src={getImageUrl(image)}
                alt={row.original.name}
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
        );
      },
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-stone-950">{row.original.name}</p>
          <p className="text-xs text-stone-500">{row.original.slug}</p>
        </div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: "Category",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="rounded-full border-orange-200 text-orange-700"
        >
          {row.original.category.name || "Uncategorized"}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-red-600">
            {formatPrice(row.original.price)}
          </p>
          {row.original.oldPrice && (
            <p className="text-xs text-stone-400 line-through">
              {formatPrice(row.original.oldPrice)}
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.isFeatured
              ? "rounded-full bg-orange-100 text-orange-700 hover:bg-orange-100"
              : "rounded-full bg-stone-100 text-stone-600 hover:bg-stone-100"
          }
        >
          {row.original.isFeatured ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "isAvailable",
      header: "Availability",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.isAvailable
              ? "rounded-full bg-green-50 text-green-700 hover:bg-green-50"
              : "rounded-full bg-red-50 text-red-700 hover:bg-red-50"
          }
        >
          {row.original.isAvailable ? "Available" : "Unavailable"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-xl hover:bg-orange-50"
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="rounded-md w-[200px]">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <PencilIcon className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(product)}
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
