"use client";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

type ShowRatingStarsProps = {
  avgRating: number;
  reviewCount?: number;
  maxWidth?: number;
  textSize?: string;
};

export default function ShowRatingStars({
  avgRating,
  reviewCount,
  maxWidth = 120,
  textSize = "text-lg",
}: ShowRatingStarsProps) {
  return (
    <div className="flex items-center space-x-2 sm:flex-nowrap flex-wrap">
      <Rating style={{ maxWidth }} value={avgRating} readOnly />
      <span
        className={`${textSize} text-gray-500 dark:text-gray-300 whitespace-nowrap`}
      >
        {avgRating.toFixed(1)}
      </span>
      {reviewCount && (
        <span className="text-sm text-gray-400 whitespace-nowrap">
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
}
