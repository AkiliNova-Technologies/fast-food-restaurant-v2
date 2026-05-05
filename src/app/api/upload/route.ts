import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { errorResponse, successResponse } from "@/lib/api-response";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function getFileExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "jpg";
}

function sanitizeFolder(value: string | null) {
  const folder = value ?? "uploads";

  return folder
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_/]/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");
}

export async function POST(req: Request) {
  try {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "restaurant-images";
    const formData = await req.formData();

    const file = formData.get("file");
    const folder = sanitizeFolder(String(formData.get("folder") ?? "uploads"));

    if (!(file instanceof File)) {
      return errorResponse("Image file is required.", 422);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse("Only JPG, PNG and WEBP images are allowed.", 422);
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse("Image must not be larger than 2MB.", 422);
    }

    const extension = getFileExtension(file.name);
    const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const filePath = `${folder}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return errorResponse(error.message, 500);
    }

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

    return successResponse(
      "Image uploaded successfully.",
      {
        path: filePath,
        url: data.publicUrl,
      },
      201
    );
  } catch {
    return errorResponse("Failed to upload image.", 500);
  }
}