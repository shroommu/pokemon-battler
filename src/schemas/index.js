import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().trim().toLowerCase().min(1),
  password: z.string().min(1),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9_-]+$/),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72),
});
