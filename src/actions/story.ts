import * as z from "zod";

const storyTypes = ["original", "fanfic"];
const storyStatus = ["ONGOING", "HIATUS", "DROPPED", "COMPLETED"];
const storyLanguages = [
  "english",
  "portuguese",
  "spanish",
  "japanese",
  "korean",
];

const storyGenges = [
  "action",
  "adventure",
  "comedy",
  "drama",
  "fantasy",
  "horror",
  "romance",
  "scifi",
  "slash",
  "suspense",
  "thriller",
  "litRPG",
  "isekai",
  "other",
];

export const storySchema = z.object({
  title: z
    .string()
    .min(3, "The story name must be at least 3 characters long."),
  coverUrl: z.string().max(60),
  storyType: z.enum(storyTypes),
  synopsis: z
    .string()
    .min(20, "The synopsis must be at least 20 characters long."),
  tags: z.array(z.string()),
  mainGenre: z.enum(storyGenges),
  language: z.enum(storyLanguages),
  status: z.enum(storyStatus),
});

export const updateStorySchema = storySchema.partial();

export type StorySchema = z.infer<typeof storySchema>;
export type UpdateStorySchema = z.infer<typeof updateStorySchema>;
