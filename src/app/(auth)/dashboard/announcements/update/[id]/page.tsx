import EditAnnouncementForm from "@/components/ui/forms/edit-announcement-form";
import LayoutBox from "@/components/ui/layout-box/layout-box";
import { getAnnoucementById } from "@/lib/api/annoucements";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateAnnouncementPage({ params }: PageProps) {
  const { id } = await params;

  const { data: announcementData } = await getAnnoucementById(id);

  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-180px)]">
          <EditAnnouncementForm announcement={announcementData} />
        </div>
      </LayoutBox>
    </div>
  );
}
