import * as z from "zod";

export const announcementSchema = z.object({
  title: z
    .string()
    .min(3, "The announcement tile must be at least 3 characters long."),
  image: z.string().max(60),
  content: z
    .string()
    .max(50000, "The announcement must have in max 50.000k characters."),
  isActive: z.boolean().optional(),
});

export const updateAnnouncementSchema = announcementSchema.partial();

export type AnnouncementSchema = z.infer<typeof announcementSchema>;
export type UpdateAnnouncementSchema = z.infer<typeof updateAnnouncementSchema>;
