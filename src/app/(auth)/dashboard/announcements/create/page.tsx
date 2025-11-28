import AnnouncementForm from "@/components/ui/forms/announcement-form";
import LayoutBox from "@/components/ui/layout-box/layout-box";

export default async function CreateAnnouncementPage() {
  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-180px)]">
          <AnnouncementForm />
        </div>
      </LayoutBox>
    </div>
  );
}
