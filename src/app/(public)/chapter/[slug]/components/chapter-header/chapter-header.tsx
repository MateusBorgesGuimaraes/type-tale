import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { CircleArrowLeftIcon, CircleArrowRightIcon } from "lucide-react";
import Link from "next/link";

type ChapterHeaderProps = {
  storySlug: string;
  storyTitle: string;
  storyCover: string;
  prevChapter: string | undefined;
  nextChapter: string | undefined;
};

export default function ChapterHeader({
  storySlug,
  storyTitle,
  storyCover,
  prevChapter,
  nextChapter,
}: ChapterHeaderProps) {
  return (
    <nav className="flex sx:flex-row gap-2 justify-between sx:pt-6 pt-4 pb-3 border-b border-gray-200 dark:border-gray-700">
      <div className="sx:flex items-center gap-3 hidden">
        <Link
          className="rounded-sm overflow-hidden"
          href={`/story/${storySlug}`}
        >
          <img
            className="sx:max-w-15 sx:max-h-[90px] max-w-10 max-h-15 w-full h-full hover:scale-105 transition"
            src={transformLinkImage(storyCover)}
          />
        </Link>
        <Link
          className="sx:text-lg text-base text-cyan-950 dark:text-cyan-600 dark:hover:text-cyan-400 font-semibold hover:text-cyan-700 transition"
          href={`/story/${storySlug}`}
        >
          {storyTitle}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {prevChapter ? (
          <Link href={`/chapter/${prevChapter}`}>
            <CircleArrowLeftIcon className="sx:w-10 sx:h-10 w-8 h-8 text-cyan-950 hover:text-cyan-600 dark:text-cyan-600 dark:hover:text-cyan-400 transition" />
          </Link>
        ) : (
          <div>
            <CircleArrowLeftIcon className="sx:w-10 sx:h-10 w-8 h-8 text-gray-400  dark:text-gray-600" />
          </div>
        )}
        {nextChapter ? (
          <Link href={`/chapter/${nextChapter}`}>
            <CircleArrowRightIcon className="sx:w-10 sx:h-10 w-8 h-8 text-cyan-950 hover:text-cyan-600 dark:text-cyan-600 dark:hover:text-cyan-400 transition" />
          </Link>
        ) : (
          <div>
            <CircleArrowRightIcon className="sx:w-10 sx:h-10 w-8 h-8 text-gray-400  dark:text-gray-600" />
          </div>
        )}
      </div>
    </nav>
  );
}
