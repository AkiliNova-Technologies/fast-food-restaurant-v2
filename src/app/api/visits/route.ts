import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] ??
      req.headers.get("x-real-ip") ??
      null;

    await prisma.siteVisit.create({
      data: {
        path: body.path ?? null,
        userAgent: req.headers.get("user-agent"),
        ipAddress,
      },
    });

    return successResponse("Visit tracked.");
  } catch {
    return errorResponse("Failed to track visit.", 500);
  }
}