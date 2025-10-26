import { getStoriesRank } from "@/lib/api/stories";
import { RankingSection } from "../ranking-section/ranking-section";

export async function FanficsSection() {
  const { data: fanficsData } = await getStoriesRank("fanfic");
  return (
    <RankingSection
      ariaLabel="Fanfics Ranking"
      stories={fanficsData}
      title="Fanfics Rankings"
      queries={{
        melhorAndamento: "/fanfic/ongoing",
        maisVistas: "/fanfic/most-viewed",
        melhorCompleta: "/fanfic/completed",
      }}
    />
  );
}
