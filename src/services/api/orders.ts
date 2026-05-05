import { apiClient } from "@/lib/api-client";
import type { Order } from "@/app/dashboard/orders/columns";
import type { OrderDetailsData } from "@/app/dashboard/orders/order-details";

export async function getOrders() {
  const res = await apiClient<Order[]>("/api/orders", {
    auth: true,
  });

  return res.data;
}

export async function getOrder(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Order ID is missing.");
  }

  const res = await apiClient<OrderDetailsData>(`/api/orders/${id}`, {
    auth: true,
  });

  return res.data;
}

export async function updateOrderStatus(
  id: string | number,
  status: OrderDetailsData["status"]
) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Order ID is missing.");
  }

  return apiClient<null>(`/api/orders/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status }),
  });
}

export async function deleteOrder(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Order ID is missing.");
  }

  return apiClient<null>(`/api/orders/${id}`, {
    method: "DELETE",
    auth: true,
  });
}