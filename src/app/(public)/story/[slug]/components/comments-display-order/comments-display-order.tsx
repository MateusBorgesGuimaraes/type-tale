"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Comment } from "@/types/comment";
import CommentDisplay from "@/components/ui/comment-display/comment-display";
import Pagination from "@/components/ui/pagination/pagination";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type CommentOrder = "liked" | "newest";

type CommentsDisplayOrderProps = {
  commentsData: Comment[];
  meta: PaginationMeta;
  storyId: string;
  initialSortBy?: CommentOrder;
};

export default function CommentsDisplayOrder({
  commentsData,
  meta,
  initialSortBy = "liked",
}: CommentsDisplayOrderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSortBy =
    (searchParams.get("sortBy") as CommentOrder) || initialSortBy;

  const buttons: CommentOrder[] = ["liked", "newest"];

  const sortedComments = useMemo(() => {
    return [...commentsData].sort((a, b) => {
      if (currentSortBy === "liked") {
        return b.likesCount - a.likesCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [commentsData, currentSortBy]);

  const handleSortChange = (sortBy: CommentOrder) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="full-bleed bg-gray-100 dark:bg-gray-800 mt-6 pb-8">
        <nav
          className="wrapper flex gap-6"
          role="tablist"
          aria-label="Comment sorting"
        >
          {buttons.map((sortBy) => (
            <button
              key={sortBy}
              onClick={() => handleSortChange(sortBy)}
              role="tab"
              aria-selected={currentSortBy === sortBy}
              aria-label={`Sort by ${sortBy === "liked" ? "most liked" : "most recent"}`}
              className={`
                pb-2 border-b-4 text-lg font-semibold cursor-pointer transition-colors uppercase
                ${
                  currentSortBy === sortBy
                    ? "border-cyan-800 text-gray-600 dark:text-cyan-400 dark:border-cyan-600"
                    : "border-transparent text-gray-400 dark:text-gray-300 hover:border-gray-200 dark:hover:border-gray-600"
                }
              `}
            >
              {sortBy === "liked" ? "Most liked" : "Most recent"}
            </button>
          ))}
        </nav>
      </div>

      <div className="wrapper mt-4">
        <div>
          {sortedComments.map((comment) => (
            <CommentDisplay key={comment.id} comment={comment} />
          ))}
        </div>
        <Pagination meta={meta} />
      </div>
    </div>
  );
}
