import { AnnoucementsList } from "@/components/announcements-list/announcements-list";
import { CardLink } from "@/components/card-link/card-link";
import { ImagesSlider } from "@/components/images-slider/images-slider";
import { RankingSection } from "@/components/ranking-section/ranking-section";
import { SimpleStoryCard } from "@/components/story-cards/simple-story-card";
import { TagsSection } from "@/components/tags-section/tags-section";
import { Title } from "@/components/title/title";
import {
  IMAGES,
  ANNOUCEMENTS,
  FANFICS_TAGS,
  STORIES,
  RAMDOM_STORIES,
  CARDS_LINK,
  ORIGINALS_TAGS,
} from "@/utils/mockup-arrays";

export default function Home() {
  return (
    <div>
      <section
        aria-label="Hero section"
        className="grid grid-cols-12 xm:gap-0 gap-4 lg:pt-10 pt-4"
      >
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start">
          <span className="xms:self-auto self-start">
            <Title variant="main">Highlights</Title>
          </span>
          <section
            aria-label="Image Slider"
            className="max-w-[664px] w-full sx:max-h-[316px] max-h-[200px] h-full aspect-[83/135] mt-6"
          >
            <ImagesSlider images={IMAGES} />
          </section>
        </div>
        <div className="xm:col-span-5 xm:col-start-8 lg:col-span-6 lg:col-start-7 lg:row-auto row-2 col-span-12 lg:block flex flex-col items-center">
          <span className="sx:self-auto self-start">
            <Title variant="main">Announcements</Title>
          </span>
          <section
            aria-label="Annoucements section"
            className="max-w-[548px] w-full mt-6"
          >
            <AnnoucementsList annoucements={ANNOUCEMENTS} />
          </section>
        </div>
      </section>
      <RankingSection
        ariaLabel="Fanfics Ranking"
        stories={STORIES}
        title="Fanfics Rankings"
        queries={{
          melhorAndamento: "/fanfic/ongoing",
          maisVistas: "/fanfic/most-viewed",
          melhorCompleta: "/fanfic/completed",
        }}
      />
      <section aria-label="Top Fanfics tags" className="py-8 overflow-hidden">
        <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
          <Title>Top Fanfics Tags</Title>
        </div>
        <div className="relative min-w-[1200px] overflow-hidden">
          <TagsSection tagsName={FANFICS_TAGS} />
        </div>
      </section>
      <RankingSection
        ariaLabel="Originals Rankings"
        stories={STORIES}
        title="Originals Rankings"
        queries={{
          melhorAndamento: "/original/ongoing",
          maisVistas: "/original/most-viewed",
          melhorCompleta: "/original/completed",
        }}
      />
      <section aria-label="Random Choices, websites infos and Original Tags">
        <div className="pb-8">
          <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <Title>Random Choices</Title>
          </div>
          <ul className="flex mt-6 lg:gap-7 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
            {RAMDOM_STORIES.map(({ id, genre, coverImage, title }) => (
              <li className="flex-shrink-0 snap-start " key={id}>
                <SimpleStoryCard
                  genre={genre}
                  id={id}
                  coverImage={coverImage}
                  title={title}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex md:flex-row items-center flex-col gap-8 pb-8">
          {CARDS_LINK.map(({ desc, image, link, title }, index) => (
            <CardLink
              desc={desc}
              title={title}
              image={image}
              link={link}
              key={index}
            />
          ))}
        </div>
        <section
          aria-label="Top Originals tags"
          className="py-8 overflow-hidden"
        >
          <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
            <Title>Top Originals Tags</Title>
          </div>
          <div className="relative min-w-[1200px] overflow-hidden">
            <TagsSection tagsName={ORIGINALS_TAGS} />
          </div>
        </section>
      </section>
    </div>
  );
}
