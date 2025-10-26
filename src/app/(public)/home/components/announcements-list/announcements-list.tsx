import { cutText } from "@/lib/utils/cut-text";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import Link from "next/link";

type AnnoucementsListProps = {
  annoucements: {
    id: string;
    title: string;
    content: string;
    image: string;
  }[];
};

export function AnnoucementsList({ annoucements }: AnnoucementsListProps) {
  return (
    <ul className="flex flex-col">
      {annoucements.map((annoucement) => (
        <li
          key={annoucement.id}
          className="first:border-t border-b first:border-t-gray-200 border-b-gray-200 dark:first:border-t-gray-700 dark:border-b-gray-700 last:border-t-0 flex gap-4 items-center justify-center"
        >
          <div className="py-2">
            <Link href={"/"}>
              <h3 className="text-gray-900 dark:text-gray-50 font-medium text-xl hover:text-cyan-400 dark:hover:text-cyan-300 transition">
                {annoucement.title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-base font-normal">
              {cutText(annoucement.content, 80)}
            </p>
          </div>
          <div className="max-w-[151px] max-h-[87px] w-full h-full rounded-sm overflow-hidden sx:block hidden">
            <img
              src={transformLinkImage(annoucement.image)}
              alt={annoucement.title}
              style={{ height: "auto" }}
              className="rounded-sm object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
