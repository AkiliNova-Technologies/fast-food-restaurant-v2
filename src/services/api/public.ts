import { apiClient } from "@/lib/api-client";

export type PublicCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  sortOrder: number;
  sort_order?: number;
  isActive: boolean;
  is_active?: boolean;
};

export type PublicProduct = {
  id: number;
  categoryId: number | null;
  category_id?: number | null;
  categoryName?: string | null;
  category_name?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  name: string;
  slug: string;
  description: string | null;
  price: string | number;
  oldPrice: string | number | null;
  old_price?: string | number | null;
  image: string | null;
  badge: string | null;
  rating: string | number;
  isFeatured: boolean;
  is_featured?: boolean;
  isAvailable: boolean;
  is_available?: boolean;
};

export type PublicOffer = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  discountPercent: number;
  discount_percent?: number;
  image: string | null;
  startsAt: string | null;
  starts_at?: string | null;
  expiresAt: string | null;
  expires_at?: string | null;
  isActive: boolean;
  is_active?: boolean;
};

export async function getPublicCategories() {
  const res = await apiClient<PublicCategory[]>("/api/categories");
  return res.data.filter((category) => category.isActive);
}

export async function getPublicProducts() {
  const res = await apiClient<PublicProduct[]>("/api/products?available=1");
  return res.data;
}

export async function getFeaturedProducts() {
  const res = await apiClient<PublicProduct[]>(
    "/api/products?available=1&featured=1"
  );
  return res.data;
}

export async function getPublicOffers() {
  const res = await apiClient<PublicOffer[]>("/api/offers?active=1");
  return res.data;
}

export async function sendContactMessage(payload: {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  return apiClient<{ id: number }>("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createPublicOrder(payload: {
  customer_name: string;
  phone: string;
  email?: string;
  delivery_address?: string;
  notes?: string;
  payment_method: "cash_on_delivery" | "mobile_money";
  mobile_money_provider?: "mtn" | "airtel";
  payment_phone?: string;
  items: {
    product_id: number;
    quantity: number;
  }[];
}) {
  return apiClient<{
    id: number;
    receipt_number: string;
    total_amount: number;
    status: string;
    payment_method: string;
    mobile_money_provider?: string | null;
    payment_phone?: string | null;
    payment_status: string;
    items: {
      product_id: number;
      product_name: string;
      quantity: number;
      unit_price: number;
      line_total: number;
    }[];
  }>("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}