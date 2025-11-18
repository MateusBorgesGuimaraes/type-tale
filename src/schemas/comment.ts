import * as z from "zod";

const targets = ["story", "chapter", "announcement"];

export const commentSchema = z.object({
  body: z
    .string()
    .max(500, "The comment can have a maximum of 500 characters."),
  targetType: z.enum(targets),
  targetId: z.uuid(),
});

export type CommentFormData = z.infer<typeof commentSchema>;

export const updateCommentSchema = z.object({
  body: z
    .string()
    .max(500, "The comment can have a maximum of 500 characters."),
});

export type UpdateCommentFormData = z.infer<typeof updateCommentSchema>;
