import { AnnoucementsList } from "@/components/announcements-list/announcements-list";
import { ImagesSlider } from "@/components/images-slider/images-slider";
import { RankingDisplay } from "@/components/ranking-display/ranking-display";
import { RankingSection } from "@/components/ranking-section/ranking-section";
import { Title } from "@/components/title/title";

export default function Home() {
  const IMAGES = [
    {
      url: "/mock-highligth.jpg",
      alt: "iamge1 alt text",
      href: "/teste",
    },
    {
      url: "/mock-highligth2.jpg",
      alt: "iamge2 alt text",
      href: "/teste",
    },
    {
      url: "/mock-highligth.jpg",
      alt: "iamge3 alt text",
      href: "/teste",
    },
    {
      url: "/mock-highligth2.jpg",
      alt: "iamge4 alt text",
      href: "/teste",
    },
  ];

  const ANNOUCEMENTS = [
    {
      id: 1,
      alt: "annoucement 1",
      title: "New Features Released!",
      content:
        "We've just launched new customization options for user profiles. Try them out and make your space truly yours!",
      imageUrl: "/mock-news.jpg",
    },
    {
      id: 2,
      alt: "annoucement 2",
      title: "Weekly Writing Challenge",
      content:
        "Participate in our new challenge! Write a short story under 1000 words and compete for premium rewards.",
      imageUrl: "/mock-news2.jpg",
    },
    {
      id: 3,
      alt: "annoucement 3",
      title: "Maintenance Notice",
      content:
        "The platform will undergo scheduled maintenance this Friday at 2 AM (UTC). Please save your work in advance.",
      imageUrl: "/mock-news3.jpg",
    },
  ];

  const STORIES = [
    {
      id: 1,
      title: "Harry Potter : uma historia de e se...",
      mainGenre: "filmes e series",
      rating: "4.8",
      coverImage: "/mock-cover-1.jpg",
    },
    {
      id: 2,
      title: "A camara secreta: nvo ponto de vista",
      mainGenre: "filmes e series",
      rating: "4.4",
      coverImage: "/mock-cover-2.jpg",
    },
    {
      id: 3,
      title: "One piece: o rei pirata na verdade é..",
      mainGenre: "animes",
      rating: "4.9",
      coverImage: "/mock-cover-3.jpg",
    },
    {
      id: 1,
      title: "Harry Potter : uma historia de e se...",
      mainGenre: "filmes e series",
      rating: "4.8",
      coverImage: "/mock-cover-1.jpg",
    },
    {
      id: 2,
      title: "A camara secreta: nvo ponto de vista",
      mainGenre: "filmes e series",
      rating: "4.4",
      coverImage: "/mock-cover-2.jpg",
    },
  ];

  return (
    <div>
      <section
        aria-label="Hero section"
        className="grid grid-cols-12 xm:gap-0 gap-4 lg:pt-10 pt-4"
      >
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start">
          <span className="xms:self-auto self-start">
            <Title variant="main">Destaques</Title>
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
            <Title variant="main">Anúncios</Title>
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
    </div>
  );
}
