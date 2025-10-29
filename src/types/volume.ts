import { SimpleChapter } from "./chapter";

export type Volume = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  chaptersCount: number;
};

export type VolumeWithChapters = {
  volume: Volume;
  chapters: SimpleChapter[];
};
