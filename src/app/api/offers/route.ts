import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slug";

async function generateUniqueOfferSlug(title: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.offer.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const active = searchParams.get("active");

    const offers = await prisma.offer.findMany({
      where:
        active !== null
          ? {
              isActive: active === "1" || active === "true",
            }
          : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse("Offers retrieved successfully.", offers);
  } catch {
    return errorResponse("Failed to retrieve offers.", 500);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const formData = await req.formData();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const discountPercent = Number(formData.get("discount_percent") ?? 0);
    const image = String(formData.get("image_url") ?? "") || null;
    const startsAtValue = String(formData.get("starts_at") ?? "");
    const expiresAtValue = String(formData.get("expires_at") ?? "");
    const isActive = String(formData.get("is_active") ?? "1") === "1";

    if (!title) {
      return errorResponse("Offer title is required.", 422);
    }

    const slug = await generateUniqueOfferSlug(title);

    const offer = await prisma.offer.create({
      data: {
        title,
        slug,
        description,
        discountPercent,
        image,
        startsAt: startsAtValue ? new Date(startsAtValue) : null,
        expiresAt: expiresAtValue ? new Date(expiresAtValue) : null,
        isActive,
      },
    });

    return successResponse("Offer created successfully.", { id: offer.id }, 201);
  } catch {
    return errorResponse("Failed to create offer.", 500);
  }
}