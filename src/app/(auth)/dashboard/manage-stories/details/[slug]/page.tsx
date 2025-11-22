import { getStoryBySlugOrId } from "@/lib/api/stories";

import { getChaptersByStoryIdOrSlugPrivate } from "@/lib/api/chapters";
import DetailsHeader from "../components/details-header/details-header";
import DetailsChapter from "../components/details-chapters/details-chapters";
import LayoutBox from "@/components/ui/layout-box/layout-box";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: storyData } = await getStoryBySlugOrId(slug);
  const { data: chaptersData } = await getChaptersByStoryIdOrSlugPrivate(slug);

  return (
    <div className="wrapper">
      <LayoutBox>
        <DetailsHeader story={storyData} />
        <div className="pt-6">
          <DetailsChapter storyChapters={chaptersData} />
        </div>
      </LayoutBox>
    </div>
  );
}
