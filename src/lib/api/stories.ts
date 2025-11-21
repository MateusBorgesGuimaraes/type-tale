import {
  RecentlyUpdatedStory,
  StoriesRanks,
  Story,
  StoryRecommendation,
  StorySearchParams,
  StorySearchParamsFull,
  StorySearchResult,
  StoryWithoutAuthor,
} from "@/types/stories";
import { apiFetch } from "./client";
import { buildQueryString } from "../utils/build-query-string";

const isDev = process.env.NODE_ENV === "development";

export async function getStoriesRank(type: "fanfic" | "original") {
  return apiFetch<StoriesRanks>(`/stories/top?type=${type}`, {
    next: {
      revalidate: isDev ? 0 : 1800,
      tags: [`stories-rank-${type}`],
    },
  });
}

export async function getRamdomStories(limit = 12) {
  return apiFetch<Story[]>(`/stories/random?limit=${limit}`, {
    next: {
      revalidate: isDev ? 0 : 300,
      tags: ["stories-random"],
    },
  });
}

export async function getAllMyStories() {
  return apiFetch<StoryWithoutAuthor[]>(`/stories/me`);
}

export async function getRecentlyUpdatedtSories(limit = 6) {
  return apiFetch<RecentlyUpdatedStory[]>(
    `/stories/recently-updated?limit=${limit}`,
    {
      next: {
        revalidate: isDev ? 0 : 180,
        tags: ["stories-recent"],
      },
    },
  );
}

export async function getStoryBySlugOrId(param: string) {
  return apiFetch<Story>(`/stories/${param}`, {
    next: {
      revalidate: isDev ? 0 : 1800,
      tags: [`story-${param}`],
    },
  });
}

export async function getStoriesRecommendationsByIdOrSlug(param: string) {
  return apiFetch<StoryRecommendation[]>(`/stories/${param}/recommendations`, {
    next: {
      revalidate: isDev ? 0 : 1800,
      tags: [`stories-recommendations-[${param}]`],
    },
  });
}

export async function getStories(params: StorySearchParamsFull = {}) {
  const queryString = buildQueryString(params);

  return apiFetch<StorySearchResult[]>(`/stories${queryString}`, {
    next: {
      revalidate: isDev ? 0 : 300,
      tags: ["stories-list"],
    },
  });
}
