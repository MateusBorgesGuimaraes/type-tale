import { CardLink } from "@/components/ui/card-link/card-link";
import { CARDS_LINK } from "@/lib/utils/mockup-arrays";

export function InfoCardsSection() {
  return (
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
  );
}
