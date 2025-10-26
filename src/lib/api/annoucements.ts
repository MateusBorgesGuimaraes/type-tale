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
