import EditHighligthForm from "@/components/ui/forms/edit-highligth-form";
import LayoutBox from "@/components/ui/layout-box/layout-box";
import { getOneHighligthById } from "@/lib/api/highlights";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CreateHighlightPage({ params }: PageProps) {
  const { id } = await params;

  const { data: highlightData } = await getOneHighligthById(id);

  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center items-center w-full h-[calc(100vh-180px)]">
          <EditHighligthForm highligth={highlightData} />
        </div>
      </LayoutBox>
    </div>
  );
}
