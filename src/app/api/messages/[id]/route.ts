import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = ["new", "read", "resolved"];

export async function GET(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const messageId = Number(id);

    if (!messageId) {
      return errorResponse("Message ID is required.", 422);
    }

    const message = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return errorResponse("Message not found.", 404);
    }

    return successResponse("Message retrieved successfully.", message);
  } catch {
    return errorResponse("Failed to retrieve message.", 500);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const messageId = Number(id);

    if (!messageId) {
      return errorResponse("Message ID is required.", 422);
    }

    const body = await req.json();
    const status = String(body.status ?? "").trim();

    if (!allowedStatuses.includes(status)) {
      return errorResponse("Invalid message status.", 422);
    }

    const message = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return errorResponse("Message not found.", 404);
    }

    await prisma.contactMessage.update({
      where: { id: messageId },
      data: {
        status: status as any,
      },
    });

    return successResponse("Message status updated successfully.");
  } catch {
    return errorResponse("Failed to update message.", 500);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const messageId = Number(id);

    if (!messageId) {
      return errorResponse("Message ID is required.", 422);
    }

    const message = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return errorResponse("Message not found.", 404);
    }

    await prisma.contactMessage.delete({
      where: { id: messageId },
    });

    return successResponse("Message deleted successfully.");
  } catch {
    return errorResponse("Failed to delete message.", 500);
  }
}