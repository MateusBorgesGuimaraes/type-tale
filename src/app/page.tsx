import { AnnoucementsList } from "@/components/announcements-list/announcements-list";
import { ImagesSlider } from "@/components/images-slider/images-slider";
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

  return (
    <div>
      <section className="h-[calc(100dvh-81px)] grid grid-cols-12 pt-10">
        <div className="col-span-6 col-start-1">
          <Title variant="main">Destaques</Title>
          <section
            aria-label="Image Slider"
            className="max-w-[664px] w-full max-h-[316px] h-full aspect-[83/135] mt-6"
          >
            <ImagesSlider images={IMAGES} />
          </section>
        </div>
        <div className="col-span-5 col-start-8">
          <Title variant="main">Anúncios</Title>
          <section className="max-w-[548px] w-full mt-6">
            <AnnoucementsList annoucements={ANNOUCEMENTS} />
          </section>
        </div>
      </section>
    </div>
  );
}
