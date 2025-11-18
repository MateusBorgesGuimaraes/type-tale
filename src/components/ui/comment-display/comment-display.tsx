"use client";

import { subtractDate } from "@/lib/utils/subtract-date";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { Comment, CommentWithoutRating } from "@/types/comment";
import {
  MessageCircleWarningIcon,
  SquarePenIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";
import ShowRatingStars from "../rating-stars/show-rating-stars";
import { calcRatingAvg } from "@/utils/calc-rating-avg";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { likeCommentAction, unlikeCommentAction } from "@/actions/like";
import { useState } from "react";
import Modal from "../modal/modal";
import UpdateCommentForm from "../forms/update-comment-form";
import UpdateReviewCommentForm from "../forms/update-review-comment-form";
import { deleteCommentAction } from "@/actions/comments";

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
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const likeOrUnlikeCommnet = async (
    comment: Comment | CommentWithoutRating,
  ) => {
    if (!user) {
      toast.error("Login is needed to like a comment");
      return;
    }

    const isCurrentlyLiked = comment.isLiked === true;

    const action = isCurrentlyLiked ? unlikeCommentAction : likeCommentAction;

    const res = await action(comment.id, comment.targetType, comment.targetId);

    if (!res || !res.statusCode) {
      toast.error("Unexpected error. Try again later.");
      return;
    }

    const successCodes = isCurrentlyLiked ? [200] : [201];

    if (successCodes.includes(res.statusCode)) {
      const msg =
        res.data?.message ??
        (isCurrentlyLiked ? "Comment unliked" : "Comment liked");
      toast.success(msg);
      return;
    }

    toast.error(res.data?.message || "Failed to update like");
  };

  const deleteComment = async () => {
    if (user && user.id !== comment.user.id) {
      toast.error("You are not the owner of the comment");
      return;
    }

    const confirmed = await new Promise<boolean>((resolve) => {
      toast("Are you sure you want to delete the comment?", {
        action: {
          label: "Yes, delete",
          onClick: () => {
            resolve(true);
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {
            resolve(false);
          },
        },
        duration: 10000,
        onDismiss: () => {
          resolve(false);
        },
        onAutoClose: () => {
          resolve(false);
        },
      });
    });

    if (!confirmed) return;

    const res = await deleteCommentAction(
      comment.id,
      comment.targetType,
      comment.targetId,
    );

    if (!res || !res.statusCode) {
      toast.error("Unexpected error. Try again later.");
      return;
    }

    if (res.statusCode === 200) {
      const msg = res.data.message || "Comment delete";

      toast.success(msg);
      return;
    }

    toast.error("Failed to delete the comment");
  };

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
        <div className="flex items-center gap-2">
          {user && user.id === comment.user.id && (
            <>
              <button
                aria-label="Edit Comment"
                onClick={() => setIsOpen(!isOpen)}
              >
                <SquarePenIcon className="h-8 w-8 py-1 px-1 rounded-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition cursor-pointer" />
              </button>
              {comment.targetType === "story" && hasRating(comment) ? (
                <Modal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  title="Update rating"
                  subtitle="Update your rating in story"
                  size="lg"
                >
                  <UpdateReviewCommentForm
                    setIsOpen={setIsOpen}
                    comment={comment}
                  />
                </Modal>
              ) : (
                <Modal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  title="Update comment"
                  subtitle="Update your comment"
                  size="lg"
                >
                  <UpdateCommentForm setIsOpen={setIsOpen} comment={comment} />
                </Modal>
              )}
              <button
                aria-label="Delete Comment"
                onClick={() => deleteComment()}
              >
                <Trash2Icon className="h-8 w-8 py-1 px-1 rounded-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition cursor-pointer" />
              </button>
            </>
          )}

          {user && user.id !== comment.user.id && (
            <button aria-label="Reportar comentário" onClick={() => {}}>
              <MessageCircleWarningIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>
      <div className="text-gray-600 dark:text-gray-300">{comment.body}</div>
      <div className="flex justify-between">
        <p className="text-gray-400  text-sm">
          {subtractDate(comment.createdAt)}
        </p>
        <button
          aria-label={`${comment.likesCount} likes`}
          onClick={() => likeOrUnlikeCommnet(comment)}
          className="flex gap-1 cursor-pointer items-center"
        >
          <ThumbsUpIcon
            className={`h-6 w-6 text-gray-500 dark:text-gray-300 hover:text-yellow-500 dark:hover:yellow-cyan-400 transition hover:scale-105 ${comment.isLiked && "text-yellow-400 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-500"}`}
          />
          <p
            className={`text-gray-500 dark:text-gray-300 ${comment.isLiked && "text-yellow-400 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-500"}`}
          >
            {comment.likesCount}
          </p>
        </button>
      </div>
    </div>
  );
}
