import { BookMarkedIcon, CompassIcon, MoonIcon } from "lucide-react";
import Link from "next/link";
import { Searchbar } from "./searchbar";
import { UserModal } from "./user-modal";

export function Header() {
  return (
    <nav className="border-b border-gray-200 py-3">
      <div className="wrapper flex justify-between items-center">
        <div className="flex items-center gap-20">
          <Link href={"/"}>
            <img src={"/icon-black.svg"} alt="Typetale logo" />
          </Link>

          <ul className="flex items-center gap-8">
            <li className="hover:bg-gray-200 px-2 py-1 rounded-sm transition">
              <Link
                className="flex items-center justify-center gap-1.5"
                href={"/browse"}
              >
                <CompassIcon size={24} className="text-gray-900" />
                <p className="text-gray-900 font-normal text-xl">Browse</p>
              </Link>
            </li>

            <li className="hover:bg-gray-200 px-2 py-1 rounded-sm transition">
              <Link
                className="flex items-center justify-center gap-1.5"
                href={"/library"}
              >
                <BookMarkedIcon size={24} className="text-gray-900" />
                <p className="text-gray-900 font-normal text-xl">Library</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-20 relative">
          <Searchbar />

          <div className="flex items-center gap-8">
            <button className="cursor-pointer">
              <MoonIcon size={24} className="text-gray-900" />
            </button>
            <span className="text-gray-400">|</span>
            <UserModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
