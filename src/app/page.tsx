import { getHighlightsAndAthors } from "@/lib/api/highlights";
import { getAnnoucementsAndAuthors } from "@/lib/api/annoucements";
import { HeroSection } from "./(public)/home/components/hero-section/hero-section";
import { FanficsSection } from "./(public)/home/components/fanfics-section/fanfics-section";
import { Suspense } from "react";
import { OriginalSection } from "./(public)/home/components/originals-section/originals-section";
import { RandomChoicesSection } from "./(public)/home/components/random-choices-section/random-choices-section";
import { RecentlyUpdatedSection } from "./(public)/home/components/recently-updated-section/recently-updated-section";
import { Metadata } from "next";
import { FanficsTagsSection } from "./(public)/home/components/fanfics-tag-section/fanfics-tag-section";
import { OriginalsTagsSection } from "./(public)/home/components/originals-tags-section/originals-tags-section";
import { InfoCardsSection } from "./(public)/home/components/info-cards-section/info-cards-section";
import { RankingsSkeleton } from "@/components/ui/skeletons/rankings-skeleton";
import { RandomChoicesSkeleton } from "@/components/ui/skeletons/random-choices-skeleton";
import { RecentlyUpdatedSkeleton } from "@/components/ui/skeletons/recently-updated-skeleton";

export const metadata: Metadata = {
  title: "Type Tale - Fanfics e Histórias Originais",
  description: "Descubra as melhores fanfics e histórias originais...",
  openGraph: {
    title: "Type Tale - Fanfics e Histórias Originais",
    description: "Descubra as melhores fanfics e histórias originais",
    type: "website",
  },
};

export default async function HomePage() {
  const [highlightsResponse, annoucementsResponse] = await Promise.all([
    getHighlightsAndAthors(),
    getAnnoucementsAndAuthors(),
  ]);

  return (
    <div>
      <HeroSection
        annoucements={annoucementsResponse.data}
        highlight={highlightsResponse.data}
      />

      <Suspense fallback={<RankingsSkeleton />}>
        <FanficsSection />
      </Suspense>

      <FanficsTagsSection />

      <Suspense fallback={<RankingsSkeleton />}>
        <OriginalSection />
      </Suspense>

      <section aria-label="Random Choices, websites infos and Original Tags">
        <Suspense fallback={<RandomChoicesSkeleton />}>
          <RandomChoicesSection />
        </Suspense>

        <InfoCardsSection />

        <OriginalsTagsSection />
      </section>

      <Suspense fallback={<RecentlyUpdatedSkeleton />}>
        <RecentlyUpdatedSection />
      </Suspense>
    </div>
  );
}
