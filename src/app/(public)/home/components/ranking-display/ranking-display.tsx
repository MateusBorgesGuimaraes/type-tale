import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { Story } from "@/types/stories";
import { ExpandIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RankingDisplayProps = {
  stories: Story[];
  title: string;
  query: string;
};

export function RankingDisplay({ stories, query, title }: RankingDisplayProps) {
  const colorsRanks = [
    "text-amber-400",
    "text-blue-600 dark:text-blue-500",
    "text-green-600",
    "text-gray-400 dark:text-gray-300",
    "text-gray-400 dark:text-gray-300",
  ];

  return (
    <div className="sx:min-w-[426px] max-w-[calc(100vw-32px)] w-full">
      <div className="flex w-full justify-between items-center">
        <h2 className="font-semibold text-cyan-950 dark:text-gray-50 py-1.5 px-3.5 bg-white dark:bg-gray-700 sx:text-xl text-lg w-full rounded-tl-sm">
          {title}
        </h2>
        <button className="w-[40px] h-[32px] flex items-center justify-center cursor-pointer hover:scale-110 transition">
          <ExpandIcon />
        </button>
      </div>
      <ul className="flex flex-col sx:py-6 py-3 px-3 bg-white dark:bg-gray-700 rounded-sm rounded-tl-none">
        {stories.map((story, index) => (
          <li
            key={index}
            className="flex gap-1.5 py-3 first-of-type:mt-0 border-b border-gray-200 dark:border-gray-800  last-of-type:border-b-0"
          >
            <div className="sx:max-w-[80px] sx:max-h-[107px] max-w-[60px] max-h-[80px] w-full h-full rounded-[2px] overflow-hidden">
              <img
                src={transformLinkImage(story.coverUrl)}
                alt={`Capa da historia ${story.title}`}
              />
            </div>
            <div className="flex gap-1.5">
              <span
                className={`${colorsRanks[index]} font-semibold text-nowrap`}
              >
                0{index + 1} -
              </span>
              <div className="flex flex-col  gap-1">
                <Link
                  href={`/story/${story.slug}`}
                  className="text-gray-900 dark:text-gray-50 hover:text-cyan-500 dark:hover:text-cyan-400 transition sx:text-base text-sm"
                >
                  {story.title}
                </Link>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {story.mainGenre}
                </span>
                <span className="flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {story.ratingAvg?.toFixed(1) || 5}
                  </p>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
