"use client";
import { Title } from "@/components/ui/title/title";
import {
  ArrowDownUpIcon,
  ArrowUpDownIcon,
  PencilLineIcon,
  XIcon,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface LibraryHeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  changeOrder: Dispatch<SetStateAction<"newest" | "oldest">>;
  order: "newest" | "oldest";
}

export default function LibraryHeader({
  isEditMode,
  onToggleEditMode,
  changeOrder,
  order,
}: LibraryHeaderProps) {
  return (
    <div className="flex justify-between items-center text-cyan-950 dark:text-cyan-400 border-b border-gray-200 dark:border-gray-700 pb-6">
      <Title>Library</Title>
      <div className="flex sx:gap-8 gap-4  items-center">
        <button
          onClick={onToggleEditMode}
          className={`flex sx:text-base text-sm sx:gap-2 gap-1 items-center font-semibold cursor-pointer transition ${
            isEditMode
              ? "text-red-600 dark:text-red-400 hover:text-red-700"
              : "hover:text-cyan-700 dark:hover:text-cyan-500"
          }`}
        >
          {isEditMode ? (
            <>
              <XIcon className="sx:w-6 sx:h-6 w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <PencilLineIcon className="sx:w-6 sx:h-6 w-4 h-4" /> Edit
            </>
          )}
        </button>
        {!isEditMode && (
          <button
            onClick={() =>
              changeOrder(order === "newest" ? "oldest" : "newest")
            }
            className="flex sx:gap-2 gap-1 sx:text-base text-sm  items-center font-semibold cursor-pointer hover:text-cyan-700 dark:hover:text-cyan-500 transition"
          >
            {order === "newest" ? (
              <>
                <ArrowUpDownIcon className="sx:w-6 sx:h-6 w-4 h-4" /> Newest
              </>
            ) : (
              <>
                <ArrowDownUpIcon className="sx:w-6 sx:h-6 w-4 h-4" /> Oldest
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
