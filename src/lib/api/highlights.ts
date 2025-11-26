import {
  HighlightWithAuthor,
  HighlightWithAuthorComplete,
} from "@/types/highlights";
import { apiFetch } from "./client";

export async function getHighlightsAndAthors() {
  return apiFetch<HighlightWithAuthor[]>("/highlights/active", {
    next: {
      revalidate: 3600,
      tags: ["highlights"],
    },
  });
}

export async function getHighlightsAndAthorsPaginated(page = 1, limit = 2) {
  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 2;
  return apiFetch<HighlightWithAuthorComplete[]>(
    `/highlights/all?page=${page}&limit=${limit}`,
    {
      next: {
        revalidate: 3600,
        tags: ["highlights-paginated"],
      },
    },
  );
}
