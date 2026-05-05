"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Message = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: "new" | "read" | "resolved";
  createdAt: string;
};

type MessageColumnsProps = {
  onView: (message: Message) => void;
  onDelete: (message: Message) => void;
};

function getStatusClass(status: Message["status"]) {
  switch (status) {
    case "resolved":
      return "bg-green-50 text-green-700 hover:bg-green-50";
    case "read":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100";
    default:
      return "bg-red-50 text-red-700 hover:bg-red-50";
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

export function getMessageColumns({
  onView,
  onDelete,
}: MessageColumnsProps): ColumnDef<Message>[] {
  return [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-stone-950">{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <p className="text-sm text-stone-500">
            {row.original.email || row.original.phone || "No contact"}
          </p>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <span className="text-sm text-stone-700">
          {row.original.subject || "General message"}
        </span>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <p className="max-w-md truncate text-sm text-stone-500">
          {row.original.message}
        </p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={`rounded-full ${getStatusClass(row.original.status)}`}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-stone-600">{formatDate(row.original.createdAt)}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const message = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-xl">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="rounded-md w-[200px]">
                <DropdownMenuItem onClick={() => onView(message)}>
                  <EyeIcon className="mr-2 size-4" />
                  View Message
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(message)}
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