"use client";

import Image from "next/image";
import { ImagePlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getImageUrl } from "@/lib/image-url";

type ImageUploadFieldProps = {
  label: string;
  preview?: string | null;
  onChange: (file: File | null) => void;
};

function resolvePreviewUrl(preview?: string | null) {
  if (!preview) return "/placeholder-food.jpg";

  if (
    preview.startsWith("blob:") ||
    preview.startsWith("http://") ||
    preview.startsWith("https://") ||
    preview.startsWith("/")
  ) {
    return preview;
  }

  return getImageUrl(preview);
}

export function ImageUploadField({
  label,
  preview,
  onChange,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-3">
      <Label className="font-bold text-stone-700">{label}</Label>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-orange-200 bg-orange-50/50 p-6 text-center transition hover:bg-orange-50">
        {preview ? (
          <div className="relative h-65 w-full overflow-hidden rounded-[1.5rem]">
            <Image
              src={resolvePreviewUrl(preview)}
              alt="Preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <ImagePlusIcon className="size-8 text-orange-500" />
            <p className="mt-3 text-sm font-bold text-stone-700">
              Upload image
            </p>
            <p className="mt-1 text-xs text-stone-500">
              JPG, PNG or WEBP. Max 2MB.
            </p>
          </>
        )}

        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}
