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
