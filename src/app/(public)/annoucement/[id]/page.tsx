import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import { getAnnoucementById } from "@/lib/api/annoucements";
import AnnoucementSection from "./components/annoucement-section/annoucement-section";
import { getCommentsByTargetAndId } from "@/lib/api/comments";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; limit?: string; sortBy?: string }>;
};

export default async function AnnoucementPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const { data: announcementData } = await getAnnoucementById(id);
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 2;

  let commentsResponse = null;

  try {
    commentsResponse = await getCommentsByTargetAndId(
      "announcement",
      announcementData.id,
      page,
      limit,
    );
  } catch (error: any) {
    console.error("Error loading comments:", error);
  }

  const breadcrumbsData = [
    { name: "Home", link: "/" },
    { name: "Annoucements" },
    {
      name: announcementData.title,
      link: `/annoucement/${announcementData.id}`,
      param: announcementData.id,
    },
  ];

  return (
    <div className="wrapper">
      <div className="sx:py-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Breadcrumb data={breadcrumbsData} />
      </div>
      <div className="flex items-center justify-center">
        <AnnoucementSection
          data={announcementData}
          commentsData={commentsResponse}
        />
      </div>
    </div>
  );
}
