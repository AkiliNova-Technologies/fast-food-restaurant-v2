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

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  sortOrder: number;
  isActive: number;
  created_at: string;
};

type CategoryColumnsProps = {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function getCategoryColumns({
  onEdit,
  onDelete,
}: CategoryColumnsProps): ColumnDef<Category>[] {
  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.original.image;

        return (
          <div className="relative size-12 overflow-hidden rounded-2xl bg-orange-50">
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
      header: "Category",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-stone-950">{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div>
          <p className="text-stone-950">{row.original.description}</p>
        </div>
      ),
    },
    {
      accessorKey: "sortOrder",
      header: "Order",
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
        const category = row.original;

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
                <DropdownMenuItem onClick={() => onEdit(category)}>
                  <PencilIcon className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(category)}
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