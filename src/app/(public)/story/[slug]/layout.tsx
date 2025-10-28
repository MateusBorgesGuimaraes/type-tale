import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import StoryLayoutHeader from "./components/story-layout-header/story-layout-header";
import NavStory from "./components/nav-story/nav-story";
import { getStoryBySlugOrId } from "@/lib/api/stories";

export default async function StoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await getStoryBySlugOrId(slug);

  // console.log("data", data);

  const bradcrumbsData = [
    { link: "/", name: "Home", slug: "home" },
    { link: "/", name: data.mainGenre, slug: data.mainGenre },
    {
      link: `/story/${data.slug}`,
      name: data.title,
      slug: data.slug,
    },
  ];
  return (
    <div>
      <div className="md:pt-8 md:pb-12 pt-6 pb-8">
        <Breadcrumb data={bradcrumbsData} />
      </div>

      <StoryLayoutHeader data={data} />
      <NavStory slug={slug} />
      <section>{children}</section>
    </div>
  );
}
