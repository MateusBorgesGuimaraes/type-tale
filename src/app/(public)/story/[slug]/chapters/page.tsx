import { getChaptersByStoryIdOrSlug } from "@/lib/api/chapters";
import VolumeSection from "../components/volume-section/volume-section";

export default async function StoryChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: chaptersData } = await getChaptersByStoryIdOrSlug(slug);
  return (
    <div className="full-bleed bg-gray-100 dark:bg-gray-800 pb-8">
      <div className="wrapper">
        <VolumeSection volumns={chaptersData} />
      </div>
    </div>
  );
}
