import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slug";

async function generateUniqueCategorySlug(name: string) {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return successResponse("Categories retrieved successfully.", categories);
  } catch {
    return errorResponse("Failed to retrieve categories.", 500);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const sortOrder = Number(formData.get("sort_order") ?? 0);
    const isActive = String(formData.get("is_active") ?? "1") === "1";

    if (!name) {
      return errorResponse("Category name is required.", 422);
    }

    const slug = await generateUniqueCategorySlug(name);

    const imagePath = String(formData.get("image_url") ?? "") || null;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image: imagePath,
        sortOrder,
        isActive,
      },
    });

    return successResponse(
      "Category created successfully.",
      { id: category.id },
      201
    );
  } catch {
    return errorResponse("Failed to create category.", 500);
  }
}