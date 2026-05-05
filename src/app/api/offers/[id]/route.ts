import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slug";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function generateUniqueOfferSlug(title: string, currentId: number) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.offer.findUnique({
      where: { slug },
    });

    if (!existing || existing.id === currentId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const offerId = Number(id);

    if (!offerId) {
      return errorResponse("Offer ID is required.", 422);
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return errorResponse("Offer not found.", 404);
    }

    return successResponse("Offer retrieved successfully.", offer);
  } catch {
    return errorResponse("Failed to retrieve offer.", 500);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const offerId = Number(id);

    if (!offerId) {
      return errorResponse("Offer ID is required.", 422);
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return errorResponse("Offer not found.", 404);
    }

    const formData = await req.formData();

    const title = String(formData.get("title") ?? offer.title).trim();
    const description = String(
      formData.get("description") ?? offer.description ?? ""
    ).trim();

    const discountPercent = Number(
      formData.get("discount_percent") ?? offer.discountPercent
    );

    const image = formData.has("image_url")
      ? String(formData.get("image_url") || "")
      : offer.image;

    const startsAtValue = String(formData.get("starts_at") ?? "");
    const expiresAtValue = String(formData.get("expires_at") ?? "");

    const isActive = formData.has("is_active")
      ? String(formData.get("is_active")) === "1"
      : offer.isActive;

    if (!title) {
      return errorResponse("Offer title is required.", 422);
    }

    const slug = await generateUniqueOfferSlug(title, offerId);

    await prisma.offer.update({
      where: { id: offerId },
      data: {
        title,
        slug,
        description,
        discountPercent,
        image,
        startsAt: startsAtValue ? new Date(startsAtValue) : offer.startsAt,
        expiresAt: expiresAtValue ? new Date(expiresAtValue) : offer.expiresAt,
        isActive,
      },
    });

    return successResponse("Offer updated successfully.");
  } catch {
    return errorResponse("Failed to update offer.", 500);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const offerId = Number(id);

    if (!offerId) {
      return errorResponse("Offer ID is required.", 422);
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return errorResponse("Offer not found.", 404);
    }

    await prisma.offer.delete({
      where: { id: offerId },
    });

    return successResponse("Offer deleted successfully.");
  } catch {
    return errorResponse("Failed to delete offer.", 500);
  }
}