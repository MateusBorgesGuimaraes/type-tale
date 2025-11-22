import { Column, CustomTable } from "@/components/ui/custom-table/table";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { StoryWithoutAuthor } from "@/types/stories";
import Image from "next/image";
import Link from "next/link";

type ManageStoriesProps = {
  stories: StoryWithoutAuthor[];
};

export default function ManageStories({ stories }: ManageStoriesProps) {
  const columns: Column<StoryWithoutAuthor>[] = [
    {
      key: "title",
      label: "STORY",
      render: (_: unknown, item: StoryWithoutAuthor) => (
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-20 rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src={transformLinkImage(item.coverUrl)}
              alt={item.title}
              fill
              sizes="auto"
              className="object-cover"
            />
          </div>
          <Link
            href={`/story/${item.slug}`}
            className="font-medium text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-300 transition"
          >
            {item.title}
          </Link>
        </div>
      ),
    },
    { key: "status", label: "STATUS" },
    { key: "chaptersCount", label: "CHAPTERS COUNT" },
    { key: "viewsCount", label: "VIEWS COUNT" },
    {
      key: "slug",
      label: "ACTIONS",
      render: (_: unknown, item: StoryWithoutAuthor) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/manage-stories/details/${item.slug}`}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Details
          </Link>
          <Link
            href={`/manage/story/${item.slug}/config`}
            className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            Config
          </Link>
        </div>
      ),
    },
  ];

  return <CustomTable columns={columns} data={stories} />;
}
