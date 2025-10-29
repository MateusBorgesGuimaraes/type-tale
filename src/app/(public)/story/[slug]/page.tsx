"use client";

import LinkButtonCustom from "@/components/ui/link-buttons/link-button-custom";
import RecommendationStoryCard from "@/components/ui/story-cards/recommendation-story-card";
import { Tag } from "@/components/ui/tag/tag";
import { TitleHeading2 } from "@/components/ui/title-heading2/title-heading2";
import { useStory } from "./story-context";

export default function StoryAboutPage() {
  const { data, storiesRecommendationsData } = useStory();

  return (
    <div className="full-bleed bg-gray-100 dark:bg-gray-800 pb-8">
      <div className="wrapper flex flex-col sm:gap-8 gap-6">
        <div className="flex flex-col gap-4">
          <TitleHeading2>Synopsis</TitleHeading2>
          <p>{data.synopsis}</p>
        </div>

        <div className="flex flex-col gap-4 ">
          <TitleHeading2>Tags</TitleHeading2>
          <ul className="flex gap-3 sm:flex-nowrap flex-wrap">
            {data.tags?.map((tag: string) => (
              <li key={tag}>
                <Tag variant="ghost">{tag}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
          <TitleHeading2>Support the author</TitleHeading2>
          <div className="flex sm:gap-6 gap-4 sm:flex-nowrap flex-wrap">
            <LinkButtonCustom link="/" className="bg-[#F96854]">
              <img
                className="w-6 h-6 invert"
                src="/patreon.svg"
                alt="paypal icon"
              />{" "}
              PATREON{" "}
            </LinkButtonCustom>
            <LinkButtonCustom link="/" className="bg-[#00457C]">
              <img
                className="w-6 h-6 invert"
                src="/paypal.svg"
                alt="paypal icon"
              />
              PAYPAL
            </LinkButtonCustom>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TitleHeading2>You also may like</TitleHeading2>
          <ul className="flex justify-between gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
            {storiesRecommendationsData.map((story) => (
              <li
                key={story.id}
                className="flex-shrink-0 snap-start max-w-[140px] w-full"
              >
                <RecommendationStoryCard data={story} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
