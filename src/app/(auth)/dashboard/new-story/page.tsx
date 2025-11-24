import StoryForm from "@/components/ui/forms/story-form";
import LayoutBox from "@/components/ui/layout-box/layout-box";

export default async function NewStoryPage() {
  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center w-full">
          <StoryForm />
        </div>
      </LayoutBox>
    </div>
  );
}
