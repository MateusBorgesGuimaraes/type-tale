import LayoutBox from "@/components/ui/layout-box/layout-box";
import UserPersonalInfos from "./components/user-personal-infos/user-personal-infos";

export default async function DashboardPage() {
  return (
    <div className="wrapper">
      <LayoutBox>
        <UserPersonalInfos />
      </LayoutBox>
    </div>
  );
}
