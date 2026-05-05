import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slug";

async function generateUniqueProductSlug(name: string) {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse("Products retrieved successfully.", products);
  } catch {
    return errorResponse("Failed to retrieve products.", 500);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const categoryIdValue = String(formData.get("category_id") ?? "");
    const categoryId = categoryIdValue ? Number(categoryIdValue) : null;

    const price = Number(formData.get("price") ?? 0);
    const oldPriceValue = String(formData.get("old_price") ?? "");
    const oldPrice = oldPriceValue ? Number(oldPriceValue) : null;

    const badge = String(formData.get("badge") ?? "").trim() || null;
    const rating = Number(formData.get("rating") ?? 5);
    const isFeatured = String(formData.get("is_featured") ?? "0") === "1";
    const isAvailable = String(formData.get("is_available") ?? "1") === "1";
    const image = String(formData.get("image_url") ?? "") || null;

    if (!name) {
      return errorResponse("Product name is required.", 422);
    }

    if (price <= 0) {
      return errorResponse("Product price must be greater than zero.", 422);
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return errorResponse("Selected category was not found.", 404);
      }
    }

    const slug = await generateUniqueProductSlug(name);

    const product = await prisma.product.create({
      data: {
        categoryId,
        name,
        slug,
        description,
        price,
        oldPrice,
        image,
        badge,
        rating,
        isFeatured,
        isAvailable,
      },
    });

    return successResponse(
      "Product created successfully.",
      { id: product.id },
      201
    );
  } catch {
    return errorResponse("Failed to create product.", 500);
  }
}