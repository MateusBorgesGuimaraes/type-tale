import { Chapter, ChapterWithNavigation, StoryChapters } from "@/types/chapter";
import { apiFetch } from "./client";
import { ChapterSchema } from "@/schemas/chapter";
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
