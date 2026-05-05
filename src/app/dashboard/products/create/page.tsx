"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  ProductForm,
  type ProductFormValues,
} from "@/app/dashboard/products/product-form";
import { createProduct } from "@/services/api/products";
import { getCategories } from "@/services/api/categories";

type ProductCategory = {
  id: number;
  name: string;
};

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(
          data
            .filter((category) => Number(category.isActive) === 1)
            .map((category) => ({
              id: category.id,
              name: category.name,
            }))
        );
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load categories");
      }
    }

    loadCategories();
  }, []);

  async function handleSubmit(values: ProductFormValues) {
    try {
      await createProduct(values);
      toast.success("Product created successfully");
      router.push("/dashboard/products");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create product");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Product"
        description="Add a new food item to the restaurant menu."
        backHref="/dashboard/products"
      />

      <ProductForm
        mode="create"
        categories={categories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}