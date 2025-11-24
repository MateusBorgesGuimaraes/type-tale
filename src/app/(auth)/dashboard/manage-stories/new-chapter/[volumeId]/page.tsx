import { getStoryBySlugOrId } from "@/lib/api/stories";

import LayoutBox from "@/components/ui/layout-box/layout-box";
import ChapterForm from "@/components/ui/forms/chapter-form";

type PageProps = {
  params: Promise<{ volumeId: string }>;
};

export default async function NewChaptergPage({ params }: PageProps) {
  const { volumeId } = await params;

  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center w-full">
          <ChapterForm volumeId={volumeId} />
        </div>
      </LayoutBox>
    </div>
  );
}
