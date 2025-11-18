import { apiFetch } from "./client";
import { Rating } from "@/types/rating";
import { ApiError } from "next/dist/server/api-utils";

export async function updateRating(
  rating: Omit<Rating, "id" | "createdAt">,
  storyId: string,
) {
  return apiFetch<Rating | ApiError>(`/ratings/stories/${storyId}`, {
    method: "PATCH",
    body: JSON.stringify({ ...rating }),
  });
}
