"use server";

import { revalidateTag } from "next/cache";
import { createComment } from "@/lib/api/comments";
import { CommentFormData } from "@/schemas/comment";

export async function createCommentAction(data: CommentFormData) {
  const response = await createComment(data);

  if (response.statusCode === 201) {
    revalidateTag(`comments-${data.targetType}-${data.targetId}`);
  }

  return response;
}
