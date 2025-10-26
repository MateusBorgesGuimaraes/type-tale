import { HighlightWithAuthor } from "@/types/highlights";
import { apiFetch } from "./client";

export async function getHighlightsAndAthors() {
  return apiFetch<HighlightWithAuthor[]>("/highlights/active", {
    next: {
      revalidate: 3600,
      tags: ["highlights"],
    },
  });
}
