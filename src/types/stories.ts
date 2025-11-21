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

export type StoryWithoutAuthor = Omit<Story, "author">;

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

export type StorySearchParamsFull = {
  page?: number;
  limit?: number;
  search?: string;
  title?: string;
  storyType?: "original" | "fanfic";
  mainGenre?: string;
  language?: string;
  status?: "ONGOING" | "HIATUS" | "DROPPED" | "COMPLETED";
  tags?: string[];
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  chaptersCount?: number;
  followersCount?: number;
  viewsCount?: number;
  ratingAvg?: number;
};

export const GENRES = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "romance", label: "Romance" },
  { value: "scifi", label: "Science Fiction" },
  { value: "slash", label: "Slash" },
  { value: "suspense", label: "Suspense" },
  { value: "thriller", label: "Thriller" },
  { value: "litRPG", label: "LitRPG" },
  { value: "isekai", label: "Isekai" },
  { value: "other", label: "Other" },
];

export const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "portuguese", label: "Portuguese" },
  { value: "spanish", label: "Spanish" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
];

export const STATUS_OPTIONS = [
  { value: "ONGOING", label: "Ongoing" },
  { value: "HIATUS", label: "Hiatus" },
  { value: "DROPPED", label: "Dropped" },
  { value: "COMPLETED", label: "Completed" },
];

export const STORY_TYPE = [
  { value: "fanfic", label: "Fanfic" },
  { value: "original", label: "Original" },
];

export const SORT_OPTIONS = [
  { value: "createdAt", label: "Most Recent" },
  { value: "updatedAt", label: "Recently Updated" },
  { value: "viewsCount", label: "Most Viewed" },
  { value: "followersCount", label: "Most Followed" },
  { value: "ratingAvg", label: "Highest Rated" },
  { value: "chaptersCount", label: "Most Chapters" },
  { value: "title", label: "Title (A–Z)" },
];

export type Filters = {
  search: string;
  storyType: string;
  mainGenre: string;
  language: string;
  status: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
  page: number;
};

export type Genre =
  | "action"
  | "adventure"
  | "comedy"
  | "drama"
  | "fantasy"
  | "horror"
  | "romance"
  | "scifi"
  | "slash"
  | "suspense"
  | "thriller"
  | "litRPG"
  | "isekai"
  | "other";
