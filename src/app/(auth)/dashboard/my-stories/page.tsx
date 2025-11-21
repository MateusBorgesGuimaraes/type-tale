import { getAllMyStories } from "@/lib/api/stories";
import LayoutBox from "../components/layout-box/layout-box";
import UserStories from "./components/user-stories/user-stories";

export default async function MyStoriesPage() {
  const { data: stories } = await getAllMyStories();

  if (stories.length === 0) {
    return <p>No stories yet</p>;
  }

  return (
    <div className="wrapper">
      <LayoutBox>
        <UserStories stories={stories} />
      </LayoutBox>
    </div>
  );
}
