import {
  AnnouncementComplete,
  AnnoucementWithAuthor,
} from "@/types/annoucements";
import { apiFetch } from "./client";
import {
  AnnouncementSchema,
  UpdateAnnouncementSchema,
} from "@/schemas/annoucement";

export async function getAnnoucementsAndAuthors() {
  return apiFetch<AnnoucementWithAuthor[]>("/announcements/active", {
    next: {
      revalidate: 600,
      tags: ["announcements"],
    },
  });
}

export async function getAnnoucementById(id: string) {
  return apiFetch<AnnouncementComplete>(`/announcements/${id}`, {
    next: {
      revalidate: 1800,
      tags: [`annoucement-${id}`],
    },
  });
}

export async function getAnnoucementsPaginated(page = 1, limit = 2) {
  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 2;
  return apiFetch<AnnouncementComplete[]>(
    `/announcements/all?page=${page}&limit=${limit}`,
    {
      next: {
        revalidate: 3600,
        tags: ["announcements-paginated"],
      },
    },
  );
}

export async function createAnnouncement(data: AnnouncementSchema) {
  return apiFetch<AnnouncementComplete>(`/announcements`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAnnouncement(
  announcementId: string,
  data: UpdateAnnouncementSchema,
) {
  return apiFetch(`/announcements/${announcementId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function toggleAnnouncementStatus(announcementId: string) {
  return apiFetch(`/announcements/${announcementId}/toggle`, {
    method: "PATCH",
  });
}

export async function deleteAnnouncement(announcementId: string) {
  return apiFetch(`/announcements/${announcementId}`, {
    method: "DELETE",
  });
}
