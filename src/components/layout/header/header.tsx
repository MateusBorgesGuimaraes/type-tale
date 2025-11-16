"use client";

import { BookMarkedIcon, CompassIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

import { UserModal } from "./user-modal";
import { ThemeSwitcher } from "./theme-switcher";
import SearchBar from "@/components/ui/search/search-bar";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { user } = useAuth();

  const isLogged = user ? true : false;

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 py-3">
      <div className="wrapper flex justify-between items-center">
        <div className="flex items-center gap-20">
          <Link href={"/"}>
            <img
              src={"/icon-black.svg"}
              alt="Typetale logo"
              className="dark:invert xms:w-[140px] xms:h-[56px] w-[100px] h-[38px]"
            />
          </Link>

          <ul className="xm:flex hidden items-center gap-8">
            <li className="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded-sm transition">
              <Link
                className="flex items-center justify-center gap-1.5"
                href={"/browse"}
              >
                <CompassIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
                <p className="text-gray-900 dark:text-gray-50 font-normal text-xl">
                  Browse
                </p>
              </Link>
            </li>

            <li className="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded-sm transition">
              <Link
                className="flex items-center justify-center gap-1.5"
                href={"/library"}
              >
                <BookMarkedIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
                <p className="text-gray-900 dark:text-gray-50 font-normal text-xl">
                  Library
                </p>
              </Link>
            </li>

            <li className="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded-sm transition">
              <Link
                className="flex items-center justify-center gap-1.5"
                href={`${isLogged ? "/dashboard" : "/login"}`}
              >
                <LayoutDashboardIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
                <p className="text-gray-900 dark:text-gray-50 font-normal text-xl">
                  Dashboard
                </p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center md:gap-20 xms:gap-6 gap-2 relative">
          <SearchBar />

          <div className="flex items-center xms:gap-4 gap-2">
            <ThemeSwitcher />
            <span className="text-gray-400">|</span>
            <UserModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
