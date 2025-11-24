import { getStoryBySlugOrId } from "@/lib/api/stories";

import LayoutBox from "@/components/ui/layout-box/layout-box";
import EditStoryPage from "../components/edit-story-page/edit-story-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConfigPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: storyData } = await getStoryBySlugOrId(slug);

  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center w-full">
          <EditStoryPage story={storyData} />
        </div>
      </LayoutBox>
    </div>
  );
}
