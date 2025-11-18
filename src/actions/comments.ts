"use server";
import { revalidateTag } from "next/cache";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/lib/api/comments";
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
      message: error?.message || "Unexpected error when commenting.",
      statusCode: error?.statusCode || 500,
    };
  }
}

export async function updateCommentAction(
  body: string,
  commentId: string,
  targetType: string,
  targetId: string,
): Promise<ActionResult> {
  try {
    const response = await updateComment(body, commentId);
    revalidateTag(`comments-${targetType}-${targetId}`);

    return {
      success: true,
      message: response.message,
      statusCode: response.statusCode,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error while updating comment.",
      statusCode: error?.statusCode || 500,
    };
  }
}

export async function deleteCommentAction(
  commentId: string,
  targetType: string,
  targetId: string,
): Promise<ActionResult> {
  try {
    const response = await deleteComment(commentId);
    revalidateTag(`comments-${targetType}-${targetId}`);

    return {
      success: true,
      message: response.message,
      statusCode: response.statusCode,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error while deleting comment.",
      statusCode: error?.statusCode || 500,
    };
  }
}
