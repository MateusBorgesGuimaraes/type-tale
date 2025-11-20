import { Genre } from "./stories";

export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  role: "user" | "publisher";
  createdAt: Date;
  updatedAt: Date;
};

export type UserLoginResponse = {
  accessToken: string;
};

export type SimpleAuthor = {
  id: string;
  username: string;
  avatarUrl: string | null;
};

export type Author = {
  id: string;
  userame: string;
  email: string;
  avatarUrl: string | null;
};

export type UserStats = {
  storiesCount: number;
  commentsCount: number;
  ratingsCount: number;
  totalViews: number;
  totalFollowers: number;
};

export type UserProfile = Omit<User, "role"> & {
  stories: {
    id: string;
    title: string;
    slug: string;
    coverUrl: string;
    mainGenre: Genre;
    status: "ONGOING" | "HIATUS" | "DROPPED" | "COMPLETED";
    viewsCount: number;
    followersCount: number;
    chaptersCount: number;
  }[];
};

export type UpdateUser = {
  username?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
};
