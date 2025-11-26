"use client";

import {
  NotebookPenIcon,
  FileSlidersIcon,
  HighlighterIcon,
  NewspaperIcon,
  UserRoundCogIcon,
  LibraryBigIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (!user) return null;

  const privateRoutes = [
    {
      icon: HighlighterIcon,
      label: "Highligths",
      href: "/dashboard/highligths",
    },
    {
      icon: NewspaperIcon,
      label: "Announcements",
      href: "/dashboard/announcements",
    },
  ];

  const publicRoutes = [
    { icon: UserRoundCogIcon, label: "User", href: "/dashboard" },
    {
      icon: LibraryBigIcon,
      label: "My stories",
      href: "/dashboard/my-stories",
    },
    {
      icon: FileSlidersIcon,
      label: "Manage stories",
      href: "/dashboard/manage-stories",
    },
    { icon: NotebookPenIcon, label: "New Story", href: "/dashboard/new-story" },
  ];

  const userPermissions =
    user.role === "publisher"
      ? [...publicRoutes, ...privateRoutes]
      : publicRoutes;

  return (
    <>
      <div
        role="navigation"
        aria-label="Dashboard menu"
        className={`
          hidden md:block
          absolute left-0 top-0 h-full
          bg-gray-50 dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700

          transition-all duration-300
          ${isOpen ? "w-[260px]" : "w-[68px]"}
        `}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 p-4 border-b border-gray-300 dark:border-gray-700">
            <div
              className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              <h2 className="text-lg font-bold text-cyan-950 dark:text-cyan-400 whitespace-nowrap">
                Dashboard
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-transform duration-300 cursor-pointer ${
                isOpen ? "" : "rotate-180"
              }`}
            >
              <ChevronsRightIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-2 mt-4">
            <ul className="space-y-2">
              {userPermissions.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-gray-800 dark:bg-gray-800 text-cyan-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                      } ${isOpen && "gap-3"}`}
                      title={!isOpen ? item.label : undefined}
                    >
                      <Icon className="w-6 h-6" />
                      <span
                        className={`whitespace-nowrap transition-all duration-300 ${
                          isOpen
                            ? "opacity-100 w-auto"
                            : "opacity-0 w-0 overflow-hidden"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className="
          md:hidden
          fixed bottom-0 left-0 right-0
          bg-gray-50 dark:bg-gray-900
          border-t border-gray-200 dark:border-gray-700
          px-2 py-2
          flex justify-around
          z-50
        "
      >
        {userPermissions.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full py-1 ${
                isActive ? "text-cyan-500" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </>
  );
}
