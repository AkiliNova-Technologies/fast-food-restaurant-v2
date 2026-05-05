import { apiClient } from "@/lib/api-client";

export type DashboardOverview = {
  stats: {
    products: number;
    categories: number;
    ordersToday: number;
    unreadMessages: number;
    totalVisitors: number;
  };
  chartData: {
    date: string;
    visitors: number;
  }[];
  recentOrders: {
    id: number;
    customerName: string;
    phone: string;
    totalAmount: string | number;
    status: string;
    paymentStatus: string;
    receiptNumber: string | null;
    createdAt: string;
  }[];
  recentMessages: {
    id: number;
    name: string;
    subject: string | null;
    message: string;
    status: string;
    createdAt: string;
  }[];
};

export async function getDashboardOverview() {
  const res = await apiClient<DashboardOverview>("/api/dashboard", {
    auth: true,
  });

  return res.data;
}