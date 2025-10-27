"use client";

import { ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type BreadcrumbProps = {
  data: {
    link: string;
    name: string;
    slug: string;
  }[];
};

export default function Breadcrumb({ data }: BreadcrumbProps) {
  const pathname = usePathname();

  return (
    <ul className="flex sm:gap-1 gap-0 items-center  font-medium md:text-xl sm:text-base text-xs transition">
      {data.map((obj, index) => (
        <div className="flex items-center gap-1" key={obj.name}>
          <li
            className={`${pathname === obj.slug ? "text-cyan-700 dark:text-cyan-400" : "text-gray-900  dark:text-gray-50 hover:text-cyan-700 dark:hover:text-cyan-400 "}`}
          >
            <Link href={obj.link}>{obj.name}</Link>
          </li>
          {index != data.length - 1 && (
            <ChevronRightIcon className="sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]" />
          )}
        </div>
      ))}
    </ul>
  );
}
