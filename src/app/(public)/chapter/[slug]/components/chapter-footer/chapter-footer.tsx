"use client";
import {
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
  TextAlignJustifyIcon,
} from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

interface ChapterFooterProps {
  isVisible: boolean;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  bookTitle: string;
  prevChapterSlug: string | undefined;
  nextChapterSlug: string | undefined;
}

const ChapterFooter = forwardRef<HTMLButtonElement, ChapterFooterProps>(
  (
    {
      isVisible,
      onToggleSidebar,
      isSidebarOpen,
      bookTitle,
      prevChapterSlug,
      nextChapterSlug,
    },
    ref,
  ) => {
    return (
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 bg-gray-200 dark:bg-gray-900 text-cyan-950 dark:text-gray-200 w-full py-2 shadow-lg h-[80px] border-t border-gray-300 dark:border-gray-800 transition-all duration-300 ease-in-out z-50 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="wrapper flex h-full justify-between items-center">
          <button
            ref={ref}
            aria-label="Open chapters menu"
            aria-expanded={isSidebarOpen}
            onClick={onToggleSidebar}
            className="flex gap-3 cursor-pointer items-center hover:text-cyan-600 transition"
          >
            <TextAlignJustifyIcon />
            <p className="text-lg font-medium sx:block hidden">{bookTitle}</p>
          </button>

          <nav
            className="flex items-center gap-2"
            aria-label="Chapter navigation"
          >
            {prevChapterSlug ? (
              <Link
                href={`/chapter/${prevChapterSlug}`}
                aria-label="Previous chapter"
              >
                <CircleArrowLeftIcon className="sx:w-10 sx:h-10 w-8 h-8 text-cyan-950 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-600 transition" />
              </Link>
            ) : (
              <div aria-label="Previous chapter">
                <CircleArrowLeftIcon className="sx:w-10 sx:h-10 w-8 h-8 text-gray-400  dark:text-gray-500 transition" />
              </div>
            )}

            {nextChapterSlug ? (
              <Link
                href={`/chapter/${nextChapterSlug}`}
                aria-label="Next chapter"
              >
                <CircleArrowRightIcon className="sx:w-10 sx:h-10 w-8 h-8 text-cyan-950 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-600 transition" />
              </Link>
            ) : (
              <div aria-label="Next chapter">
                <CircleArrowRightIcon className="sx:w-10 sx:h-10 w-8 h-8 text-gray-400  dark:text-gray-500 transition" />
              </div>
            )}
          </nav>
        </div>
      </div>
    );
  },
);

ChapterFooter.displayName = "ChapterFooter";

export default ChapterFooter;
