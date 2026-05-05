import { prisma } from "@/lib/prisma";
import { createAuthToken, verifyPassword } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return errorResponse("Email and password are required.", 422);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("Invalid email or password.", 401);
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return errorResponse("Invalid email or password.", 401);
    }

    const token = await createAuthToken(user.id);

    return successResponse("Login successful.", {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return errorResponse("Failed to login.", 500);
  }
}