import { Chapter, ChapterWithNavigation, StoryChapters } from "@/types/chapter";
import { apiFetch } from "./client";
import { ChapterSchema, UpdateChapterSchema } from "@/schemas/chapter";
const isDev = process.env.NODE_ENV === "development";

export async function getChaptersByStoryIdOrSlug(param: string) {
  return apiFetch<StoryChapters>(`/chapters/stories/${param}`, {
    next: {
      revalidate: isDev ? 0 : 180,
      tags: [`stories-${param}-chapters`],
    },
  });
}

export async function getChaptersByStoryIdOrSlugPrivate(param: string) {
  return apiFetch<StoryChapters>(`/chapters/stories/${param}/author`, {
    next: {
      revalidate: isDev ? 0 : 180,
      tags: [`stories-${param}-chapters-author`],
    },
  });
}

export async function getChapterByIdOrSlug(param: string) {
  return apiFetch<ChapterWithNavigation>(`/chapters/${param}`, {
    next: {
      revalidate: isDev ? 0 : 1400,
      tags: [`chapter-${param}`],
    },
  });
}

export async function createChapter(volumeId: string, data: ChapterSchema) {
  return apiFetch<Chapter>(`/chapters/volumes/${volumeId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateChapter(
  chapterId: string,
  data: UpdateChapterSchema,
) {
  return apiFetch<Chapter>(`/chapters/${chapterId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function toggleChapterIsDraft(chapterId: string) {
  return apiFetch(`/chapters/${chapterId}/toggle-draft`, {
    method: "PATCH",
  });
}

export async function deleteChapter(chapterId: string) {
  return apiFetch(`/chapters/${chapterId}`, {
    method: "DELETE",
  });
}
