import { ChapterWithNavigation, StoryChapters } from "@/types/chapter";
import { apiFetch } from "./client";
const isDev = process.env.NODE_ENV === "development";

export async function getChaptersByStoryIdOrSlug(param: string) {
  return apiFetch<StoryChapters>(`/chapters/stories/${param}`, {
    next: {
      revalidate: isDev ? 0 : 180,
      tags: [`stories-${param}-chapters`],
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
