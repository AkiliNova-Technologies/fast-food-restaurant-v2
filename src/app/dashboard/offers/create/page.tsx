"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import {
  OfferForm,
  type OfferFormValues,
} from "@/app/dashboard/offers/offer-form";
import { createOffer } from "@/services/api/offers";

export default function CreateOfferPage() {
  const router = useRouter();

  async function handleSubmit(values: OfferFormValues) {
    try {
      await createOffer(values);
      toast.success("Offer created successfully");
      router.push("/dashboard/offers");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create offer");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Offer"
        description="Add a promotion, discount or limited-time restaurant deal."
        backHref="/dashboard/offers"
      />

      <OfferForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}