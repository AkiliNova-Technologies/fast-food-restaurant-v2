"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  OrderDetails,
  type OrderDetailsData,
} from "@/app/dashboard/orders/order-details";
import { getOrder, updateOrderStatus } from "@/services/api/orders";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<OrderDetailsData | null>(null);
  const [status, setStatus] = useState<OrderDetailsData["status"]>("pending");

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await getOrder(params.id);
        setOrder(data);
        setStatus(data.status);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load order");
      }
    }

    loadOrder();
  }, [params.id]);

  async function handleSaveStatus() {
    if (!order) return;

    try {
      await updateOrderStatus(order.id, status);
      toast.success("Order status updated successfully");
      router.push("/dashboard/orders");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update order status");
    }
  }

  if (!order) {
    return <p className="text-sm text-stone-500">Loading order...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Order #${order.id}`}
        description="View customer details, ordered items and update preparation status."
        backHref="/dashboard/orders"
      />

      <OrderDetails
        order={order}
        status={status}
        onStatusChange={setStatus}
        onSaveStatus={handleSaveStatus}
      />
    </div>
  );
}