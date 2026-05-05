import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const messages = await prisma.contactMessage.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse("Messages retrieved successfully.", messages);
  } catch {
    return errorResponse("Failed to retrieve messages.", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !message) {
      return errorResponse("Name and message are required.", 422);
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
        subject: subject || null,
        message,
        status: "new",
      },
    });

    return successResponse(
      "Message sent successfully.",
      { id: contactMessage.id },
      201
    );
  } catch {
    return errorResponse("Failed to send message.", 500);
  }
}