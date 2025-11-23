import { UpdateVolumeSchemaData, VolumeSchemaData } from "@/schemas/volume";
import { apiFetch } from "./client";
import { Volume } from "@/types/volume";

export async function createVolume(data: VolumeSchemaData, storyId: string) {
  return apiFetch<Volume>(`/stories/${storyId}/volumes`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateVolume(
  data: UpdateVolumeSchemaData,
  volumeId: string,
) {
  return apiFetch<Volume>(`/volumes/${volumeId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
