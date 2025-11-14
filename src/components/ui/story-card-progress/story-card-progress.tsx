"use client";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { CheckCircle2Icon, CircleIcon } from "lucide-react";
import Link from "next/link";

interface StoryCardProgressProps {
  id: string;
  isEditMode?: boolean;
  isSelected?: boolean;
  coverUrl: string;
  storySlug: string;
  storyTitle: string;
  lastChapterInfos: {
    lastChapterReadId: string;
    lastChapterReadTitle: string;
    lastChapterReadSlug: string;
  } | null;
  readingProgress: {
    totalChapters: number;
    actualChapter: number;
  } | null;
  onToggleSelect?: (id: string) => void;
}

export default function StoryCardProgress({
  id,
  isEditMode = false,
  coverUrl,
  lastChapterInfos,
  storySlug,
  readingProgress,
  storyTitle,
  isSelected = false,
  onToggleSelect,
}: StoryCardProgressProps) {
  const handleClick = () => {
    if (isEditMode && onToggleSelect) {
      onToggleSelect(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col gap-2 relative ${
        isEditMode ? "cursor-pointer" : ""
      } ${isSelected ? "opacity-70" : ""}`}
    >
      {isEditMode && (
        <div className="absolute top-2 right-2 z-10">
          {isSelected ? (
            <CheckCircle2Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-gray-800 rounded-full" />
          ) : (
            <CircleIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-full" />
          )}
        </div>
      )}

      <Link
        href={`/story/${storySlug}`}
        className={`w-full aspect-[2/3] overflow-hidden rounded-md ${
          isSelected ? "ring-4 ring-cyan-600 dark:ring-cyan-400" : ""
        }`}
      >
        <img
          src={transformLinkImage(coverUrl)}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </Link>

      <p className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
        {storyTitle}
      </p>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {readingProgress && lastChapterInfos ? (
          <Link href={`/chapter/${lastChapterInfos.lastChapterReadSlug}`}>
            Progress {readingProgress.actualChapter}/
            {readingProgress.totalChapters}
          </Link>
        ) : (
          "Story not started yet"
        )}
      </span>
    </div>
  );
}
