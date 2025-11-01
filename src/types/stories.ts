import { Author, SimpleAuthor } from "./user";

export enum StoryStatus {
  ONGOING = "ONGOING",
  HIATUS = "HIATUS",
  DROPPED = "DROPPED",
  COMPLETED = "COMPLETED",
}

export type Story = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  synopsis: string;
  chaptersCount: number;
  publishedChaptersCount: number;
  viewsCount: number;
  followersCount: number;
  status: StoryStatus;
  storyType: string;
  mainGenre: string;
  tags: string[];
  ratingAvg: number | null;
  ratingCount: number;
  createdAt: Date;
  author: Author;
};

export type StoryCleanner = Pick<
  Story,
  "id" | "title" | "slug" | "chaptersCount"
>;

export type StoryRecommendation = Pick<
  Story,
  "id" | "title" | "slug" | "coverUrl" | "ratingAvg"
>;

export type StoryInfos = {
  id: string;
  slug: string;
  title: string;
  coverUrl: string;
  status: StoryStatus;
  mainGenre: string;
  tags: string[];
  publishedChaptersCount: number;
  viewsCount: number;
  followersCount: number;
  ratingAvg: number | null;
  ratingCount: number;
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
  publishedChaptersCount: number;
  lastChapter: {
    id: string;
    title: string;
    position: string;
    visualPosition: number;
  };
};

export type StorySearchResult = Pick<
  Story,
  | "id"
  | "title"
  | "slug"
  | "coverUrl"
  | "synopsis"
  | "mainGenre"
  | "status"
  | "tags"
  | "ratingAvg"
>;

export interface StorySearchParams {
  page?: number;
  limit?: number;
  title?: string;
  genre?: string;
  status?: "ONGOING" | "COMPLETED" | "HIATUS" | "CANCELLED";
}
