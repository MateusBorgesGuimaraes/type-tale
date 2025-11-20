import * as z from "zod";

export const updateUserProfileSchema = z.object({
  username: z
    .string()
    .min(3, "The username must be at least 3 characters long.")
    .optional(),
  email: z.email("Valid email required.").optional(),
  bio: z
    .string()
    .min(40, "The bio can have a minimum of 40 characters.")
    .max(500, "The bio can have a maximum of 500 characters.")
    .optional(),
  avatarUrl: z.string().optional(),
});

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
