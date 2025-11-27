import * as z from "zod";

export const highligthSchema = z.object({
  title: z
    .string()
    .min(3, "The highligth tile must be at least 3 characters long."),
  banner: z.string().max(60),
  link: z.string().max(60),
  isActive: z.boolean().optional(),
});

export const updateHighligthSchema = highligthSchema.partial();

export type HighligthSchema = z.infer<typeof highligthSchema>;
export type UpdateHighligthSchema = z.infer<typeof updateHighligthSchema>;
