"use client";

import * as React from "react";
import { SaveIcon } from "lucide-react";

import { ImageUploadField } from "@/components/dashboard/forms/image-upload-field";
import { FormCard } from "@/components/dashboard/forms/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type ProductCategory = {
  id: number;
  name: string;
};

export type ProductFormValues = {
  category_id: string;
  name: string;
  description: string;
  price: number;
  old_price: number | null;
  badge: string;
  rating: number;
  is_featured: boolean;
  is_available: boolean;
  image: File | null;
};

type ProductFormProps = {
  mode: "create" | "edit";
  categories: ProductCategory[];
  initialValues?: Partial<ProductFormValues> & {
    imagePreview?: string | null;
  };
  onSubmit: (values: ProductFormValues) => void;
};

export function ProductForm({
  mode,
  categories,
  initialValues,
  onSubmit,
}: ProductFormProps) {
  const [categoryId, setCategoryId] = React.useState(
    initialValues?.category_id ?? ""
  );
  const [name, setName] = React.useState(initialValues?.name ?? "");
  const [description, setDescription] = React.useState(
    initialValues?.description ?? ""
  );
  const [price, setPrice] = React.useState(initialValues?.price ?? 0);
  const [oldPrice, setOldPrice] = React.useState<number | null>(
    initialValues?.old_price ?? null
  );
  const [badge, setBadge] = React.useState(initialValues?.badge ?? "");
  const [rating, setRating] = React.useState(initialValues?.rating ?? 5);
  const [isFeatured, setIsFeatured] = React.useState(
    initialValues?.is_featured ?? false
  );
  const [isAvailable, setIsAvailable] = React.useState(
    initialValues?.is_available ?? true
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
      category_id: categoryId,
      name,
      description,
      price,
      old_price: oldPrice,
      badge,
      rating,
      is_featured: isFeatured,
      is_available: isAvailable,
      image,
    });
  }

  return (
    <FormCard>
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_480px]">
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Product Name</Label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Double Beef Burger"
                className="h-12 rounded-2xl border-orange-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="min-h-12 w-full rounded-2xl border-orange-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-md p-2">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Description</Label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the food item"
              className="min-h-32 rounded-xl border-orange-200"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Price</Label>
              <Input
                type="number"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                className="h-12 rounded-2xl border-orange-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Old Price</Label>
              <Input
                type="number"
                value={oldPrice ?? ""}
                onChange={(event) =>
                  setOldPrice(
                    event.target.value ? Number(event.target.value) : null
                  )
                }
                className="h-12 rounded-2xl border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Badge</Label>
              <Input
                value={badge}
                onChange={(event) => setBadge(event.target.value)}
                placeholder="Popular"
                className="h-12 rounded-2xl border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-stone-700">Rating</Label>
              <Input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="h-12 rounded-2xl border-orange-200"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3">
              <div>
                <Label className="font-bold text-stone-700">Featured</Label>
                <p className="text-xs text-stone-500">
                  Show in best sellers section.
                </p>
              </div>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3">
              <div>
                <Label className="font-bold text-stone-700">Available</Label>
                <p className="text-xs text-stone-500">
                  Customers can order this item.
                </p>
              </div>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            </div>
          </div>

          <Button className="h-12 rounded-2xl bg-red-600 px-6 font-bold text-white hover:bg-red-700">
            <SaveIcon className="mr-2 size-4" />
            {mode === "create" ? "Create Product" : "Save Changes"}
          </Button>
        </div>

        <ImageUploadField
          label="Product Image"
          preview={preview}
          onChange={handleImageChange}
        />
      </form>
    </FormCard>
  );
}