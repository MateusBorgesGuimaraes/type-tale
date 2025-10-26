import { getStoriesRank } from "@/lib/api/stories";
import { RankingSection } from "../ranking-section/ranking-section";

export async function OriginalSection() {
  const { data: originalsData } = await getStoriesRank("original");
  return (
    <RankingSection
      ariaLabel="Originals Rankings"
      stories={originalsData}
      title="Originals Rankings"
      queries={{
        melhorAndamento: "/original/ongoing",
        maisVistas: "/original/most-viewed",
        melhorCompleta: "/original/completed",
      }}
    />
  );
}
