"use client";
import { XIcon } from "lucide-react";
import { forwardRef } from "react";
import VolumeList from "../volume-list/volume-list";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { StoryChapters } from "@/types/chapter";

interface ChapterSidebarProps {
  isOpen: boolean;
  storyChapters: StoryChapters;
  onClose: () => void;
  bookTitle: string;
  coverImage: string;
}

const ChapterSidebar = forwardRef<HTMLDivElement, ChapterSidebarProps>(
  ({ isOpen, onClose, bookTitle, coverImage, storyChapters }, ref) => {
    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Chapters menu"
        aria-hidden={!isOpen}
        className={`fixed top-0 xms:w-[calc(480px+14px)] w-full left-0 h-full bg-gray-50 dark:bg-gray-900 z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full xms:w-[480px] w-full overflow-y-auto">
          <div className="flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 p-6 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <img
                src={transformLinkImage(coverImage)}
                alt={`${bookTitle} cover`}
                className="sx:w-[60px] sx:h-[90px] sx:block hidden rounded-sm"
                loading="lazy"
              />
              <h2 className="text-lg font-bold text-cyan-950 dark:text-cyan-400">
                {bookTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="border-b border-gray-300 dark:border-gray-700">
            {storyChapters.volumes.map((volume, index) => (
              <VolumeList
                key={volume.volume.id}
                styleType={index % 2 !== 0 ? "variant1" : "variant2"}
                volumeAndChapters={volume}
                volumePosition={index + 1}
              />
            ))}
          </div>
        </div>

        <div className="absolute xms:block hidden top-0 right-0 h-full w-[14px] bg-gray-200 dark:bg-gray-800 pointer-events-none" />
      </div>
    );
  },
);

ChapterSidebar.displayName = "ChapterSidebar";

export default ChapterSidebar;
