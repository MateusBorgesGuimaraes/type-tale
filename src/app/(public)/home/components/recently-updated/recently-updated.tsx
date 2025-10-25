import { Column, CustomTable } from "@/components/ui/custom-table/table";
import Image from "next/image";

import Link from "next/link";

export function RecentlyUpdated() {
  const updates = [
    {
      story: "A Lenda do Guardião",
      cover: "/mock-cover-1.jpg",
      chapter: "Capítulo 12",
      storyId: "hknuhbuhbh340yh2yn=y0",
      chatperId: "giyb04bh00ihhmgfhhnj",
      author: "Mateus Borges",
      time: "2 minutes ago",
    },
    {
      story: "Sombras do Amanhã",
      cover: "/mock-cover-2.jpg",
      chapter: "Capítulo 8",
      storyId: "hknuhbuhbh340yh2yn=y0",
      chatperId: "giyb04bh00ihhmgfhhnj",
      author: "Clara Nunes",
      time: "1 hour ago",
    },
    {
      story: "Sombras do Amanhã",
      cover: "/mock-cover-3.jpg",
      chapter: "Capítulo 8",
      storyId: "hknuhbuhbh340yh2yn=y0",
      chatperId: "giyb04bh00ihhmgfhhnj",
      author: "Clara Nunes",
      time: "2 hours ago",
    },
    {
      story: "A Lenda do Guardião",
      cover: "/mock-cover-1.jpg",
      chapter: "Capítulo 12",
      storyId: "hknuhbuhbh340yh2yn=y0",
      chatperId: "giyb04bh00ihhmgfhhnj",
      author: "Mateus Borges",
      time: "2 minutes ago",
    },
    {
      story: "Sombras do Amanhã",
      cover: "/mock-cover-2.jpg",
      chapter: "Capítulo 8",
      storyId: "hknuhbuhbh340yh2yn=y0",
      chatperId: "giyb04bh00ihhmgfhhnj",
      author: "Clara Nunes",
      time: "1 hour ago",
    },
    {
      story: "Sombras do Amanhã",
      cover: "/mock-cover-3.jpg",
      chapter: "Capítulo 8",
      storyId: "hknuhbuhbh340yh2yn=y0",
      chatperId: "giyb04bh00ihhmgfhhnj",
      author: "Clara Nunes",
      time: "2 hours ago",
    },
  ];

  const columns: Column<(typeof updates)[number]>[] = [
    {
      key: "story",
      label: "Story",
      render: (_: string, item: (typeof updates)[number]) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-14 rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src={item.cover}
              alt={item.story}
              fill
              className="object-cover"
            />
          </div>
          <Link
            href={item.storyId}
            className="font-medium text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-300 transition"
          >
            {item.story}
          </Link>
        </div>
      ),
    },
    {
      key: "chapter",
      label: "Chapter",
      render: (_: string, item: (typeof updates)[number]) => (
        <Link
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-300 transition"
          href={item.chatperId}
        >
          {item.chapter}
        </Link>
      ),
    },
    { key: "author", label: "Author" },
    { key: "time", label: "Time" },
  ];

  return <CustomTable columns={columns} data={updates} />;
}
