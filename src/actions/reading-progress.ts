"use server";

import { saveReadingProgress } from "@/lib/api/reading-progress";
import {
  ReadingProgressResponse,
  SaveReadingProgressType,
} from "@/types/reading-progress";

export async function saveReadingProgressAction(
  body: SaveReadingProgressType,
): Promise<ReadingProgressResponse> {
  try {
    const response = await saveReadingProgress(body);

    return {
      statusCode: response.statusCode,
      data: response.data as any,
      message: response.message,
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      data: undefined,
      message: error?.message || "Failed to save reading progress",
    };
  }
}
