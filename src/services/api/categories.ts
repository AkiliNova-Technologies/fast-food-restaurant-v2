import { apiClient } from "@/lib/api-client";
import type { Category } from "@/app/dashboard/categories/columns";
import type { CategoryFormValues } from "@/app/dashboard/categories/category-form";
import { uploadImage } from "@/services/api/upload";

export async function getCategories() {
  const res = await apiClient<Category[]>("/api/categories");
  return res.data;
}

export async function getCategory(id: string) {
  const res = await apiClient<Category>(`/api/categories/${id}`);
  return res.data;
}

export async function createCategory(values: CategoryFormValues) {
  let imageUrl: string | null = null;

  if (values.image) {
    const uploaded = await uploadImage(values.image, "categories");
    imageUrl = uploaded.url;
  }

  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("description", values.description ?? "");
  formData.append("sort_order", String(values.sort_order));
  formData.append("is_active", values.is_active ? "1" : "0");

  if (imageUrl) {
    formData.append("image_url", imageUrl);
  }

  return apiClient<{ id: number }>("/api/categories", {
    method: "POST",
    body: formData,
    auth: true,
  });
}

export async function updateCategory(
  id: string | number,
  values: CategoryFormValues
) {
  let imageUrl: string | null = null;

  if (values.image) {
    const uploaded = await uploadImage(values.image, "categories");
    imageUrl = uploaded.url;
  }

  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("description", values.description ?? "");
  formData.append("sort_order", String(values.sort_order));
  formData.append("is_active", values.is_active ? "1" : "0");

  if (imageUrl) {
    formData.append("image_url", imageUrl);
  }

  return apiClient<null>(`/api/categories/${id}`, {
    method: "PUT",
    body: formData,
    auth: true,
  });
}

export async function deleteCategory(id: number) {
  return apiClient<null>(`/api/categories/${id}`, {
    method: "DELETE",
    auth: true,
  });
}