import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import StoryLayoutHeader from "./components/story-layout-header/story-layout-header";
import NavStory from "./components/nav-story/nav-story";

export default async function StoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mock = [
    { link: "/", name: "Home", slug: "home" },
    { link: "/", name: "Fantasy", slug: "fantasy" },
    {
      link: "/",
      name: "Blood Crown: Throne of Betrayal",
      slug: "/story/blood-crown:-throne-of-betrayal",
    },
  ];
  return (
    <div>
      <div className="md:pt-8 md:pb-12 pt-6 pb-8">
        <Breadcrumb data={mock} />
      </div>

      <StoryLayoutHeader />
      <NavStory slug={slug} />
      <section>{children}</section>
    </div>
  );
}
