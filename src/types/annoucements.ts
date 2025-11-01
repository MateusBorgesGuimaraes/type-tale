import { SimpleAuthor } from "./user";

export type AnnoucementWithAuthor = {
  id: string;
  title: string;
  image: string;
  content: string;
  publishedAt: Date;
  author: SimpleAuthor;
};
