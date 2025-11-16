import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import StoryLayoutHeader from "./components/story-layout-header/story-layout-header";
import NavStory from "./components/nav-story/nav-story";
import {
  getStoryBySlugOrId,
  getStoriesRecommendationsByIdOrSlug,
} from "@/lib/api/stories";
import { StoryProvider } from "./story-context";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getStoryBySlugOrId(slug);

  return {
    title: data.title,
    description: data.synopsis,
    openGraph: {
      images: [transformLinkImage(data.coverUrl)],
    },
  };
}

export default async function StoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data }, { data: storiesRecommendationsData }] = await Promise.all([
    getStoryBySlugOrId(slug),
    getStoriesRecommendationsByIdOrSlug(slug),
  ]);

  const breadcrumbsData = [
    { name: "Home", link: "/" },
    { name: data.mainGenre },
    {
      name: data.title,
      link: `/story/${data.slug}`,
      param: data.slug,
    },
  ];

  return (
    <StoryProvider value={{ data, storiesRecommendationsData }}>
      <div className="wrapper">
        <div className="md:pt-8 md:pb-12 pt-6 pb-8">
          <Breadcrumb data={breadcrumbsData} />
        </div>

        <StoryLayoutHeader data={data} />

        <NavStory slug={slug} />
        <section>{children}</section>
      </div>
    </StoryProvider>
  );
}
