import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slug";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function generateUniqueProductSlug(name: string, currentId: number) {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.product.findUnique({
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
    const productId = Number(id);

    if (!productId) {
      return errorResponse("Product ID is required.", 422);
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      return errorResponse("Product not found.", 404);
    }

    return successResponse("Product retrieved successfully.", product);
  } catch {
    return errorResponse("Failed to retrieve product.", 500);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const productId = Number(id);

    if (!productId) {
      return errorResponse("Product ID is required.", 422);
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return errorResponse("Product not found.", 404);
    }

    const formData = await req.formData();

    const name = String(formData.get("name") ?? product.name).trim();
    const description = String(
      formData.get("description") ?? product.description ?? ""
    ).trim();

    const categoryIdValue = String(
      formData.get("category_id") ?? product.categoryId ?? ""
    );

    const categoryId = categoryIdValue ? Number(categoryIdValue) : null;

    const price = Number(formData.get("price") ?? product.price);
    const oldPriceValue = String(formData.get("old_price") ?? "");
    const oldPrice = oldPriceValue ? Number(oldPriceValue) : null;

    const badge = String(formData.get("badge") ?? "").trim() || null;
    const rating = Number(formData.get("rating") ?? product.rating);
    const isFeatured = String(formData.get("is_featured") ?? "0") === "1";
    const isAvailable = String(formData.get("is_available") ?? "1") === "1";

    const image = formData.has("image_url")
      ? String(formData.get("image_url") || "")
      : product.image;

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

    const slug = await generateUniqueProductSlug(name, productId);

    await prisma.product.update({
      where: { id: productId },
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

    return successResponse("Product updated successfully.");
  } catch {
    return errorResponse("Failed to update product.", 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await getAuthUser(_req);

    if (!user) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const productId = Number(id);

    if (!productId) {
      return errorResponse("Product ID is required.", 422);
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return errorResponse("Product not found.", 404);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return successResponse("Product deleted successfully.");
  } catch {
    return errorResponse("Failed to delete product.", 500);
  }
}