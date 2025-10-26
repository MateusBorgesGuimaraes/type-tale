import { SimpleAuthor } from "./author";

export type AnnoucementWithAuthor = {
  id: string;
  title: string;
  image: string;
  content: string;
  publishedAt: Date;
  author: SimpleAuthor;
};
