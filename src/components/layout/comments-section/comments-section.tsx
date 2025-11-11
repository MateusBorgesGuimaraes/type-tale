import CommentsDisplayOrder from "@/components/ui/comment-display-order/comment-display-order";
import { ApiResponse } from "@/types/api";
import { Comment } from "@/types/comment";

export function CommentsSection({
  commentsResponse,
  initialSortBy,
  targetId,
}: {
  commentsResponse: ApiResponse<Comment[]> | null;
  initialSortBy: "liked" | "newest";
  targetId: string;
}) {
  if (!commentsResponse) {
    return (
      <p className="font-semibold text-red-600 dark:text-red-400">
        Comments could not be loaded.
      </p>
    );
  }

  if (!commentsResponse.data || commentsResponse.data.length === 0) {
    return (
      <p className="font-semibold text-cyan-800 dark:text-cyan-400">
        No comments yet
      </p>
    );
  }

  if (!commentsResponse.meta) {
    return (
      <p className="font-semibold text-red-600 dark:text-red-400">
        Error loading pagination.
      </p>
    );
  }
  return (
    <CommentsDisplayOrder
      commentsData={commentsResponse.data}
      meta={commentsResponse.meta}
      targetId={targetId}
      initialSortBy={initialSortBy}
    />
  );
}
