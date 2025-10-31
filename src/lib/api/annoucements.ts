import { AnnoucementWithAuthor } from "@/types/annoucements";
import { apiFetch } from "./client";

export async function getAnnoucementsAndAuthors() {
  return apiFetch<AnnoucementWithAuthor[]>("/announcements/active", {
    next: {
      revalidate: 600,
      tags: ["announcements"],
    },
  });
}

export async function getAnnoucementById(id: string) {
  return apiFetch<AnnoucementWithAuthor>(`/announcements/${id}`, {
    next: {
      revalidate: 1800,
      tags: [`annoucement-${id}`],
    },
  });
}
