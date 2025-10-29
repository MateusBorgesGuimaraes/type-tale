import { Column, CustomTable } from "@/components/ui/custom-table/table";
import { subtractDate } from "@/lib/utils/subtract-date";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { RecentlyUpdatedStory } from "@/types/stories";
import Image from "next/image";

import Link from "next/link";

type RecentlyUpdatedTable = {
  storyTitle: string;
  cover: string;
  slug: string;
  chapterTitle: string;
  visualPosition: number;
  publishedChaptersCount: number;
  storyId: string;
  chapterId: string;
  author: string;
  time: Date;
};

type RecentlyUpdatedProps = {
  data: RecentlyUpdatedStory[];
};

export function RecentlyUpdated({ data }: RecentlyUpdatedProps) {
  const transformed: RecentlyUpdatedTable[] = data.map((item) => ({
    storyTitle: item.title,
    slug: item.slug,
    cover: item.coverUrl,
    publishedChaptersCount: item.publishedChaptersCount,
    chapterTitle: item.lastChapter.title,
    visualPosition: item.lastChapter.visualPosition,
    storyId: item.id,
    chapterId: item.lastChapter.id,
    author: item.author.username,
    time: item.updatedAt,
  }));

  const columns: Column<(typeof transformed)[number]>[] = [
    {
      key: "storyTitle",
      label: "Story",
      render: (_: unknown, item: (typeof transformed)[number]) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-14 rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src={transformLinkImage(item.cover)}
              alt={item.storyTitle}
              fill
              sizes="auto"
              className="object-cover"
            />
          </div>
          <Link
            href={`/story/${item.slug}`}
            className="font-medium text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-300 transition"
          >
            {item.storyTitle}
          </Link>
        </div>
      ),
    },
    {
      key: "chapterTitle",
      label: "Chapter",
      render: (_: unknown, item: (typeof transformed)[number]) => (
        <Link
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-300 transition"
          href={item.chapterId}
        >
          {item.chapterTitle}
        </Link>
      ),
    },
    { key: "author", label: "Author" },
    { key: "publishedChaptersCount", label: "LAST CHAPTER" },
    {
      key: "time",
      label: "Time",
      render: (_: unknown, item: (typeof transformed)[number]) => (
        <p>{subtractDate(item.time)}</p>
      ),
    },
  ];

  return <CustomTable columns={columns} data={transformed} />;
}
