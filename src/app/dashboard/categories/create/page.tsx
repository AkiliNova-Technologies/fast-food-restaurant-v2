"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  CategoryForm,
  type CategoryFormValues,
} from "@/app/dashboard/categories/category-form";
import { createCategory } from "@/services/api/categories";
import { useState } from "react";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: CategoryFormValues) {
  try {
    setIsSubmitting(true);
    await createCategory(values);
    toast.success("Category created successfully");
    router.push("/dashboard/categories");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to create category");
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Category"
        description="Add a new menu category such as burgers, pizza, drinks or desserts."
        backHref="/dashboard/categories"
      />

      <CategoryForm mode="create" isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </div>
  );
}