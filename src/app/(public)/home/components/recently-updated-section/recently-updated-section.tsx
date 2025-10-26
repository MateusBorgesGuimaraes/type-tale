import { Title } from "@/components/ui/title/title";
import { RecentlyUpdated } from "../recently-updated/recently-updated";
import { getRecentlyUpdatedtSories } from "@/lib/api/stories";

export async function RecentlyUpdatedSection() {
  const { data: rencentlyUpdatedStoriesData } =
    await getRecentlyUpdatedtSories();
  return (
    <section className="full-bleed bg-gray-100 dark:bg-gray-800 mt-6 pb-8">
      <div className="wrapper">
        <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <Title>Recently updated</Title>
        </div>
        <div className="mt-4">
          <RecentlyUpdated data={rencentlyUpdatedStoriesData} />
        </div>
      </div>
    </section>
  );
}
