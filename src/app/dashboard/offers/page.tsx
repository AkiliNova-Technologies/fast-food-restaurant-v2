"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { deleteOffer, getOffers } from "@/services/api/offers";
import { getOfferColumns, type Offer } from "./columns";

export default function OffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadOffers() {
    try {
      setLoading(true);
      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load offers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  const columns = useMemo(
    () =>
      getOfferColumns({
        onEdit: (offer) => router.push(`/dashboard/offers/${offer.id}/edit`),
        onDelete: (offer) => setSelectedOffer(offer),
      }),
    [router]
  );

  async function handleDelete() {
    if (!selectedOffer) return;

    try {
      await deleteOffer(selectedOffer.id);
      toast.success("Offer deleted successfully");
      setSelectedOffer(null);
      loadOffers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete offer");
    }
  }

  return (
    <>
      <DataTable
        title="Offers"
        description="Manage restaurant promotions, discounts and limited-time deals."
        data={offers}
        columns={columns}
        searchKey="title"
        loading={loading}
        searchPlaceholder="Search offers..."
        createLabel="Add Offer"
        onCreate={() => router.push("/dashboard/offers/create")}
      />

      <ConfirmDeleteDialog
        open={!!selectedOffer}
        onOpenChange={(open) => !open && setSelectedOffer(null)}
        title="Delete offer?"
        description={`This will delete ${
          selectedOffer?.title ?? "this offer"
        } from the website.`}
        onConfirm={handleDelete}
      />
    </>
  );
}