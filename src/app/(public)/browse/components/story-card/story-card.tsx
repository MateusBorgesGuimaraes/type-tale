"use client";

import { Tag } from "@/components/ui/tag/tag";
import { TagColor } from "@/components/ui/tag/tags-color";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { Genre, StorySearchResult } from "@/types/stories";
import { useRouter } from "next/navigation";

interface StoryCardProps {
  story: StorySearchResult;
  genreColor: string;
}

export default function StoryCard({ story, genreColor }: StoryCardProps) {
  const router = useRouter();
  return (
    <div
      key={story.id}
      className="bg-white dark:bg-gray-800 dark:hover:bg-gray-950 rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
      onClick={() => router.push(`/story/${story.slug}`)}
    >
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {story.coverUrl ? (
          <img
            src={transformLinkImage(story.coverUrl)}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No cover
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {story.title}
        </h3>
        {/*<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            by {story.author}
          </p>*/}
        <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3 mb-3">
          {story.synopsis}
        </p>

        <div className="flex flex-wrap gap-2 text-xs mb-3">
          <TagColor color={genreColor}>{story.mainGenre}</TagColor>

          <Tag size="sm" variant="ghost">
            {story.status}
          </Tag>
        </div>

        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-300">
          <span>⭐ {story.ratingAvg?.toFixed(1) || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
