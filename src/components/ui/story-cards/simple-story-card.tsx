import { transformLinkImage } from "@/lib/utils/transform-link-image";
import Link from "next/link";

type SimpleStoryCardProps = {
  id: string;
  slug: string;
  coverUrl: string;
  title: string;
  mainGenre: string;
};

export function SimpleStoryCard({
  mainGenre,
  id,
  coverUrl,
  title,
  slug,
}: SimpleStoryCardProps) {
  return (
    <Link href={`/story/${slug}`} className="flex flex-col items-center group">
      <div className="relative max-w-[84px] max-h-[113px] w-full h-full rounded-sm overflow-hidden">
        <img
          src={transformLinkImage(coverUrl)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1">
          <span className="text-white text-[10px] text-center font-medium line-clamp-2">
            {title}
          </span>
        </div>
      </div>

      <span className="dark:text-gray-300 text-gray-400 text-xs mt-1">
        {mainGenre}
      </span>
    </Link>
  );
}
