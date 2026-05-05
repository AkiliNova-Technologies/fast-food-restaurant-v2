import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = [
  "pending",
  "accepted",
  "preparing",
  "completed",
  "cancelled",
];

export async function GET(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const orderId = Number(id);

    if (!orderId) {
      return errorResponse("Order ID is required.", 422);
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    return successResponse("Order retrieved successfully.", {
      id: order.id,
      customerName: order.customerName,
      customer_name: order.customerName,
      phone: order.phone,
      email: order.email,
      deliveryAddress: order.deliveryAddress,
      delivery_address: order.deliveryAddress,
      totalAmount: order.totalAmount,
      total_amount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      payment_method: order.paymentMethod,
      mobileMoneyProvider: order.mobileMoneyProvider,
      mobile_money_provider: order.mobileMoneyProvider,
      paymentPhone: order.paymentPhone,
      payment_phone: order.paymentPhone,
      paymentStatus: order.paymentStatus,
      payment_status: order.paymentStatus,
      receiptNumber: order.receiptNumber,
      receipt_number: order.receiptNumber,
      status: order.status,
      notes: order.notes,
      createdAt: order.createdAt,
      created_at: order.createdAt,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        product_id: item.productId,
        productName: item.productName,
        product_name: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unit_price: item.unitPrice,
        lineTotal: item.lineTotal,
        line_total: item.lineTotal,
      })),
    });
  } catch {
    return errorResponse("Failed to retrieve order.", 500);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const orderId = Number(id);

    if (!orderId) {
      return errorResponse("Order ID is required.", 422);
    }

    const body = await req.json();
    const status = String(body.status ?? "").trim();

    if (!allowedStatuses.includes(status)) {
      return errorResponse("Invalid order status.", 422);
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status as any,
      },
    });

    return successResponse("Order status updated successfully.");
  } catch {
    return errorResponse("Failed to update order status.", 500);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const orderId = Number(id);

    if (!orderId) {
      return errorResponse("Order ID is required.", 422);
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    await prisma.order.delete({
      where: { id: orderId },
    });

    return successResponse("Order deleted successfully.");
  } catch {
    return errorResponse("Failed to delete order.", 500);
  }
}