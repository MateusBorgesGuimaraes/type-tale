"use client";
import { useState, useMemo } from "react";
import { Column, CustomTable } from "@/components/ui/custom-table/table";
import Image from "next/image";
import Link from "next/link";
import CustomCheckbox from "@/components/ui/custom-checkbox/custom-checkbox";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import Pagination from "@/components/ui/pagination/pagination";
import { HighlightWithAuthorComplete } from "@/types/highlights";
import LinkButtonCustom from "@/components/ui/link-buttons/link-button-custom";
import { ArrowUpDown } from "lucide-react";
import { CirclePlusIcon } from "lucide-react";
import { toggleHighlightStatus } from "@/lib/api/highlights";
import { toast } from "sonner";
import { revalidateHighlights } from "@/actions/highlights";

type ManageHighlightsProps = {
  highlights: HighlightWithAuthorComplete[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

type SortOption = "newest" | "oldest";

export default function ManageHighlights({
  highlights,
  meta,
}: ManageHighlightsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedHighlights = useMemo(() => {
    const sorted = [...highlights];

    switch (sortBy) {
      case "newest":
        return sorted;

      case "oldest":
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [highlights, sortBy]);

  const columns: Column<HighlightWithAuthorComplete>[] = [
    {
      key: "banner",
      label: "BANNER",
      render: (_, item) => (
        <div className="relative w-28 h-16 rounded-md overflow-hidden">
          <Image
            src={transformLinkImage(item.banner)}
            alt={item.title}
            fill
            className="object-cover"
            sizes="auto"
          />
        </div>
      ),
    },
    {
      key: "title",
      label: "TITLE",
      render: (_, item) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {item.title}
          </span>
          <span className="text-xs text-gray-400">
            by {item.author.username}
          </span>
        </div>
      ),
    },
    {
      key: "link",
      label: "LINK",
      render: (_, item) => (
        <Link
          href={item.link}
          className="underline text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 text-sm"
        >
          {item.link}
        </Link>
      ),
    },
    {
      key: "isActive",
      label: "ACTIVE",
      render: (_, item) => (
        <CustomCheckbox
          checked={item.isActive}
          onChangeAction={() => handleToggleActive(item.id)}
        />
      ),
    },
    {
      key: "id",
      label: "ACTIONS",
      render: (_, item) => (
        <Link
          href={`/dashboard/highligths/update/${item.id}`}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm transition"
        >
          Edit
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 mb-3 pb-6 flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <ArrowUpDown className="w-4 h-4" />
            Ordenar por:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Mais Recentes</option>
            <option value="oldest">Mais Antigos</option>
          </select>
        </div>

        <LinkButtonCustom
          className="bg-green-600 sx:text-sm text-sm"
          link="/dashboard/highligths/create"
        >
          <CirclePlusIcon className="w-5 h-5" /> NEW HIGHLIGHT
        </LinkButtonCustom>
      </div>

      <CustomTable columns={columns} data={sortedHighlights} />

      <div className="border-t border-gray-200">
        <Pagination meta={meta} />
      </div>
    </div>
  );
}

async function handleToggleActive(id: string) {
  try {
    const result = await toggleHighlightStatus(id);
    if (result.statusCode !== 200) {
      const errorMsg =
        result.message || "Error when toggle your highligth status.";
      toast.error(errorMsg);
      return;
    }
    await revalidateHighlights();
    toast.success(result.message || "Highligth successfully updateded!");
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Unexpected error while updating your highligth.";
    toast.error(errorMsg);
  }
}
