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
  visualPosition: string;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type StoryChapters = {
  story: StoryCleanner;
  volumes: VolumeWithChapters[];
};
