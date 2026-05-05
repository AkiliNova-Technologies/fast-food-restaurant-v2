import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slug";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function generateUniqueCategorySlug(name: string, currentId: number) {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.category.findUnique({
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
    const categoryId = Number(id);

    if (!categoryId) {
      return errorResponse("Category ID is required.", 422);
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return errorResponse("Category not found.", 404);
    }

    return successResponse("Category retrieved successfully.", category);
  } catch {
    return errorResponse("Failed to retrieve category.", 500);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    if (!categoryId) {
      return errorResponse("Category ID is required.", 422);
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return errorResponse("Category not found.", 404);
    }

    const formData = await req.formData();

    const name = String(formData.get("name") ?? category.name).trim();
    const description = String(
      formData.get("description") ?? category.description ?? ""
    ).trim();

    const sortOrder = Number(formData.get("sort_order") ?? category.sortOrder);
    const isActive = formData.has("is_active")
      ? String(formData.get("is_active")) === "1"
      : category.isActive;

    if (!name) {
      return errorResponse("Category name is required.", 422);
    }

    const slug = await generateUniqueCategorySlug(name, categoryId);

    const imagePath = formData.has("image_url")
  ? String(formData.get("image_url") || "")
  : category.image;

    await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        slug,
        description,
        image: imagePath,
        sortOrder,
        isActive,
      },
    });

    return successResponse("Category updated successfully.");
  } catch {
    return errorResponse("Failed to update category.", 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    if (!categoryId) {
      return errorResponse("Category ID is required.", 422);
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return errorResponse("Category not found.", 404);
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return successResponse("Category deleted successfully.");
  } catch {
    return errorResponse("Failed to delete category.", 500);
  }
}