"use client";
import { Title } from "@/components/ui/title/title";
import { ArrowUpDownIcon, PencilLineIcon, XIcon } from "lucide-react";

interface LibraryHeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function LibraryHeader({
  isEditMode,
  onToggleEditMode,
}: LibraryHeaderProps) {
  return (
    <div className="flex justify-between items-center text-cyan-950 dark:text-cyan-400 border-b border-gray-200 dark:border-gray-700 pb-6">
      <Title>Library</Title>
      <div className="flex gap-8 items-center">
        <button
          onClick={onToggleEditMode}
          className={`flex gap-2 items-center font-semibold cursor-pointer transition ${
            isEditMode
              ? "text-red-600 dark:text-red-400 hover:text-red-700"
              : "hover:text-cyan-700 dark:hover:text-cyan-500"
          }`}
        >
          {isEditMode ? (
            <>
              <XIcon /> Cancel
            </>
          ) : (
            <>
              <PencilLineIcon /> Edit
            </>
          )}
        </button>
        {!isEditMode && (
          <button className="flex gap-2 items-center font-semibold cursor-pointer hover:text-cyan-700 dark:hover:text-cyan-500 transition">
            <ArrowUpDownIcon /> Newest
          </button>
        )}
      </div>
    </div>
  );
}
