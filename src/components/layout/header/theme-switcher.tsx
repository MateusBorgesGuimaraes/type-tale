"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded-sm transition"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <SunIcon className="xms:w-6 xms:h-6 w-5 h-5 text-gray-100" />
      ) : (
        <MoonIcon className="xms:w-6 xms:h-6 w-5 h-5 text-gray-900" />
      )}
    </button>
  );
}
