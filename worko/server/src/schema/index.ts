import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  resumeUrl: z.string().url(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  name: z.string(),
  jobTitle: z.enum(["developer", "manager", "director"]).default("developer"),
  role: z.enum(["user", "admin"]).default("user"),
});

export type User = z.infer<typeof userSchema>;

export const jwtPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "emp", "admin"]),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
