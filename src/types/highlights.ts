import { SimpleAuthor } from "./author";

export type HighlightWithAuthor = {
  id: string;
  title: string;
  banner: string;
  link: string;
  authot: SimpleAuthor;
};
