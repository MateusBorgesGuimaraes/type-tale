import { subtractDate } from "@/lib/utils/subtract-date";
import { VolumeWithChapters } from "@/types/volume";

import Link from "next/link";

type VolumeSectionProps = {
  startTop: boolean;
  volume: VolumeWithChapters;
  volumeOrder: number;
};

export function VolumeChapters({
  startTop,
  volume,
  volumeOrder,
}: VolumeSectionProps) {
  const order = startTop ? volume.chapters : [...volume.chapters].reverse();

  return (
    <div className="items-center justify-center w-full">
      <h4 className="text-xl font-semibold mb-4">
        Volume {volumeOrder}: {volume.volume.title}
      </h4>
      <ul className="flex flex-wrap justify-between">
        {order.map((chapter, index) => {
          const isColoredRow = Math.floor(index / 2) % 2 === 1;
          return (
            <li
              key={chapter.id}
              className={`
                  md:w-[49%] w-full border-b border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-1
                  ${index % 2 === 0 ? "bg-gray-200/20 dark:bg-gray-700/20" : "bg-transparent dark:bg-transparent"}
                  ${isColoredRow ? "md:bg-gray-200/20 dark:md:bg-gray-600/20" : "md:bg-transparent dark:md:bg-transparent"}
                `}
            >
              <Link
                className="text-gray-900 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-600 transition"
                href={`/chapter/${chapter.slug}`}
              >
                Chapter: {chapter.visualPosition} {chapter.title}
              </Link>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {subtractDate(chapter.publishedAt)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
