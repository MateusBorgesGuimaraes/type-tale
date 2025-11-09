import {
  getChapterByIdOrSlug,
  getChaptersByStoryIdOrSlug,
} from "@/lib/api/chapters";
import ChapterSection from "./components/chapter-section/chapter-section";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: chapterData } = await getChapterByIdOrSlug(slug);
  const { data: storyChaptersData } = await getChaptersByStoryIdOrSlug(
    chapterData.volume.story.slug,
  );

  return (
    <section>
      <ChapterSection storyChapters={storyChaptersData} chapter={chapterData} />
    </section>
  );
}
