"use client";

import LayoutBox from "@/components/ui/layout-box/layout-box";
import { StoryChapters } from "@/types/chapter";
import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";
import VolumeDisplay from "./components/volume-display/volume-display";
import TinyButton from "@/components/ui/tiny-button/tiny-button";
import Modal from "@/components/ui/modal/modal";
import VolumeForm from "@/components/ui/forms/volume-form";

type DetailsChapterProps = {
  storyChapters: StoryChapters;
};

type SortOption = "oldest" | "newest" | "position";

export default function DetailsChapter({ storyChapters }: DetailsChapterProps) {
  const [sortBy, setSortBy] = useState<SortOption>("position");
  const [isOpen, setIsOpen] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const formatCount = (num: number | undefined) => {
    return String(num || 0).padStart(3, "0");
  };

  const sortedVolumes = [...storyChapters.volumes].map((volume) => {
    const sortedChapters = [...volume.chapters].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "position":
        default:
          return a.visualPosition - b.visualPosition;
      }
    });

    return {
      ...volume,
      chapters: sortedChapters,
    };
  });

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowSortMenu(false);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "newest":
        return "NEWEST FIRST";
      case "oldest":
        return "OLDEST FIRST";
      case "position":
      default:
        return "BY POSITION";
    }
  };

  return (
    <LayoutBox>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 sm:gap-10 text-gray-500 font-medium text-sm sm:text-base flex-wrap">
            <p>
              DRAFT ({formatCount(storyChapters.story.unpublishedChaptersCount)}
              )
            </p>
            <p>
              PUBLISHED (
              {formatCount(storyChapters.story.publishedChaptersCount)})
            </p>
          </div>

          <div className="flex gap-1.5">
            <div>
              <TinyButton
                onClick={() => setIsOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-500 "
              >
                NEW VOLUME
              </TinyButton>
              <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="New Volume"
                subtitle={`Crete a new volume for the story ${storyChapters.story.title}`}
                size="xl"
              >
                <VolumeForm
                  setIsOpenAction={setIsOpen}
                  storyId={storyChapters.story.id}
                  storySlug={storyChapters.story.slug}
                />
              </Modal>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex gap-2 text-gray-500 font-medium py-1 px-2 hover:bg-gray-200 transition rounded-sm cursor-pointer text-sm sm:text-base items-center"
              >
                {getSortLabel()} <ArrowUpDownIcon className="w-4 h-4" />
              </button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleSortChange("position")}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                      sortBy === "position" ? "bg-gray-50 font-semibold" : ""
                    }`}
                  >
                    By Position
                  </button>
                  <button
                    onClick={() => handleSortChange("newest")}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                      sortBy === "newest" ? "bg-gray-50 font-semibold" : ""
                    }`}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => handleSortChange("oldest")}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                      sortBy === "oldest" ? "bg-gray-50 font-semibold" : ""
                    }`}
                  >
                    Oldest First
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <VolumeDisplay
          storyId={storyChapters.story.id}
          storySlug={storyChapters.story.slug}
          volumeAndChapter={sortedVolumes}
        />
      </div>
    </LayoutBox>
  );
}
