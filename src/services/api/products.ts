import { apiClient } from "@/lib/api-client";
import { uploadImage } from "@/services/api/upload";
import type { Product } from "@/app/dashboard/products/columns";
import type { ProductFormValues } from "@/app/dashboard/products/product-form";

export async function getProducts() {
  const res = await apiClient<Product[]>("/api/products");
  return res.data;
}

export async function getProduct(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Product ID is missing.");
  }

  const res = await apiClient<Product>(`/api/products/${id}`);
  return res.data;
}

export async function createProduct(values: ProductFormValues) {
  let imageUrl: string | null = null;

  if (values.image) {
    const uploaded = await uploadImage(values.image, "products");
    imageUrl = uploaded.url;
  }

  const formData = new FormData();

  formData.append("category_id", values.category_id);
  formData.append("name", values.name);
  formData.append("description", values.description ?? "");
  formData.append("price", String(values.price));
  formData.append("old_price", values.old_price ? String(values.old_price) : "");
  formData.append("badge", values.badge ?? "");
  formData.append("rating", String(values.rating));
  formData.append("is_featured", values.is_featured ? "1" : "0");
  formData.append("is_available", values.is_available ? "1" : "0");

  if (imageUrl) {
    formData.append("image_url", imageUrl);
  }

  return apiClient<{ id: number }>("/api/products", {
    method: "POST",
    body: formData,
    auth: true,
  });
}

export async function updateProduct(
  id: string | number,
  values: ProductFormValues
) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Product ID is missing.");
  }

  let imageUrl: string | null = null;

  if (values.image) {
    const uploaded = await uploadImage(values.image, "products");
    imageUrl = uploaded.url;
  }

  const formData = new FormData();

  formData.append("category_id", values.category_id);
  formData.append("name", values.name);
  formData.append("description", values.description ?? "");
  formData.append("price", String(values.price));
  formData.append("old_price", values.old_price ? String(values.old_price) : "");
  formData.append("badge", values.badge ?? "");
  formData.append("rating", String(values.rating));
  formData.append("is_featured", values.is_featured ? "1" : "0");
  formData.append("is_available", values.is_available ? "1" : "0");

  if (imageUrl) {
    formData.append("image_url", imageUrl);
  }

  return apiClient<null>(`/api/products/${id}`, {
    method: "PUT",
    body: formData,
    auth: true,
  });
}

export async function deleteProduct(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Product ID is missing.");
  }

  return apiClient<null>(`/api/products/${id}`, {
    method: "DELETE",
    auth: true,
  });
}