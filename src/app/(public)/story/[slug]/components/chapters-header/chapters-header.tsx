"use client";

import { subtractDate } from "@/lib/utils/subtract-date";
import { SimpleChapter } from "@/types/chapter";
import { ListEndIcon, ListStartIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type ChapterHeaderProps = {
  action: Dispatch<SetStateAction<boolean>>;
  lastChapter: SimpleChapter | string | null;
  listOrderStart: boolean;
};

export default function ChapterHeader({
  action,
  listOrderStart,
  lastChapter,
}: ChapterHeaderProps) {
  const isValidChapter =
    lastChapter && typeof lastChapter !== "string" && "title" in lastChapter;

  return (
    <div className="flex justify-between items-center sm:text-normal text-xs">
      {!isValidChapter ? (
        <p>No chapters published yet</p>
      ) : (
        <p className="text-cyan-950 dark:text-gray-100 font-medium flex sm:gap-3 gap-1 flex-wrap">
          Last realease:
          <span className="flex gap-1.5 items-center">
            <Link
              className="text-cyan-600 hover:text-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-500 transition font-medium"
              href={"/"}
            >
              Chapter {lastChapter.visualPosition}: {lastChapter.title}
            </Link>
            <span className="text-gray-500 dark:text-gray-300 text-xs font-normal">
              {subtractDate(lastChapter.publishedAt)}
            </span>
          </span>
        </p>
      )}

      <div>
        <button onClick={() => action(!listOrderStart)}>
          {listOrderStart ? (
            <ListStartIcon className="text-cyan-950 dark:text-cyan-300 cursor-pointer hover:text-cyan-700 dark:hover:text-cyan-500 transition" />
          ) : (
            <ListEndIcon className="text-cyan-950 dark:text-cyan-300 cursor-pointer hover:text-cyan-700 dark:hover:text-cyan-500 transition" />
          )}
        </button>
      </div>
    </div>
  );
}
