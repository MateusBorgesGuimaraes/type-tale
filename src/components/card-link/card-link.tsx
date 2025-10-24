import Link from "next/link";

type CardLinkProps = {
  title: string;
  desc: string;
  link: string;
  image: string;
};

export function CardLink({ desc, image, link, title }: CardLinkProps) {
  return (
    <Link
      href={link}
      className="group relative max-w-[432px] max-h-[160px] w-full h-full rounded-sm overflow-hidden"
    >
      <img
        src={image}
        alt={desc}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
        <h3 className="text-white text-xl font-semibold mb-1 drop-shadow-md">
          {title}
        </h3>
        <p className="text-gray-200 text-sm drop-shadow-sm">{desc}</p>
      </div>
    </Link>
  );
}
