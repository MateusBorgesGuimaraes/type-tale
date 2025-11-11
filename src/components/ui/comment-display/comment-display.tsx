import { subtractDate } from "@/lib/utils/subtract-date";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { Comment, CommentWithoutRating } from "@/types/comment";
import { MessageCircleWarningIcon, ThumbsUpIcon } from "lucide-react";
import ShowRatingStars from "../rating-stars/show-rating-stars";
import { calcRatingAvg } from "@/utils/calc-rating-avg";

export type CommentDisplayProps = {
  comment: Comment | CommentWithoutRating;
};

function hasRating(
  comment: Comment | CommentWithoutRating,
): comment is Comment {
  return (
    "rating" in comment &&
    comment.rating !== null &&
    comment.rating !== undefined
  );
}

export default function CommentDisplay({ comment }: CommentDisplayProps) {
  return (
    <div className="flex flex-col gap-3 py-8 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="max-w-10 max-h-10 h-full w-full rounded-full overflow-hidden">
            <img
              src={
                comment.user.avatarUrl
                  ? transformLinkImage(comment.user.avatarUrl)
                  : "/mock-user.jpg"
              }
              alt={`Profile of ${comment.user.username}`}
              loading="lazy"
            />
          </div>

          <div className="flex flex-col h-full">
            <p className="text-cyan-950 dark:text-cyan-500 font-semibold">
              {comment.user.username}
            </p>
            {hasRating(comment) && (
              <ShowRatingStars
                textSize="text-sm"
                maxWidth={100}
                avgRating={calcRatingAvg(comment.rating)}
              />
            )}
          </div>
        </div>

        <button aria-label="Reportar comentário" onClick={() => {}}>
          <MessageCircleWarningIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="text-gray-600 dark:text-gray-300">{comment.body}</div>
      <div className="flex justify-between">
        <p className="text-gray-400  text-sm">
          {subtractDate(comment.createdAt)}
        </p>
        <button
          aria-label={`${comment.likesCount} curtidas`}
          onClick={() => {}}
          className="flex gap-1 cursor-pointer items-center"
        >
          <ThumbsUpIcon className="h-6 w-6 text-gray-500 dark:text-gray-300 hover:text-cyan-700 dark:hover:text-cyan-500 transition" />
          <p className="text-gray-500 dark:text-gray-300">
            {comment.likesCount}
          </p>
        </button>
      </div>
    </div>
  );
}
