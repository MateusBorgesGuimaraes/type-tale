import { getAllMyStories } from "@/lib/api/stories";

import ManageStories from "./components/manage-stories/manage-stories";
import LayoutBox from "@/components/ui/layout-box/layout-box";
import { BookDashedIcon } from "lucide-react";
import Link from "next/link";

export default async function ManageStoriesPage() {
  const { data: stories } = await getAllMyStories();

  if (stories.length === 0) {
    return (
      <div className="wrapper flex items-center justify-center py-20">
        <LayoutBox>
          <div className="flex flex-col items-center text-center gap-4 py-10">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-inner">
              <BookDashedIcon className="w-14 h-14 text-gray-500 dark:text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              You haven’t created any stories yet
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Start your first story and bring your ideas to life. You can write
              originals, fanfics, or continue drafts already saved.
            </p>

            <Link href="/dashboard/new-story">
              <button className="mt-3 px-4 py-2 rounded-xl bg-primary text-gray-500 hover:bg-primary/90  hover:text-gray-700 transition cursor-pointer font-medium">
                Create your first story
              </button>
            </Link>
          </div>
        </LayoutBox>
      </div>
    );
  }

  return (
    <div className="wrapper overflow-x-auto">
      <LayoutBox>
        <ManageStories stories={stories} />
      </LayoutBox>
    </div>
  );
}
