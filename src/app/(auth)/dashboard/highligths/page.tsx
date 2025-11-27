import LayoutBox from "@/components/ui/layout-box/layout-box";
import { getHighlightsAndAthorsPaginated } from "@/lib/api/highlights";
import ManageHighlights from "./components/manage-highlights/manage-highlights";
import { PaginationMeta } from "@/types/api";

type PageProps = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function HighlightsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  let highlightsResponse = null;

  try {
    highlightsResponse = await getHighlightsAndAthorsPaginated(page, limit);
  } catch (error: any) {
    console.error("Error loading highlights:", error);
  }

  if (!highlightsResponse) {
    return <div>No highlights found</div>;
  }

  return (
    <div className="wrapper">
      <LayoutBox>
        <ManageHighlights
          highlights={highlightsResponse?.data}
          meta={highlightsResponse?.meta as PaginationMeta}
        />
      </LayoutBox>
    </div>
  );
}
