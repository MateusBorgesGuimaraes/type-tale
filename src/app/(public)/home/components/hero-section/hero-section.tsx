import { Title } from "@/components/ui/title/title";
import { ImagesSlider } from "../images-slider/images-slider";
import { AnnoucementsList } from "../announcements-list/announcements-list";

type HeroSectionProps = {
  highlight: {
    id: string;
    title: string;
    link: string;
    banner: string;
  }[];
  annoucements: {
    id: string;
    title: string;
    content: string;
    image: string;
  }[];
};

export function HeroSection({ highlight, annoucements }: HeroSectionProps) {
  return (
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
          <ImagesSlider images={highlight} />
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
          <AnnoucementsList annoucements={annoucements} />
        </section>
      </div>
    </section>
  );
}
