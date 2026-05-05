"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { getDashboardOverview, type DashboardOverview } from "@/services/api/dashboard";

function formatPrice(value: string | number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    async function loadOverview() {
      try {
        const data = await getDashboardOverview();
        setOverview(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load dashboard"
        );
      }
    }

    loadOverview();
  }, []);

  const stats = overview?.stats;

  return (
    <div className="flex flex-col gap-6">
      <SectionCards
        items={[
          {
            title: "Products",
            value: stats?.products ?? 0,
            description: "Total menu items available",
          },
          {
            title: "Orders Today",
            value: stats?.ordersToday ?? 0,
            description: "Orders received today",
          },
          {
            title: "Visitors",
            value: stats?.totalVisitors ?? 0,
            description: "Total website visits tracked",
          },
          {
            title: "Messages",
            value: stats?.unreadMessages ?? 0,
            description: "Unread customer messages",
          },
        ]}
      />

      <ChartAreaInteractive data={overview?.chartData ?? []} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-orange-100 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-950">Recent Orders</h2>

          <div className="mt-4 space-y-3">
            {overview?.recentOrders.length ? (
              overview.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-orange-100 bg-orange-50/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-stone-950">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-stone-500">{order.phone}</p>
                    </div>

                    <p className="font-bold text-red-600">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-stone-500">
                    <span>{order.receiptNumber ?? "No receipt"}</span>
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">No recent orders.</p>
            )}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-orange-100 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-950">Recent Messages</h2>

          <div className="mt-4 space-y-3">
            {overview?.recentMessages.length ? (
              overview.recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-lg border border-orange-100 bg-orange-50/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-bold text-stone-950">{message.name}</p>
                    <span className="text-xs capitalize text-orange-600">
                      {message.status}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-stone-500">
                    {message.subject || message.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">No recent messages.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}