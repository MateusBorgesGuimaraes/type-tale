import LayoutBox from "@/components/ui/layout-box/layout-box";
import { PaginationMeta } from "@/types/api";
import ManageAnnoucements from "./components/manage-announcements/manage-announcements";
import { getAnnoucementsPaginated } from "@/lib/api/annoucements";

type PageProps = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function HighlightsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  let announcementResponse = null;

  try {
    announcementResponse = await getAnnoucementsPaginated(page, limit);
  } catch (error: any) {
    console.error("Error loading announcements:", error);
  }

  if (!announcementResponse) {
    return <div>No announcement found</div>;
  }

  return (
    <div className="wrapper">
      <LayoutBox>
        <ManageAnnoucements
          annoucements={announcementResponse?.data}
          meta={announcementResponse?.meta as PaginationMeta}
        />
      </LayoutBox>
    </div>
  );
}
