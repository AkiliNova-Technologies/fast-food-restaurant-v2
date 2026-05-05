import { apiClient } from "@/lib/api-client";
import { uploadImage } from "@/services/api/upload";

export type Offer = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  discountPercent: number;
  discount_percent?: number;
  image?: string | null;
  startsAt?: string | null;
  starts_at?: string | null;
  expiresAt?: string | null;
  expires_at?: string | null;
  isActive: boolean;
  is_active?: boolean;
  createdAt: string;
  created_at?: string;
};

export type OfferFormValues = {
  title: string;
  description: string;
  discountPercent: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
  image: File | null;
};

export async function getOffers() {
  const res = await apiClient<Offer[]>("/api/offers");
  return res.data;
}

export async function getActiveOffers() {
  const res = await apiClient<Offer[]>("/api/offers?active=1");
  return res.data;
}

export async function getOffer(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Offer ID is missing.");
  }

  const res = await apiClient<Offer>(`/api/offers/${id}`);
  return res.data;
}

export async function createOffer(values: OfferFormValues) {
  let imageUrl: string | null = null;

  if (values.image) {
    const uploaded = await uploadImage(values.image, "offers");
    imageUrl = uploaded.url;
  }

  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description ?? "");
formData.append("discount_percent", String(values.discountPercent ?? 0));
formData.append("starts_at", values.startsAt ?? "");
formData.append("expires_at", values.expiresAt ?? "");
formData.append("is_active", values.isActive ? "1" : "0");

  if (imageUrl) {
    formData.append("image_url", imageUrl);
  }

  return apiClient<{ id: number }>("/api/offers", {
    method: "POST",
    body: formData,
    auth: true,
  });
}

export async function updateOffer(id: string | number, values: OfferFormValues) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Offer ID is missing.");
  }

  let imageUrl: string | null = null;

  if (values.image) {
    const uploaded = await uploadImage(values.image, "offers");
    imageUrl = uploaded.url;
  }

  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description ?? "");
  formData.append("discount_percent", String(values.discountPercent ?? 0));
formData.append("starts_at", values.startsAt ?? "");
formData.append("expires_at", values.expiresAt ?? "");
formData.append("is_active", values.isActive ? "1" : "0");

  if (imageUrl) {
    formData.append("image_url", imageUrl);
  }

  return apiClient<null>(`/api/offers/${id}`, {
    method: "PUT",
    body: formData,
    auth: true,
  });
}

export async function deleteOffer(id: string | number) {
  if (!id || id === "undefined" || id === "null") {
    throw new Error("Offer ID is missing.");
  }

  return apiClient<null>(`/api/offers/${id}`, {
    method: "DELETE",
    auth: true,
  });
}