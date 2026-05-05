import { apiClient } from "@/lib/api-client";

type UploadResponse = {
  path: string;
  url: string;
};

export async function uploadImage(file: File, folder: string) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", folder);

  const res = await apiClient<UploadResponse>("/api/upload", {
    method: "POST",
    body: formData,
    auth: true,
  });

  return res.data;
}