import Link from "next/link";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { StorySearchResult } from "@/types/stories";

interface SearchResultItemProps {
  story: StorySearchResult;
  onClick: () => void;
}

export function SearchResultItem({ story, onClick }: SearchResultItemProps) {
  return (
    <Link
      href={`/story/${story.slug}`}
      onClick={onClick}
      className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer transition-colors"
      prefetch={false}
    >
      <img
        src={transformLinkImage(story.coverUrl)}
        alt={`Capa de ${story.title}`}
        className="w-10 h-14 object-cover rounded-md flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 block">
          {story.title}
        </span>
        {story.mainGenre && (
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {story.mainGenre}
          </span>
        )}
      </div>
    </Link>
  );
}
