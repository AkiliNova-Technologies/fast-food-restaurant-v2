"use client";

import { ClipboardListIcon, MapPinIcon, PhoneIcon, SaveIcon } from "lucide-react";

import { FormCard } from "@/components/dashboard/forms/form-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OrderItem = {
  id: number;
  product_id: number | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type OrderDetailsData = {
  id: number;
  customer_name: string;
  phone: string;
  email?: string | null;
  delivery_address?: string | null;
  total_amount: number;
  status: "pending" | "accepted" | "preparing" | "completed" | "cancelled";
  notes?: string | null;
  created_at: string;
  items: OrderItem[];
};

type OrderDetailsProps = {
  order: OrderDetailsData;
  status: OrderDetailsData["status"];
  onStatusChange: (status: OrderDetailsData["status"]) => void;
  onSaveStatus: () => void;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusClass(status: OrderDetailsData["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-50 text-green-700";
    case "cancelled":
      return "bg-red-50 text-red-700";
    case "preparing":
      return "bg-orange-100 text-orange-700";
    case "accepted":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-stone-100 text-stone-700";
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

export function OrderDetails({
  order,
  status,
  onStatusChange,
  onSaveStatus,
}: OrderDetailsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <FormCard>
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 border-b border-orange-100 pb-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold text-stone-500">Order #{order.id}</p>
              <h2 className="mt-1 text-2xl font-bold text-stone-950">
                {order.customer_name}
              </h2>
            </div>

            <Badge className={`w-fit rounded-full px-3 py-1 ${statusClass(order.status)}`}>
              {order.status}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-4">
              <PhoneIcon className="size-5 text-orange-500" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Phone
              </p>
              <p className="mt-1 font-bold text-stone-950">{order.phone}</p>
            </div>

            <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-4 md:col-span-2">
              <MapPinIcon className="size-5 text-orange-500" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Delivery Address
              </p>
              <p className="mt-1 font-bold text-stone-950">
                {order.delivery_address || "No delivery address provided"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-stone-950">Ordered Items</h3>

            <div className="mt-4 overflow-hidden rounded-lg border border-orange-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-3 border-b border-orange-100 p-4 last:border-b-0 md:grid-cols-[1fr_auto_auto]"
                >
                  <div>
                    <p className="font-bold text-stone-950">{item.product_name}</p>
                  </div>

                  <p className="font-bold text-stone-600">Qty: {item.quantity}</p>

                  <p className="font-bold text-red-600">
                    {formatPrice(item.line_total)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {order.notes && (
            <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Customer Notes
              </p>
              <p className="mt-2 text-sm text-stone-700">{order.notes}</p>
            </div>
          )}
        </div>
      </FormCard>

      <div className="space-y-6">
        <FormCard>
          <div className="space-y-5">
            <div>
              <ClipboardListIcon className="size-6 text-orange-500" />
              <h3 className="mt-3 text-xl font-bold text-stone-950">
                Order Status
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                Update the current preparation or delivery state.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Status</Label>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="min-h-12 w-full rounded-2xl border-orange-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-md p-2">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={onSaveStatus}
              className="h-12 w-full rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
            >
              <SaveIcon className="mr-2 size-4" />
              Save Status
            </Button>
          </div>
        </FormCard>

        <FormCard>
          <p className="text-sm font-bold text-stone-500">Order Total</p>
          <p className="mt-2 text-4xl font-bold text-red-600">
            {formatPrice(order.total_amount)}
          </p>
          <p className="mt-2 text-xs text-stone-500">
            Created on {formatDate(order.created_at)}
          </p>
        </FormCard>
      </div>
    </div>
  );
}