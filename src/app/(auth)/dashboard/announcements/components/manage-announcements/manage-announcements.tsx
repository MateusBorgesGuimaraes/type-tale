"use client";
import { useState, useMemo } from "react";
import { Column, CustomTable } from "@/components/ui/custom-table/table";
import Image from "next/image";
import Link from "next/link";
import CustomCheckbox from "@/components/ui/custom-checkbox/custom-checkbox";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import Pagination from "@/components/ui/pagination/pagination";
import LinkButtonCustom from "@/components/ui/link-buttons/link-button-custom";
import { ArrowUpDown } from "lucide-react";
import { CirclePlusIcon } from "lucide-react";
import { toast } from "sonner";
import { AnnouncementComplete } from "@/types/annoucements";
import { toggleAnnouncementStatus } from "@/lib/api/annoucements";
import { revalidateAnnouncements } from "@/actions/announcements";

type ManageAnnoucementsProps = {
  annoucements: AnnouncementComplete[];
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

export default function ManageAnnoucements({
  annoucements,
  meta,
}: ManageAnnoucementsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedAnnoucements = useMemo(() => {
    const sorted = [...annoucements];

    switch (sortBy) {
      case "newest":
        return sorted;

      case "oldest":
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [annoucements, sortBy]);

  const columns: Column<AnnouncementComplete>[] = [
    {
      key: "image",
      label: "IMAGE",
      render: (_, item) => (
        <div className="relative w-28 h-16 rounded-md overflow-hidden">
          <Image
            src={transformLinkImage(item.image)}
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
          href={`/dashboard/announcements/update/${item.id}`}
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
            Order by:
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
          link="/dashboard/announcements/create"
        >
          <CirclePlusIcon className="w-5 h-5" /> NEW ANNOUCEMENT
        </LinkButtonCustom>
      </div>

      <CustomTable columns={columns} data={sortedAnnoucements} />

      <div className="border-t border-gray-200">
        <Pagination meta={meta} />
      </div>
    </div>
  );
}

async function handleToggleActive(id: string) {
  try {
    const result = await toggleAnnouncementStatus(id);
    if (result.statusCode !== 200) {
      const errorMsg =
        result.message || "Error when toggle your announcement status.";
      toast.error(errorMsg);
      return;
    }
    await revalidateAnnouncements();
    toast.success(result.message || "Announcement successfully updateded!");
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Unexpected error while updating your announcement.";
    toast.error(errorMsg);
  }
}
