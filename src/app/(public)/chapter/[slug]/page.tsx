import { getChapterByIdOrSlug } from "@/lib/api/chapters";
import ChapterSection from "./components/chapter-section/chapter-section";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: chapterData } = await getChapterByIdOrSlug(slug);

  return (
    <section>
      <ChapterSection chapter={chapterData} />
    </section>
  );
}
