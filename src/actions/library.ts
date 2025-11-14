"use server";

import { revalidateTag } from "next/cache";
import { removeMultipleStoriesFromUserLibrary } from "@/lib/api/library";

type StoryBulkProps = {
  storyIds: string[];
};

export async function removeStoriesBulk(data: StoryBulkProps) {
  const response = await removeMultipleStoriesFromUserLibrary(data.storyIds);

  revalidateTag(`user-library`);
  return response;
}
