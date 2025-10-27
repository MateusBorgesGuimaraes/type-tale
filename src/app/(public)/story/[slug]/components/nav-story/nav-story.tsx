"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavStoryProps = {
  slug: string;
};

export default function NavStory({ slug }: NavStoryProps) {
  const pathname = usePathname();

  const links = [
    { href: `/story/${slug}`, label: "About" },
    { href: `/story/${slug}/chapters`, label: "Chapters" },
  ];

  return (
    <div className="full-bleed bg-gray-100 dark:bg-gray-800 mt-6 pb-8 pt-8">
      <nav className="wrapper border-b border-gray-300 flex gap-12">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                pb-2 border-b-4 text-2xl font-semibold transition-colors
                ${
                  isActive
                    ? "border-cyan-800 text-gray-600 dark:text-blue-400"
                    : "border-transparent text-gray-400 dark:text-gray-300 hover:border-gray-200"
                }
              `}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
