import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

const allowedPaymentMethods = ["cash_on_delivery", "mobile_money"] as const;
const allowedProviders = ["mtn", "airtel"] as const;

function createReceiptNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const random = crypto.randomUUID().slice(0, 6).toUpperCase();

  return `RCPT-${date}-${random}`;
}

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const orders = await prisma.order.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedOrders = orders.map((order) => ({
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
      items: order.items,
    }));

    return successResponse("Orders retrieved successfully.", formattedOrders);
  } catch {
    return errorResponse("Failed to retrieve orders.", 500);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const customerName = String(data.customer_name ?? "").trim();
    const phone = String(data.phone ?? "").trim();
    const email = String(data.email ?? "").trim();
    const deliveryAddress = String(data.delivery_address ?? "").trim();
    const notes = String(data.notes ?? "").trim();
    const items = data.items;

    const paymentMethod = String(
      data.payment_method ?? "cash_on_delivery"
    ).trim();

    const mobileMoneyProvider = String(
      data.mobile_money_provider ?? ""
    ).trim();

    const paymentPhone = String(data.payment_phone ?? "").trim();

    if (!customerName || !phone || !paymentMethod) {
      return errorResponse("Validation failed.", 422);
    }

    if (!allowedPaymentMethods.includes(paymentMethod as any)) {
      return errorResponse("Invalid payment method.", 422);
    }

    if (paymentMethod === "mobile_money") {
      if (!allowedProviders.includes(mobileMoneyProvider as any)) {
        return errorResponse("Please select a valid mobile money provider.", 422);
      }

      if (!paymentPhone) {
        return errorResponse(
          "Payment phone number is required for mobile money.",
          422
        );
      }
    }

    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse("Order must contain at least one item.", 422);
    }

    const result = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;

      const orderItems = [];

      for (const item of items) {
        const productId = Number(item.product_id);
        const quantity = Number(item.quantity ?? 0);

        if (!productId || quantity <= 0) {
          throw new Error("Invalid order item.");
        }

        const product = await tx.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error("A selected product does not exist.");
        }

        if (!product.isAvailable) {
          throw new Error(`${product.name} is currently unavailable.`);
        }

        const unitPrice = Number(product.price);
        const lineTotal = unitPrice * quantity;
        totalAmount += lineTotal;

        orderItems.push({
          productId: product.id,
          productName: product.name,
          quantity,
          unitPrice,
          lineTotal,
        });
      }

      const receiptNumber = createReceiptNumber();

      const order = await tx.order.create({
        data: {
          customerName,
          phone,
          email: email || null,
          deliveryAddress: deliveryAddress || null,
          totalAmount,
          notes: notes || null,
          paymentMethod: paymentMethod as any,
          mobileMoneyProvider:
            paymentMethod === "mobile_money"
              ? (mobileMoneyProvider as any)
              : null,
          paymentPhone: paymentMethod === "mobile_money" ? paymentPhone : null,
          paymentStatus: "pending",
          receiptNumber,
          status: "pending",
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });

      return {
        id: order.id,
        receipt_number: order.receiptNumber,
        total_amount: order.totalAmount,
        status: order.status,
        payment_method: order.paymentMethod,
        mobile_money_provider: order.mobileMoneyProvider,
        payment_phone: order.paymentPhone,
        payment_status: order.paymentStatus,
        items: order.items,
      };
    });

    return successResponse("Order created successfully.", result, 201);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create order.",
      422
    );
  }
}