import { cutText } from "@/lib/utils/cut-text";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { StoryRecommendation } from "@/types/stories";
import { StarIcon } from "lucide-react";
import Link from "next/link";

type RecommendationStoryCardProps = {
  data: StoryRecommendation;
};

export default function RecommendationStoryCard({
  data,
}: RecommendationStoryCardProps) {
  return (
    <Link href={`/story/${data.slug}`}>
      <div className="w-full max-h-[187px] h-full rounded-sm overflow-hidden">
        <img
          className="object-cover hover:scale-105 transition"
          src={transformLinkImage(data.coverUrl)}
          alt="alttext"
        />
      </div>
      <div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {cutText(data.title, 32)}
        </p>
        <span className="flex gap-1 text-gray-500 dark:text-gray-400">
          <StarIcon className="w-4 h-4" />
          <p className="text-sm">{data.ratingAvg || "4.8"}</p>
        </span>
      </div>
    </Link>
  );
}
