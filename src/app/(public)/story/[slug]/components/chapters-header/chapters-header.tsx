"use client";

import { ListEndIcon, ListStartIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type ChapterHeaderProps = {
  action: Dispatch<SetStateAction<boolean>>;
  listOrderStart: boolean;
};

export default function ChapterHeader({
  action,
  listOrderStart,
}: ChapterHeaderProps) {
  return (
    <div className="flex justify-between items-center sm:text-normal text-xs">
      <p className="text-cyan-950 dark:text-gray-100 font-medium flex sm:gap-3 gap-1 flex-wrap">
        Last realease:
        <span className="flex gap-1.5 items-center">
          <Link
            className="text-cyan-600 hover:text-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-500 transition font-medium"
            href={"/"}
          >
            Chapter 50: Throne of Betrayal
          </Link>
          <span className="text-gray-500 dark:text-gray-300 text-xs font-normal">
            11 hours ago
          </span>
        </span>
      </p>

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
