import * as z from "zod";

export const chapterSchema = z.object({
  title: z
    .string()
    .min(3, "The chapter title must be at least 3 characters long."),
  content: z
    .string()
    .max(100000, "The chapter must have in max 100.000k characters."),
  isDraft: z.boolean(),
});

export const updateChapterSchema = chapterSchema.partial();

export type ChapterSchema = z.infer<typeof chapterSchema>;
export type UpdateChapterSchema = z.infer<typeof updateChapterSchema>;
