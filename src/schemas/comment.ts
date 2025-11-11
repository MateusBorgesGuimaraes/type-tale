import * as z from "zod";

const targets = ["story", "chapter", "annoucement"];

export const commentSchema = z.object({
  body: z
    .string()
    .max(500, "The comment can have a maximum of 500 characters."),
  targetType: z.enum(targets),
  targetId: z.uuid(),
});

export type CommentFormData = z.infer<typeof commentSchema>;
