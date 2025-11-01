import { SimpleAuthor } from "./user";

export type HighlightWithAuthor = {
  id: string;
  title: string;
  banner: string;
  link: string;
  authot: SimpleAuthor;
};
