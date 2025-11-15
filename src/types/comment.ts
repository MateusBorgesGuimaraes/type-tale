import { Rating } from "./rating";
import { SimpleAuthor } from "./user";

export enum CommentTarget {
  CHAPTER = "chapter",
  ANNOUNCEMENT = "announcement",
  STORY = "story",
}

export type Comment = {
  id: string;
  body: string;
  targetType: CommentTarget;
  targetId: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
  user: SimpleAuthor;
  rating: Rating;
  isLiked: boolean;
};

export type CommentWithoutRating = Omit<Comment, "rating">;
