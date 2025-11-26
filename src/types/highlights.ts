import { SimpleAuthor } from "./user";

export type HighlightWithAuthor = {
  id: string;
  title: string;
  banner: string;
  link: string;
  author: SimpleAuthor;
};

export type HighlightWithAuthorComplete = {
  id: string;
  title: string;
  banner: string;
  link: string;
  isActive: boolean;
  author: SimpleAuthor;
};
