"use client";
import { CheckCircle2Icon, CircleIcon } from "lucide-react";
import Link from "next/link";

interface StoryCardProgressProps {
  id: number;
  isEditMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
}

export default function StoryCardProgress({
  id,
  isEditMode = false,
  isSelected = false,
  onToggleSelect,
}: StoryCardProgressProps) {
  const handleClick = () => {
    if (isEditMode && onToggleSelect) {
      onToggleSelect(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col gap-2 relative ${
        isEditMode ? "cursor-pointer" : ""
      } ${isSelected ? "opacity-70" : ""}`}
    >
      {isEditMode && (
        <div className="absolute top-2 right-2 z-10">
          {isSelected ? (
            <CheckCircle2Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-gray-800 rounded-full" />
          ) : (
            <CircleIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-full" />
          )}
        </div>
      )}

      <Link
        href={"/"}
        className={`w-full aspect-[2/3] overflow-hidden rounded-md ${
          isSelected ? "ring-4 ring-cyan-600 dark:ring-cyan-400" : ""
        }`}
      >
        <img
          src="/mock-cover-1.jpg"
          alt="cover"
          className="w-full h-full object-cover"
        />
      </Link>

      <p className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
        Rebirth of the Thousand Shadows
      </p>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Progress 40/221
      </span>
    </div>
  );
}
