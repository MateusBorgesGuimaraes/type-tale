"use client";

import { LinkButton } from "@/components/ui/link-buttons/link-button";
import { useReadingProgress } from "@/hooks/use-reading-progress";
import Link from "next/link";
import { useEffect } from "react";

type ChapterBodyProps = {
  chapterTitle: string;
  chapterContent: string;
  chapterPostion: number;
  nextChapter: string | undefined;
  prevChapter: string | undefined;
  storyId: string;
  chapterId: string;
};

export default function ChapterBody({
  chapterContent,
  chapterTitle,
  nextChapter,
  prevChapter,
  chapterPostion,
  storyId,
  chapterId,
}: ChapterBodyProps) {
  const { updateProgress } = useReadingProgress({ storyId, chapterId });

  useEffect(() => {
    updateProgress(false);
  }, [chapterId, updateProgress]);

  return (
    <div className="w-[896px] max-w-full">
      <h1 className="text-cyan-800 dark:text-cyan-600 font-semibold sx:text-3xl text-xl pt-3 sx:pb-12 pb-6">
        Chapter {chapterPostion} : {chapterTitle}
      </h1>

      <div
        className="chapter-content sx:text-xl text-lg leading-8"
        dangerouslySetInnerHTML={{ __html: chapterContent }}
      />

      <div className="flex flex-col gap-3 py-12 items-center justify-center">
        {nextChapter ? (
          <LinkButton text="NEXT CHAPTER" link={`/chapter/${nextChapter}`} />
        ) : (
          <LinkButton
            disabled
            text="NEXT CHAPTER"
            link={`/chapter/${nextChapter}`}
          />
        )}
        {prevChapter ? (
          <Link
            href={`/chapter/${prevChapter}`}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300 border-b-2 font-medium border-gray-500 dark:border-gray-400 hover:border-gray-300 dark:hover:border-gray-300 transition md:text-base text-sm"
          >
            PREVIOUS CHAPTER
          </Link>
        ) : (
          <div className="text-gray-400 dark:text-gray-500 border-b-2 font-medium border-gray-400 dark:border-gray-500 md:text-base text-sm">
            PREVIOUS CHAPTER
          </div>
        )}
      </div>
    </div>
  );
}
