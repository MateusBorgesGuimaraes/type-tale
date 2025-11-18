"use server";

import { revalidateTag } from "next/cache";
import { Rating } from "@/types/rating";
import { updateRating } from "@/lib/api/rating";

type ActionResult = {
  success: boolean;
  message?: string | string[];
  statusCode?: number;
  data?: any;
};

export async function updateRatingAction(
  rating: Omit<Rating, "id" | "createdAt">,
  storyId: string,
): Promise<ActionResult> {
  try {
    const response = await updateRating(rating, storyId);
    revalidateTag(`comments-story-${storyId}`);

    return {
      success: true,
      message: response.message,
      statusCode: response.statusCode,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error while updating the rating.",
      statusCode: error?.statusCode || 500,
    };
  }
}
