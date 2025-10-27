import ShowRatingStars from "@/components/ui/rating-stars/show-rating-stars";
import { Tag } from "@/components/ui/tag/tag";
import { Title } from "@/components/ui/title/title";
import Link from "next/link";
import IconText from "../icon-text/icon-text";
import { BookTextIcon, EyeIcon, TableOfContentsIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button/link-button";

export default async function StoryLayoutHeader() {
  return (
    <section className="flex md:gap-8 gap-6 sm:flex-row flex-col max-sm:items-center">
      <div className="md:max-w-[313px] md:max-h-[470px] max-w-[260px] max-h-[390px] w-full h-full rounded-sm overflow-hidden">
        <Link href={"/"}>
          <img
            className="object-cover"
            src="/mock-cover-1.jpg"
            alt="alt text"
          />
        </Link>
      </div>
      <div className="flex flex-col md:gap-8 gap-6">
        <div>
          <Tag variant="gray">Completed</Tag>
        </div>
        <Title>Blood Crown: Throne of Betrayal</Title>
        <div className="flex sm:gap-8 sm:flex-nowrap flex-wrap gap-4">
          <IconText
            text="Fantasy"
            icon={
              <BookTextIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
          <IconText
            text="Chapters"
            icon={
              <TableOfContentsIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
          <IconText
            text="112k Views"
            icon={
              <EyeIcon className="text-gray-900 dark:text-gray-50 md:w-[24px] md:h-[24px] w-[20px] h-[20px]" />
            }
          />
        </div>
        <ShowRatingStars maxWidth={180} avgRating={4.8} reviewCount={235} />

        <div className="flex md:gap-8 sm:gap-6 gap-4 flex-wrap md:mt-12 sm:justify-normal justify-center">
          <LinkButton text="START READING" link="/" />
          <LinkButton text="ADD TO LIBRARY" link="/" />
        </div>
      </div>
    </section>
  );
}
