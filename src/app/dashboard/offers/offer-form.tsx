"use client";

import * as React from "react";
import { SaveIcon } from "lucide-react";

import { FormCard } from "@/components/dashboard/forms/form-card";
import { ImageUploadField } from "@/components/dashboard/forms/image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export type OfferFormValues = {
  title: string;
  description: string;
  discountPercent: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
  image: File | null;
};

type OfferFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<OfferFormValues> & {
    imagePreview?: string | null;
  };
  onSubmit: (values: OfferFormValues) => void;
};

export function OfferForm({ mode, initialValues, onSubmit }: OfferFormProps) {
  const [title, setTitle] = React.useState(initialValues?.title ?? "");
  const [description, setDescription] = React.useState(
    initialValues?.description ?? ""
  );
  const [discountPercent, setDiscountPercent] = React.useState(
    initialValues?.discountPercent ?? 0
  );
  const [startsAt, setStartsAt] = React.useState(initialValues?.startsAt ?? "");
  const [expiresAt, setExpiresAt] = React.useState(
    initialValues?.expiresAt ?? ""
  );
  const [isActive, setIsActive] = React.useState(
    initialValues?.isActive ?? true
  );
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(
    initialValues?.imagePreview ?? null
  );

  function handleImageChange(file: File | null) {
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      title,
      description,
      discountPercent,
      startsAt,
      expiresAt,
      isActive,
      image,
    });
  }

  return (
    <FormCard>
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_480px]">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Offer Title</Label>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Weekend Burger Deal"
              className="h-12 rounded-2xl border-orange-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Description</Label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what this offer includes"
              className="min-h-32 rounded-xl border-orange-200"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Discount %</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(event) =>
                  setDiscountPercent(Number(event.target.value))
                }
                className="h-12 rounded-2xl border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Starts At</Label>
              <Input
                type="date"
                value={startsAt}
                onChange={(event) => setStartsAt(event.target.value)}
                className="h-12 rounded-2xl border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Expires At</Label>
              <Input
                type="date"
                value={expiresAt}
                onChange={(event) => setExpiresAt(event.target.value)}
                className="h-12 rounded-2xl border-orange-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3">
            <div>
              <Label className="font-bold text-stone-700">Active</Label>
              <p className="text-xs text-stone-500">
                Show this offer on the website.
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <Button className="h-12 rounded-2xl bg-red-600 px-6 font-bold text-white hover:bg-red-700">
            <SaveIcon className="mr-2 size-4" />
            {mode === "create" ? "Create Offer" : "Save Changes"}
          </Button>
        </div>

        <ImageUploadField
          label="Offer Image"
          preview={preview}
          onChange={handleImageChange}
        />
      </form>
    </FormCard>
  );
}