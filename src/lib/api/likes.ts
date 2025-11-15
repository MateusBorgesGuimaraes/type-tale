import { apiFetch } from "@/lib/api/client";

type LikeResponse = {
  message: string;
  likesCount: number;
};

export async function likeComment(id: string) {
  return apiFetch<LikeResponse>(`/comments/${id}/likes`, {
    method: "POST",
  });
}

export async function unlikeComment(id: string) {
  return apiFetch<LikeResponse>(`/comments/${id}/likes`, {
    method: "DELETE",
  });
}
