"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { deleteCategory, getCategories } from "@/services/api/categories";
import { getCategoryColumns, type Category } from "./columns";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const columns = useMemo(
    () =>
      getCategoryColumns({
        onEdit: (category) =>
          router.push(`/dashboard/categories/${category.id}/edit`),
        onDelete: (category) => setSelectedCategory(category),
      }),
    [router]
  );

  async function handleDelete() {
    if (!selectedCategory) return;

    try {
      await deleteCategory(selectedCategory.id);
      toast.success("Category deleted successfully");
      setSelectedCategory(null);
      loadCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete category");
    }
  }

  return (
    <>
      <DataTable
        title="Categories"
        description="Manage menu categories shown on the restaurant website."
        data={categories}
        columns={columns}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search categories..."
        createLabel="Add Category"
        onCreate={() => router.push("/dashboard/categories/create")}
      />

      <ConfirmDeleteDialog
        open={!!selectedCategory}
        onOpenChange={(open) => !open && setSelectedCategory(null)}
        title="Delete category?"
        description={`This will delete ${
          selectedCategory?.name ?? "this category"
        }. Products under it will become uncategorized.`}
        onConfirm={handleDelete}
      />
    </>
  );
}