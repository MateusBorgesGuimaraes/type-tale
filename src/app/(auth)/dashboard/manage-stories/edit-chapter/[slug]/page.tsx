import { getStoryBySlugOrId } from "@/lib/api/stories";

import LayoutBox from "@/components/ui/layout-box/layout-box";
import ChapterForm from "@/components/ui/forms/chapter-form";
import { getChapterByIdOrSlug } from "@/lib/api/chapters";
import EditChapterForm from "@/components/ui/forms/edit-chapter-form";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await getChapterByIdOrSlug(slug);

  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center w-full">
          <EditChapterForm chapter={data} />
        </div>
      </LayoutBox>
    </div>
  );
}
