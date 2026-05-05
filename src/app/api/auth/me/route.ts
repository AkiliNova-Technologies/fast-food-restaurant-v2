import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(req: Request) {
  const user = await getAuthUser(req);

  if (!user) {
    return errorResponse("Unauthorized.", 401);
  }

  return successResponse("Authenticated user retrieved.", {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}