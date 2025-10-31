import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import { getAnnoucementById } from "@/lib/api/annoucements";
import AnnoucementSection from "./components/annoucement-section/annoucement-section";

export default async function AnnoucementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: annoucementData } = await getAnnoucementById(id);

  const breadcrumbsData = [
    { name: "Home", link: "/" },
    { name: "Annoucements" },
    {
      name: annoucementData.title,
      link: `/annoucement/${annoucementData.id}`,
      param: annoucementData.id,
    },
  ];

  return (
    <div>
      <div className="sx:py-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Breadcrumb data={breadcrumbsData} />
      </div>
      <div className="flex items-center justify-center">
        <AnnoucementSection {...annoucementData} />
      </div>
    </div>
  );
}
