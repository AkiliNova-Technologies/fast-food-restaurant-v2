"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  OfferForm,
  type OfferFormValues,
} from "@/app/dashboard/offers/offer-form";
import { getOffer, updateOffer } from "@/services/api/offers";
import type { Offer } from "@/app/dashboard/offers/columns";

function toDatetimeLocal(value?: string | null) {
  if (!value) return "";
  return value.replace(" ", "T").slice(0, 16);
}

export default function EditOfferPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    async function loadOffer() {
      try {
        const data = await getOffer(params.id);
        setOffer(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load offer");
      }
    }

    loadOffer();
  }, [params.id]);

  async function handleSubmit(values: OfferFormValues) {
    try {
      await updateOffer(params.id, values);
      toast.success("Offer updated successfully");
      router.push("/dashboard/offers");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update offer");
    }
  }

  if (!offer) {
    return <p className="text-sm text-stone-500">Loading offer...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Offer"
        description="Update promotion details, expiry date, visibility and image."
        backHref="/dashboard/offers"
      />

      <OfferForm
        mode="edit"
        initialValues={{
          title: offer.title,
          description: offer.description ?? "",
          discountPercent: Number(offer.discountPercent),
          startsAt: toDatetimeLocal(offer.startsAt),
          expiresAt: toDatetimeLocal(offer.expiresAt),
          isActive: offer.isActive,
          imagePreview: offer.image,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}