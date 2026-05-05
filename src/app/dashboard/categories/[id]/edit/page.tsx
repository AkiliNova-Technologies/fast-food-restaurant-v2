"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  CategoryForm,
  type CategoryFormValues,
} from "@/app/dashboard/categories/category-form";
import { getCategory, updateCategory } from "@/services/api/categories";
import type { Category } from "@/app/dashboard/categories/columns";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await getCategory(params.id);
        setCategory(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load category");
      }
    }

    loadCategory();
  }, [params.id]);

  async function handleSubmit(values: CategoryFormValues) {
    try {
      setIsSubmitting(true);
      await updateCategory(params.id, values);
      toast.success("Category updated successfully");
      router.push("/dashboard/categories");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update category");
    } finally {
    setIsSubmitting(false);
  }
  }

  if (!category) {
    return <p className="text-sm text-stone-500">Loading category...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Category"
        description="Update category details, visibility and display order."
        backHref="/dashboard/categories"
      />

      <CategoryForm
        mode="edit"
        initialValues={{
          name: category.name,
          description: category.description ?? "",
          sort_order: category.sortOrder,
          is_active: Boolean(Number(category.isActive)),
          imagePreview: category.image,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}