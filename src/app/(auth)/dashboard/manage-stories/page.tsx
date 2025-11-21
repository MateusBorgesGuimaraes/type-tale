import { getAllMyStories } from "@/lib/api/stories";
import LayoutBox from "../components/layout-box/layout-box";
import ManageStories from "./components/manage-stories/manage-stories";

export default async function ManageStoriesPage() {
  const { data: stories } = await getAllMyStories();

  if (stories.length === 0) {
    return <p>No stories yet</p>;
  }

  return (
    <div className="wrapper overflow-x-auto">
      <LayoutBox>
        <ManageStories stories={stories} />
      </LayoutBox>
    </div>
  );
}
