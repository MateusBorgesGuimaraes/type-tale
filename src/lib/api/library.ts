import {
  AddedLibrary,
  AddedLibraryStoriesInfos,
  IsInLibrary,
} from "@/types/library";
import { apiFetch } from "./client";
import { ApiError } from "@/types/api";
const isDev = process.env.NODE_ENV === "development";

export async function checkIfStoryIsInUserLibrary(storyId: string) {
  return apiFetch<IsInLibrary>(`/library/stories/${storyId}/check`);
}

export async function addStoryIsInUserLibrary(storyId: string) {
  return apiFetch<AddedLibrary>(`/library/stories/${storyId}`, {
    method: "POST",
  });
}

export async function removeStoryFromUserLibrary(storyId: string) {
  return apiFetch<{ message: string }>(`/library/stories/${storyId}`, {
    method: "DELETE",
  });
}

export async function getAllStoriesInUserLibrary() {
  return apiFetch<AddedLibraryStoriesInfos[] | ApiError>(`/library`, {
    next: {
      revalidate: isDev ? 0 : 1400,
      tags: [`user-library`],
    },
  });
}

export async function removeMultipleStoriesFromUserLibrary(ids: string[]) {
  return apiFetch<{ message: string }>(`/library/bulk`, {
    method: "DELETE",
    body: JSON.stringify({ storyIds: ids }),
  });
}
