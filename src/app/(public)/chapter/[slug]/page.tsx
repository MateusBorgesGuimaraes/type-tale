import {
  getChapterByIdOrSlug,
  getChaptersByStoryIdOrSlug,
} from "@/lib/api/chapters";
import ChapterSection from "./components/chapter-section/chapter-section";
import { getCommentsByTargetAndId } from "@/lib/api/comments";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; limit?: string; sortBy?: string }>;
};

export default async function ChapterPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const { data: chapterData } = await getChapterByIdOrSlug(slug);
  const { data: storyChaptersData } = await getChaptersByStoryIdOrSlug(
    chapterData.volume.story.slug,
  );

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 2;

  let commentsResponse = null;

  try {
    commentsResponse = await getCommentsByTargetAndId(
      "chapter",
      chapterData.id,
      page,
      limit,
    );
  } catch (error: any) {
    console.error("Error loading comments:", error);
  }

  return (
    <section className="wrapper">
      <ChapterSection
        commentsData={commentsResponse}
        storyChapters={storyChaptersData}
        chapter={chapterData}
      />
    </section>
  );
}
