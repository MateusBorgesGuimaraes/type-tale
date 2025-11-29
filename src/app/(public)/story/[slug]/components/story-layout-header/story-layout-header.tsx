"use client";

import ShowRatingStars from "@/components/ui/rating-stars/show-rating-stars";
import { Tag } from "@/components/ui/tag/tag";
import { Title } from "@/components/ui/title/title";
import Link from "next/link";
import IconText from "../icon-text/icon-text";
import {
  BookTextIcon,
  CirclePlayIcon,
  CirclePlusIcon,
  CircleXIcon,
  EyeIcon,
  TableOfContentsIcon,
} from "lucide-react";
import LinkButtonCustom from "@/components/ui/link-buttons/link-button-custom";
import { StoryInfos } from "@/types/stories";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import {
  addStoryIsInUserLibrary,
  checkIfStoryIsInUserLibrary,
  removeStoryFromUserLibrary,
} from "@/lib/api/library";
import { toast } from "sonner";

type StoryLayoutHeaderProps = {
  data: StoryInfos;
};

export default function StoryLayoutHeader({
  data: storyData,
}: StoryLayoutHeaderProps) {
  const { user } = useAuth();
  const [inLibrary, setInLibrary] = useState(false);

  useEffect(() => {
    if (!user) return;
    const isBookInLibrary = async () => {
      try {
        const { data: isIn } = await checkIfStoryIsInUserLibrary(storyData.id);
        setInLibrary(isIn?.inLibrary ?? false);
      } catch (err: any) {
        toast.error(err.message || JSON.stringify(err));
        setInLibrary(false);
      }
    };
    isBookInLibrary();
  }, [user, storyData.id]);

  const toggleLibrary = async () => {
    if (!user) {
      toast.error("You must be logged in to manage your library");
      return;
    }

    try {
      if (inLibrary) {
        const { data: response, statusCode } = await removeStoryFromUserLibrary(
          storyData.id,
        );

        if (statusCode === 200) {
          toast.success(response.message || "Story removed from your library");
          setInLibrary(false);
        } else {
          toast.error(
            response?.message || "Failed to remove the story from your library",
          );
        }
      } else {
        const { data, message } = await addStoryIsInUserLibrary(storyData.id);

        if (data) {
          toast.success(`Story "${data.storyTitle}" added to your library`);
          setInLibrary(true);
        } else {
          toast.error(message || "Failed to add the story to your library");
        }
      }
    } catch (error: any) {
      console.error("Library toggle error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section className="flex md:gap-8 gap-6 sm:flex-row flex-col max-sm:items-center">
      <div className="md:max-w-[313px] md:max-h-[470px] max-w-[260px] max-h-[390px] w-full h-full rounded-sm overflow-hidden">
        <Link href={`/story/${storyData.slug}`}>
          <img
            className="object-cover"
            src={transformLinkImage(storyData.coverUrl)}
            alt={storyData.title}
          />
        </Link>
      </div>
      <div className="flex flex-col md:gap-8 gap-6">
        <div>
          <Tag variant="gray">{storyData.status}</Tag>
        </div>
        <Title>{storyData.title}</Title>
        <p className="text-gray-800 font-medium dark:text-white">
          {storyData.author.username}
        </p>
        <div className="flex sm:gap-8 sm:flex-nowrap flex-wrap gap-4">
          <IconText
            text={storyData.mainGenre}
            icon={
              <BookTextIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
          <IconText
            text={`Chapters ${storyData.publishedChaptersCount}`}
            icon={
              <TableOfContentsIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
          <IconText
            text={`${storyData.viewsCount} Views`}
            icon={
              <EyeIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
        </div>

        {storyData.ratingCount > 0 ? (
          <ShowRatingStars
            maxWidth={180}
            avgRating={storyData?.ratingAvg || 0}
            reviewCount={storyData.ratingCount}
          />
        ) : (
          <p>No reviews for the story yet, be the first!!</p>
        )}

        <div className="flex  sm:gap-6 gap-4 flex-wrap md:mt-12 sm:justify-normal justify-center">
          <LinkButtonCustom className="bg-cyan-600 " link="/">
            <CirclePlayIcon className="w-6 h-6" /> READ
          </LinkButtonCustom>
          <button
            onClick={toggleLibrary}
            className="bg-cyan-600 flex gap-1.5 max-w-max items-center text-white hover:opacity-85 transition sx:text-lg font-medium rounded-lg py-2 sx:px-6 px-4 text-base cursor-pointer"
          >
            {inLibrary ? (
              <>
                <CircleXIcon className="w-6 h-6" /> REMOVE
              </>
            ) : (
              <>
                <CirclePlusIcon className="w-6 h-6" /> LIBRARY
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
