"use client";

import { subtractDate } from "@/lib/utils/subtract-date";
import { VolumeWithChapters } from "@/types/volume";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type VolumeListProps = {
  styleType?: "variant1" | "variant2";
  volumeAndChapters: VolumeWithChapters;
  volumePosition: number;
};

export default function VolumeList({
  styleType = "variant1",
  volumeAndChapters,
  volumePosition,
}: VolumeListProps) {
  const styleChoice = {
    variant1: "bg-gray-200 dark:bg-gray-800 text-cyan-950 dark:text-cyan-500",
    variant2: "bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-cyan-500",
  };
  const [showChapters, setShowChapters] = useState(false);

  return (
    <div>
      <button
        className={`py-4 px-6 w-full flex justify-between items-center cursor-pointer ${styleChoice[styleType]}`}
        onClick={() => setShowChapters(!showChapters)}
      >
        <p className="font-semibold text-lg">
          Volume {volumePosition}: {volumeAndChapters.volume.title}
        </p>
        <ChevronDownIcon
          className={`h-8 w-8 ${showChapters === true && "rotate-180"} transition`}
        />
      </button>
      <ul className={`${showChapters ? "block" : "hidden"}`}>
        {volumeAndChapters.chapters.map((chapter, index) => (
          <li
            key={chapter.id}
            className="py-4 px-6 flex text-cyan-800 dark:text-cyan-500 gap-12 border-b border-gray-300 dark:border-gray-700 first:border-t"
          >
            <span className="text-lg font-semibold">
              {chapter.visualPosition}
            </span>
            <div className="flex flex-col gap-1">
              <Link
                href={`/chapter/${chapter.slug}`}
                className="font-semibold hover:text-cyan-700 transition"
              >
                {chapter.title}
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {subtractDate(chapter.publishedAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
