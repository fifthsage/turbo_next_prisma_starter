import { z } from "zod";
import { SEX_VALUES } from "../enums";

export const baseUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  contact: z.string().optional().nullable(),
  profileImageUrl: z.string().url().optional().nullable(),
  sex: z.enum(SEX_VALUES).optional().nullable(),
  birth: z.coerce.date().optional().nullable(),
});

export const userCreateInputSchema = baseUserSchema.extend({
  email: z.string().email(),
  name: z.string().min(1),
});

export const userUpdateInputSchema = baseUserSchema.extend({});

export const userResponseSchema = baseUserSchema.extend({
  id: z.string(),
  email: z.string().email(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userPublicResponseSchema = userResponseSchema.omit({
  accessToken: true,
  refreshToken: true,
});

// Types
export type BaseUser = z.infer<typeof baseUserSchema>;
export type UserCreateInput = z.infer<typeof userCreateInputSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateInputSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserPublicResponse = z.infer<typeof userPublicResponseSchema>;
