import { Author, SimpleAuthor } from "./author";

export type Story = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  synopsis: string;
  storyType: string;
  mainGenre: string;
  tags: string[];
  ratingAvg: number | null;
  ratingCount: number;
  createdAt: Date;
  author: Author;
};

export type StoriesRanks = {
  topViewed: Story[];
  topOngoing: Story[];
  topCompleted: Story[];
};

export type RecentlyUpdatedStory = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  updatedAt: Date;
  author: SimpleAuthor;
  lastChapter: {
    id: string;
    title: string;
    position: string;
    visualPosition: number;
  };
};
