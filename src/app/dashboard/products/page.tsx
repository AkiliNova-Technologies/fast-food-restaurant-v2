"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { deleteProduct, getProducts } from "@/services/api/products";
import { getProductColumns, type Product } from "./columns";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const columns = useMemo(
    () =>
      getProductColumns({
        onEdit: (product) =>
          router.push(`/dashboard/products/${product.id}/edit`),
        onDelete: (product) => setSelectedProduct(product),
      }),
    [router]
  );

  async function handleDelete() {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      toast.success("Product deleted successfully");
      setSelectedProduct(null);
      loadProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete product");
    }
  }

  return (
    <>
      <DataTable
        title="Products"
        description="Manage food items, pricing, availability, badges and featured menu products."
        data={products}
        columns={columns}
        searchKey="name"
        loading={loading}
        searchPlaceholder="Search products..."
        createLabel="Add Product"
        onCreate={() => router.push("/dashboard/products/create")}
      />

      <ConfirmDeleteDialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        title="Delete product?"
        description={`This will delete ${
          selectedProduct?.name ?? "this product"
        } from the menu.`}
        onConfirm={handleDelete}
      />
    </>
  );
}