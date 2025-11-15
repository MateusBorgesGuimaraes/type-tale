import { SaveReadingProgressType } from "@/types/reading-progress";
import { apiFetch } from "./client";

export function saveReadingProgress(body: SaveReadingProgressType) {
  return apiFetch<any>(`/reading-progress`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
