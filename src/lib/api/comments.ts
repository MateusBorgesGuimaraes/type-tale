import { Comment, CommentWithoutRating } from "@/types/comment";
import { apiFetch } from "./client";
import { CommentFormData } from "@/schemas/comment";
import { ApiError } from "next/dist/server/api-utils";

export async function getCommentsByTargetAndId(
  target: "story" | "chapter" | "announcement",
  id: string,
  page = 1,
  limit = 2,
) {
  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 2;

  return apiFetch<Comment[]>(
    `/comments/${target}/${id}?page=${page}&limit=${limit}`,
    {
      next: {
        revalidate: 3600,
        tags: [`comments-${target}-${id}`],
      },
    },
  );
}

export async function createComment(data: CommentFormData) {
  return apiFetch<CommentWithoutRating | ApiError>(`/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
