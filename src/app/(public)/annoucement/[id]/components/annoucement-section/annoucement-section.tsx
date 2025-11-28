"use client";

import { CommentsSection } from "@/components/layout/comments-section/comments-section";
import CreateCommentButton from "@/components/ui/create-comment-button/create-comment-button";
import CommentForm from "@/components/ui/forms/comment-form";
import Modal from "@/components/ui/modal/modal";
import { Title } from "@/components/ui/title/title";
import { subtractDate } from "@/lib/utils/subtract-date";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { AnnoucementWithAuthor } from "@/types/annoucements";
import { ApiResponse } from "@/types/api";
import { Comment } from "@/types/comment";
import { PenToolIcon } from "lucide-react";
import { useState } from "react";

type AnnoucementSectionProps = {
  data: AnnoucementWithAuthor;
  commentsData: ApiResponse<Comment[]> | null;
};

export default function AnnoucementSection({
  commentsData,
  data,
}: AnnoucementSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid">
      <div className="max-w-[896px] w-full min-h-[calc(100vh-80px)] justify-self-center">
        <div className="sx:py-6 py-4">
          <img
            className="rounded-sm sx:max-h-[332px] max-h-56 w-full object-fit"
            src={transformLinkImage(data.image)}
            alt={data.title}
          />
        </div>
        <div className="text-center sx:pb-6 pb-4">
          <Title>{data.title}</Title>
        </div>
        <div className="text-gray-900 xms:text-xl text-base dark:text-gray-100">
          <div
            className="chapter-content sx:text-xl text-lg leading-8"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        <div className="text-gray-500 dark:text-gray-400 font-base gap-1 sx:py-12 py-8">
          <p className="flex gap-2">
            by {data.author.username}
            <span className="text-sm text-white bg-blue-500 font-semibold py-0.5 px-1.5 rounded-sm">
              Publisher
            </span>
          </p>
          <p>{subtractDate(data.publishedAt)}</p>
        </div>
      </div>
      <div className="py-8 border-t border-gray-200 dark:border-gray-700">
        <CreateCommentButton setIsOpen={setIsOpen}>
          <PenToolIcon /> Write a comment
        </CreateCommentButton>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="New commment"
          subtitle="Comment about the announcement"
          size="lg"
        >
          <CommentForm
            setIsOpen={setIsOpen}
            targetId={data.id}
            targetType="announcement"
          />
        </Modal>

        <CommentsSection
          initialSortBy={"liked"}
          commentsResponse={commentsData}
          targetId={data.id}
        />
      </div>
    </div>
  );
}
