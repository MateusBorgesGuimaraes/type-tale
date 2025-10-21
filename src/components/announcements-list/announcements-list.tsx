import Link from "next/link";

type AnnoucementsListProps = {
  annoucements: {
    id: number;
    alt: string;
    title: string;
    content: string;
    imageUrl: string;
  }[];
};

export function AnnoucementsList({ annoucements }: AnnoucementsListProps) {
  return (
    <ul className="flex flex-col">
      {annoucements.map((annoucement) => (
        <li
          key={annoucement.id}
          className="first:border-t border-b first:border-t-gray-200 border-b-gray-200 last:border-t-0 flex gap-4 items-center justify-center"
        >
          <div className="py-2">
            <Link href={"/"}>
              <h3 className="text-gray-900 font-medium text-xl hover:text-cyan-600 transition">
                {annoucement.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-base font-normal">
              {annoucement.content}
            </p>
          </div>
          <div className="max-w-[151px] max-h-[87px] w-full h-full rounded-sm overflow-hidden">
            <img src={annoucement.imageUrl} alt={annoucement.alt} />
          </div>
        </li>
      ))}
    </ul>
  );
}
