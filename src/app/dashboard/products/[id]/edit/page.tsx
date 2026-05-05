"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  ProductForm,
  type ProductFormValues,
} from "@/app/dashboard/products/product-form";
import { getCategories } from "@/services/api/categories";
import { getProduct, updateProduct } from "@/services/api/products";
import type { Product } from "@/app/dashboard/products/columns";

type ProductCategory = {
  id: number;
  name: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [productData, categoryData] = await Promise.all([
          getProduct(params.id),
          getCategories(),
        ]);

        setProduct(productData);
        setCategories(
          categoryData
            .filter((category) => Number(category.isActive) === 1)
            .map((category) => ({
              id: category.id,
              name: category.name,
            }))
        );
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load product");
      }
    }

    loadData();
  }, [params.id]);

  async function handleSubmit(values: ProductFormValues) {
    try {
      await updateProduct(params.id, values);
      toast.success("Product updated successfully");
      router.push("/dashboard/products");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
    }
  }

  if (!product) {
    return <p className="text-sm text-stone-500">Loading product...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Product"
        description="Update menu item details, price, category and availability."
        backHref="/dashboard/products"
      />

      <ProductForm
        mode="edit"
        categories={categories}
        initialValues={{
          category_id: product.categoryId ? String(product.categoryId) : "",
          name: product.name,
          description: product.description ?? "",
          price: Number(product.price),
          old_price: product.oldPrice ? Number(product.oldPrice) : null,
          badge: product.badge ?? "",
          rating: Number(product.rating),
          is_featured: Boolean(Number(product.isFeatured)),
          is_available: Boolean(Number(product.isAvailable)),
          imagePreview: product.image,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}