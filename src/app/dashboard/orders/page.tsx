"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { getOrders } from "@/services/api/orders";
import { getOrderColumns, type Order } from "./columns";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const columns = useMemo(
    () =>
      getOrderColumns({
        onView: (order) => router.push(`/dashboard/orders/${order.id}`),
      }),
    [router]
  );

  return (
    <DataTable
      title="Orders"
      description="Track customer orders, totals, delivery details and preparation status."
      data={orders}
      columns={columns}
      loading={loading}
      searchKey="customer_name"
      searchPlaceholder="Search orders..."
    />
  );
}