"use server";

import { revalidateTag } from "next/cache";
import { likeComment, unlikeComment } from "@/lib/api/likes";

type ActionResponse = {
  statusCode: number;
  data?: {
    message: string;
    likesCount: number;
  };
};

export async function likeCommentAction(
  id: string,
  targetType: string,
  targetId: string,
): Promise<ActionResponse> {
  try {
    const response = await likeComment(id);

    if (response.statusCode === 201) {
      revalidateTag(`comments-${targetType}-${targetId}`);
    }

    return {
      statusCode: response.statusCode,
      data: response.data as { message: string; likesCount: number },
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      data: {
        message: error?.message || "Failed to like comment",
        likesCount: 0,
      },
    };
  }
}

export async function unlikeCommentAction(
  id: string,
  targetType: string,
  targetId: string,
): Promise<ActionResponse> {
  try {
    const response = await unlikeComment(id);

    if (response.statusCode === 200) {
      revalidateTag(`comments-${targetType}-${targetId}`);
    }

    return {
      statusCode: response.statusCode,
      data: response.data as { message: string; likesCount: number },
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      data: {
        message: error?.message || "Failed to unlike comment",
        likesCount: 0,
      },
    };
  }
}
