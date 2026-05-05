"use client";

import * as React from "react";
import { Loader2Icon, SaveIcon } from "lucide-react";

import { ImageUploadField } from "@/components/dashboard/forms/image-upload-field";
import { FormCard } from "@/components/dashboard/forms/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export type CategoryFormValues = {
  name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  image: File | null;
};

type CategoryFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<CategoryFormValues> & {
    imagePreview?: string | null;
  };
  isSubmitting?: boolean;
  onSubmit: (values: CategoryFormValues) => void;
};

export function CategoryForm({
  mode,
  initialValues,
  isSubmitting = false,
  onSubmit,
}: CategoryFormProps) {
  const [name, setName] = React.useState(initialValues?.name ?? "");
  const [description, setDescription] = React.useState(
    initialValues?.description ?? ""
  );
  const [sortOrder, setSortOrder] = React.useState(
    initialValues?.sort_order ?? 0
  );
  const [isActive, setIsActive] = React.useState(
    initialValues?.is_active ?? true
  );
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(
    initialValues?.imagePreview ?? null
  );

  React.useEffect(() => {
    if (!initialValues) return;

    setName(initialValues.name ?? "");
    setDescription(initialValues.description ?? "");
    setSortOrder(initialValues.sort_order ?? 0);
    setIsActive(initialValues.is_active ?? true);
    setPreview(initialValues.imagePreview ?? null);
  }, [initialValues]);

  function handleImageChange(file: File | null) {
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    onSubmit({
      name,
      description,
      sort_order: sortOrder,
      is_active: isActive,
      image,
    });
  }

  return (
    <FormCard>
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-[1fr_480px]"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Category Name</Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Burgers"
              className="h-12 rounded-2xl border-orange-200"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Description</Label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short description for this menu category"
              className="min-h-32 rounded-xl border-orange-200 p-4"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Sort Order</Label>
              <Input
                type="number"
                value={sortOrder}
                onChange={(event) => setSortOrder(Number(event.target.value))}
                className="h-12 rounded-2xl border-orange-200"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3">
              <div>
                <Label className="font-bold text-stone-700">Active</Label>
                <p className="text-xs text-stone-500">
                  Show this category on the website.
                </p>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 rounded-2xl bg-red-600 px-6 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 size-4 animate-spin" />
                {mode === "create" ? "Creating..." : "Saving..."}
              </>
            ) : (
              <>
                <SaveIcon className="mr-2 size-4" />
                {mode === "create" ? "Create Category" : "Save Changes"}
              </>
            )}
          </Button>
        </div>

        <ImageUploadField
          label="Category Image"
          preview={preview}
          onChange={handleImageChange}
        />
      </form>
    </FormCard>
  );
}