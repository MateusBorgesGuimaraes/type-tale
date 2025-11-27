import HighligthForm from "@/components/ui/forms/highligth-form";
import LayoutBox from "@/components/ui/layout-box/layout-box";

export default async function CreateHighlightPage() {
  return (
    <div className="wrapper">
      <LayoutBox>
        <div className="flex justify-center items-center w-full h-[calc(100vh-180px)]">
          <HighligthForm />
        </div>
      </LayoutBox>
    </div>
  );
}
