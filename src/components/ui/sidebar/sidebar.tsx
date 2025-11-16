"use client";

import {
  ChevronsRight,
  Settings,
  FileText,
  HomeIcon,
  NotebookPenIcon,
  FileSlidersIcon,
  HighlighterIcon,
  NewspaperIcon,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
    { icon: HomeIcon, label: "Home", href: "/dashboard" },
    { icon: NotebookPenIcon, label: "New Story", href: "/dashboard/new-story" },
    {
      icon: FileSlidersIcon,
      label: "Manage stories",
      href: "/dashboard/manage-stories",
    },
    { icon: FileText, label: "Relatórios", href: "/dashboard/reports" },
    { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
  ];

  if (!user) return;

  const userPermissions =
    user.role === "publisher"
      ? [...privateRoutes, ...publicRoutes]
      : publicRoutes;

  return (
    <div
      role="navigation"
      aria-label="Dashboard menu"
      className={`absolute left-0 top-0 h-full bg-gray-50 dark:bg-gray-900 transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 ${
        isOpen ? "w-[280px]" : "w-[68px]"
      }`}
    >
      <div className="h-full overflow-y-auto">
        {/* Header */}
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
            aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
            className={`text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            }`}
          >
            <ChevronsRight className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-2 mt-4">
          <ul className="space-y-2">
            {userPermissions.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gray-800 dark:bg-gray-800 text-cyan-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                    title={!isOpen ? item.label : undefined}
                  >
                    <Icon
                      className={`w-6 h-6 flex-shrink-0 ${
                        isActive ? "text-cyan-400" : ""
                      }`}
                    />
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
  );
}
