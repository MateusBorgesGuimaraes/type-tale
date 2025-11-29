import {
  HighlightWithAuthor,
  HighlightWithAuthorComplete,
} from "@/types/highlights";
import { apiFetch } from "./client";
import { HighligthSchema, UpdateHighligthSchema } from "@/schemas/highligth";

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

export async function getOneHighligthById(id: string) {
  return apiFetch<HighlightWithAuthorComplete>(`/highlights/${id}`);
}

export async function createHighligth(data: HighligthSchema) {
  return apiFetch<HighlightWithAuthorComplete>(`/highlights`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateHighlight(
  highlightId: string,
  data: UpdateHighligthSchema,
) {
  return apiFetch(`/highlights/${highlightId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function toggleHighlightStatus(highlightId: string) {
  return apiFetch(`/highlights/${highlightId}/toggle`, {
    method: "PATCH",
  });
}

export async function deleteHighlight(highlightId: string) {
  return apiFetch(`/highlights/${highlightId}`, {
    method: "DELETE",
  });
}
