import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "The username must be at least 3 characters long."),
  email: z.email("Valid email required."),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long."),
});

export const loginSchema = z.object({
  email: z.email("Valid email required."),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
