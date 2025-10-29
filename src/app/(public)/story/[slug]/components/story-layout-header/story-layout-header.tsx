import ShowRatingStars from "@/components/ui/rating-stars/show-rating-stars";
import { Tag } from "@/components/ui/tag/tag";
import { Title } from "@/components/ui/title/title";
import Link from "next/link";
import IconText from "../icon-text/icon-text";
import {
  BookTextIcon,
  CirclePlayIcon,
  CirclePlusIcon,
  EyeIcon,
  TableOfContentsIcon,
} from "lucide-react";
import LinkButtonCustom from "@/components/ui/link-buttons/link-button-custom";
import { StoryInfos } from "@/types/stories";
import { transformLinkImage } from "@/lib/utils/transform-link-image";

type StoryLayoutHeaderProps = {
  data: StoryInfos;
};

export default async function StoryLayoutHeader({
  data,
}: StoryLayoutHeaderProps) {
  return (
    <section className="flex md:gap-8 gap-6 sm:flex-row flex-col max-sm:items-center">
      <div className="md:max-w-[313px] md:max-h-[470px] max-w-[260px] max-h-[390px] w-full h-full rounded-sm overflow-hidden">
        <Link href={`/story/${data.slug}`}>
          <img
            className="object-cover"
            src={transformLinkImage(data.coverUrl)}
            alt={data.title}
          />
        </Link>
      </div>
      <div className="flex flex-col md:gap-8 gap-6">
        <div>
          <Tag variant="gray">{data.status}</Tag>
        </div>
        <Title>{data.title}</Title>
        <div className="flex sm:gap-8 sm:flex-nowrap flex-wrap gap-4">
          <IconText
            text={data.mainGenre}
            icon={
              <BookTextIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
          <IconText
            text={`Chapters ${data.publishedChaptersCount}`}
            icon={
              <TableOfContentsIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
          <IconText
            text={`${data.viewsCount} Views`}
            icon={
              <EyeIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
        </div>

        {data.ratingCount > 0 ? (
          <ShowRatingStars
            maxWidth={180}
            avgRating={data?.ratingAvg || 0}
            reviewCount={data.ratingCount}
          />
        ) : (
          <p>No reviews for the story yet, be the first!!</p>
        )}

        <div className="flex  sm:gap-6 gap-4 flex-wrap md:mt-12 sm:justify-normal justify-center">
          <LinkButtonCustom className="bg-cyan-600" link="/">
            <CirclePlayIcon className="w-6 h-6" /> READ
          </LinkButtonCustom>
          <LinkButtonCustom className="bg-cyan-600" link="/">
            <CirclePlusIcon className="w-6 h-6" /> LIBRARY
          </LinkButtonCustom>
        </div>
      </div>
    </section>
  );
}
