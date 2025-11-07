import { CircleArrowLeftIcon, CircleArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function ChapterHeader() {
  return (
    <nav className="flex justify-between pt-6 pb-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Link
          className="max-w-15 max-h-[90px] w-full h-full rounded-sm overflow-hidden"
          href="/"
        >
          <img
            className="max-w-15 max-h-[90px] w-full h-full hover:scale-105 transition"
            src={"/mock-cover-1.jpg"}
          />
        </Link>
        <Link
          className="text-lg text-cyan-950 dark:text-cyan-600 dark:hover:text-cyan-400 font-semibold hover:text-cyan-700 transition"
          href="/"
        >
          Blood Crown: Throne of Betrayal
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/">
          <CircleArrowLeftIcon className="w-10 h-10 text-cyan-950 hover:text-cyan-600 dark:text-cyan-600 dark:hover:text-cyan-400 transition" />
        </Link>
        <Link href="/">
          <CircleArrowRightIcon className="w-10 h-10 text-cyan-950 hover:text-cyan-600 dark:text-cyan-600 dark:hover:text-cyan-400 transition" />
        </Link>
      </div>
    </nav>
  );
}
