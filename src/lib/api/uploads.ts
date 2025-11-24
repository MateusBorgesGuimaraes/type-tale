import { apiFetchClient } from "./client";

export type ImageType = "announcement" | "banner" | "cover" | "avatar";

type UploadResponse = {
  url: string;
};

export async function uploadImage(file: File, type: ImageType) {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetchClient<UploadResponse>(`/upload/${type}`, {
    method: "POST",
    body: formData,
  });
}
