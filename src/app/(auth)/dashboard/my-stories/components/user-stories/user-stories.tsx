"use client";

import { useState } from "react";
import { EyeIcon, HashIcon, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { StoryWithoutAuthor } from "@/types/stories";
import GenericSelect from "@/components/ui/generic-select/generic-select";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import StatsCard from "../../../components/stats-card/stats-card";

type UserStoriesProps = {
  stories: StoryWithoutAuthor[];
};

export default function UserStories({ stories }: UserStoriesProps) {
  const storiesMap = stories.map((story) => ({
    label: story.title,
    value: story.slug,
  }));

  const [selectedStory, setSelectedStory] = useState<StoryWithoutAuthor>(
    stories[0],
  );

  const handleStoryChange = (slug: string | number) => {
    const story = stories.find((s) => s.slug === slug);
    if (story) {
      setSelectedStory(story);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="w-[120px] h-[168px] rounded-sm overflow-hidden mx-auto sm:mx-0 flex-shrink-0">
            <img
              src={
                transformLinkImage(selectedStory.coverUrl) ||
                "/mock-cover-1.jpg"
              }
              alt={selectedStory.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1">
            <Link
              href={`/story/${selectedStory.slug}`}
              className="pb-3 text-xl text-cyan-950 hover:text-cyan-700 transition font-medium text-center sm:text-left"
            >
              {selectedStory.title}
            </Link>
            <p className="pb-6 text-sm text-gray-500 text-center sm:text-left">
              Last update {"N/A"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/stories/${selectedStory.slug}/new-chapter`}
                className="uppercase cursor-pointer rounded-lg font-medium transition bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg disabled:opacity-50 text-base py-2 px-6 inline-block text-center"
              >
                New Chapter
              </Link>
              <Link
                href={`/stories/${selectedStory.slug}`}
                className="text-base py-2 px-6 uppercase cursor-pointer rounded-lg font-medium transition border border-gray-500 text-gray-500 hover:opacity-85 inline-block text-center"
              >
                Details
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[300px]">
          <GenericSelect
            label="Stories"
            items={storiesMap}
            value={selectedStory.slug}
            onChangeAction={handleStoryChange}
            getLabelAction={(i) => i.label}
            getValueAction={(i) => i.value}
            showAllOption={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 pt-5">
        <div className="w-full">
          <StatsCard
            icon={HashIcon}
            label="Chapters"
            value={selectedStory.chaptersCount || 0}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>
        <div className="w-full">
          <StatsCard
            icon={EyeIcon}
            label="Views"
            value={selectedStory.viewsCount || 0}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>
        <div className="w-full">
          <StatsCard
            icon={UsersIcon}
            label="Followers"
            value={selectedStory.followersCount || 0}
            color="bg-gradient-to-br from-pink-500 to-pink-600"
          />
        </div>
        <div className="w-full">
          <StatsCard
            icon={StarIcon}
            label="Rating Count"
            value={selectedStory.ratingCount || 0}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          />
        </div>
        <div className="w-full bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="text-center">
            <p className="text-sm opacity-90 font-medium mb-2">Rating AVG</p>
            <p className="text-3xl font-bold">{selectedStory.ratingAvg || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
