import { Title } from "@/components/ui/title/title";
import { RankingDisplay } from "../ranking-display/ranking-display";

type RankingDisplayProps = {
  stories: {
    id: number;
    title: string;
    mainGenre: string;
    rating: string;
    coverImage: string;
  }[];
  ariaLabel: string;
  title: string;
  queries: {
    maisVistas: string;
    melhorCompleta: string;
    melhorAndamento: string;
  };
};

export function RankingSection({
  stories,
  ariaLabel,
  title,
  queries,
}: RankingDisplayProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="full-bleed bg-gray-100 dark:bg-gray-800 mt-6 pb-8"
    >
      <div className="wrapper">
        <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <Title>{title}</Title>
        </div>
        <div className="mt-6 flex gap-4 justify-between px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
          <div className="flex-shrink-0 snap-start">
            <RankingDisplay
              stories={stories}
              title="Most Viewed"
              query={queries.maisVistas}
            />
          </div>

          <div className="flex-shrink-0 snap-start">
            <RankingDisplay
              stories={stories}
              title="Best Ongoing"
              query={queries.melhorAndamento}
            />
          </div>

          <div className="flex-shrink-0 snap-start">
            <RankingDisplay
              stories={stories}
              title="Best completed"
              query={queries.melhorCompleta}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
