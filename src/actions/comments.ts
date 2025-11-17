"use server";
import { revalidateTag } from "next/cache";
import { createComment } from "@/lib/api/comments";
import { CommentFormData } from "@/schemas/comment";

type ActionResult = {
  success: boolean;
  message?: string | string[];
  statusCode?: number;
  data?: any;
};

export async function createCommentAction(
  data: CommentFormData,
): Promise<ActionResult> {
  try {
    const response = await createComment(data);
    revalidateTag(`comments-${data.targetType}-${data.targetId}`);

    return {
      success: true,
      message: response.message,
      statusCode: response.statusCode,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error while commenting",
      statusCode: error?.statusCode || 500,
    };
  }
}
