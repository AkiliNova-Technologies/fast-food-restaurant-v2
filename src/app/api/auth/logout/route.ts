import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  const user = await getAuthUser(req);

  if (!user) {
    return errorResponse("Unauthorized.", 401);
  }

  await prisma.authToken.delete({
    where: {
      id: user.tokenId,
    },
  });

  return successResponse("Logout successful.");
}