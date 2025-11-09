"use client";
import { useEffect, useRef, useState } from "react";
import ChapterBody from "../chapter-body/chapter-body";
import ChapterHeader from "../chapter-header/chapter-header";
import ChapterSidebar from "../chapter-sidebar/chapter-sidebar";
import ChapterFooter from "../chapter-footer/chapter-footer";
import { ChapterWithNavigation, StoryChapters } from "@/types/chapter";

type ChapterSectionProps = {
  chapter: ChapterWithNavigation;
  storyChapters: StoryChapters;
};

export default function ChapterSection({
  chapter,
  storyChapters,
}: ChapterSectionProps) {
  const [showFooter, setShowFooter] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setShowFooter(currentScroll < lastScroll);
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSidebar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSidebar) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSidebar]);

  return (
    <div>
      <ChapterHeader
        storyTitle={chapter.volume.story.title}
        storyCover={chapter.volume.story.coverUrl}
        storySlug={chapter.volume.story.slug}
        prevChapter={chapter.navigation.previous?.slug}
        nextChapter={chapter.navigation.next?.slug}
      />

      <div className="flex items-center justify-center">
        <ChapterBody
          chapterContent={chapter.content}
          chapterPostion={chapter.visualPosition}
          chapterTitle={chapter.title}
          prevChapter={chapter.navigation.previous?.slug}
          nextChapter={chapter.navigation.next?.slug}
        />
      </div>

      <ChapterSidebar
        ref={sidebarRef}
        storyChapters={storyChapters}
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        bookTitle={chapter.volume.story.title}
        coverImage={chapter.volume.story.coverUrl}
      />

      <ChapterFooter
        ref={buttonRef}
        isVisible={showFooter}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        isSidebarOpen={showSidebar}
        bookTitle={chapter.volume.story.title}
        prevChapterSlug={chapter.navigation.previous?.slug}
        nextChapterSlug={chapter.navigation.next?.slug}
      />
    </div>
  );
}
