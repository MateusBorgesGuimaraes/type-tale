import * as z from "zod";

export const volumeSchema = z.object({
  title: z.string().min(3, "The volume name be at least 3 characters long."),
  description: z
    .string()
    .min(30, "The volume description must be at least 30 characters long."),
});

export const updateVolumeSchema = volumeSchema.partial();

export type VolumeSchemaData = z.infer<typeof volumeSchema>;
export type UpdateVolumeSchemaData = z.infer<typeof updateVolumeSchema>;
