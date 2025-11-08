import { StoryCleanner } from "./stories";
import { VolumeWithChapters } from "./volume";

export type SimpleChapter = {
  id: string;
  title: string;
  slug: string;
  position: string;
  isDraft: boolean;
  publishedAt: Date;
  wordsCount: number;
  visualPosition: number;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Chapter = {
  id: string;
  title: string;
  slug: string;
  content: string;
  position: string;
  isDraft: boolean;
  publishedAt: Date;
  wordsCount: number;
  visualPosition: number;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type StoryChapters = {
  story: StoryCleanner;
  volumes: VolumeWithChapters[];
};

export type ChapterWithNavigation = Chapter & {
  volume: {
    id: string;
    title: string;
    story: {
      id: string;
      title: string;
      coverUrl: string;
      slug: string;
    };
  };

  navigation: {
    previous: {
      id: string;
      title: string;
      slug: string;
      volumeTitle: string;
    } | null;
    next: {
      id: string;
      title: string;
      slug: string;
      volumeTitle: string;
    } | null;
    totalChapters: number;
  };
};
