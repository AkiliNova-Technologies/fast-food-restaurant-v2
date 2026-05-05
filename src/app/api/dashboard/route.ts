import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const today = startOfToday();
    const last30Days = daysAgo(30);

    const [
      products,
      categories,
      ordersToday,
      unreadMessages,
      totalVisitors,
      recentOrders,
      recentMessages,
      visits,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count({ where: { isActive: true } }),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.contactMessage.count({ where: { status: "new" } }),
      prisma.siteVisit.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          customerName: true,
          phone: true,
          totalAmount: true,
          status: true,
          paymentStatus: true,
          receiptNumber: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          subject: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.siteVisit.findMany({
        where: { createdAt: { gte: last30Days } },
        select: { createdAt: true },
      }),
    ]);

    const visitMap = new Map<string, number>();

    for (let i = 0; i < 30; i++) {
      const date = daysAgo(29 - i);
      visitMap.set(formatDateKey(date), 0);
    }

    visits.forEach((visit) => {
      const key = formatDateKey(visit.createdAt);
      visitMap.set(key, (visitMap.get(key) ?? 0) + 1);
    });

    const chartData = Array.from(visitMap.entries()).map(([date, visitors]) => ({
      date,
      visitors,
    }));

    return successResponse("Dashboard overview retrieved successfully.", {
      stats: {
        products,
        categories,
        ordersToday,
        unreadMessages,
        totalVisitors,
      },
      chartData,
      recentOrders,
      recentMessages,
    });
  } catch {
    return errorResponse("Failed to retrieve dashboard overview.", 500);
  }
}