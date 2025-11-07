"use client";
import { useEffect, useRef, useState } from "react";
import ChapterBody from "../chapter-body/chapter-body";
import ChapterHeader from "../chapter-header/chapter-header";
import {
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
  TextAlignJustifyIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import VolumeList from "../volume-list/volume-list";

export default function ChapterSection() {
  const [showFooter, setShowFooter] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < lastScroll) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <div>
      <ChapterHeader />
      <div className="flex items-center justify-center">
        <ChapterBody />
      </div>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-[480px] bg-gray-50 dark:bg-gray-900 z-30 border-r-[14px] border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out overflow-y-auto ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center sticky top-0  p-6">
            <div>
              <img
                src="/mock-cover-1.jpg"
                alt=""
                className="w-[60px] h-[90px]"
              />
            </div>
            <h2 className="text-lg font-bold text-cyan-950 dark:text-cyan-400">
              Blood Crown: Throne of Betrayal
            </h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="border-y border-gray-300">
            <VolumeList />
            <VolumeList />
            <VolumeList />
            <VolumeList />
            <VolumeList />
            <VolumeList />
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 bg-gray-200 dark:bg-gray-900 text-cyan-950 dark:text-gray-200 w-full py-2 shadow-lg h-[80px] border-t border-gray-300 dark:border-gray-800 transition-all duration-300 ease-in-out z-50 ${
          showFooter
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="wrapper flex h-full justify-between items-center">
          <button
            ref={buttonRef}
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex gap-3 cursor-pointer items-center hover:text-cyan-400 transition"
          >
            <TextAlignJustifyIcon />
            <p className="text-lg font-medium">
              Blood Crown: Throne of Betrayal
            </p>
          </button>
          <div className="flex items-center gap-2">
            <Link href="/">
              <CircleArrowLeftIcon className="w-10 h-10 text-cyan-950  hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-600 transition" />
            </Link>
            <Link href="/">
              <CircleArrowRightIcon className="w-10 h-10 text-cyan-950 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-600 transition" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
