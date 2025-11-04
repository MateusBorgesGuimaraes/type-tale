import { getCommentsByTargetAndId } from "@/lib/api/comments";
import { getStoryBySlugOrId } from "@/lib/api/stories";
import StoryAboutContent from "./components/story-about-content/story-about-content";
import { toast } from "sonner";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; limit?: string; sortBy?: string }>;
};

export default async function StoryAboutPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const { data: storyData } = await getStoryBySlugOrId(slug);

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 2;
  const sortBy = resolvedSearchParams.sortBy || "liked";

  let commentsResponse = null;

  try {
    commentsResponse = await getCommentsByTargetAndId(
      "story",
      storyData.id,
      page,
      limit,
    );
  } catch (error: any) {
    toast.error("Error loading comments:");
    console.error("Error loading comments:", error);
  }

  return (
    <StoryAboutContent
      commentsResponse={commentsResponse}
      initialSortBy={sortBy as "liked" | "newest"}
    />
  );
}
