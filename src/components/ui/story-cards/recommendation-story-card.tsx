import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function RecommendationStoryCard() {
  return (
    <Link href={"/"}>
      <div className="w-full max-h-[187px] h-full rounded-sm overflow-hidden">
        <img
          className="object-cover hover:scale-105 transition"
          src="/mock-cover-1.jpg"
          alt="alttext"
        />
      </div>
      <div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          The emperor of a fallen kingdom ...
        </p>
        <span className="flex gap-1 text-gray-500 dark:text-gray-400">
          <StarIcon className="w-4 h-4" />
          <p className="text-sm">4.8</p>
        </span>
      </div>
    </Link>
  );
}
