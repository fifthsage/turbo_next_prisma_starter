import { z } from "zod";
import { SEX_VALUES } from "../enums";

export const baseManagerUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  contact: z.string().optional().nullable(),
  profileImageUrl: z.string().url().optional().nullable(),
  sex: z.enum(SEX_VALUES).optional().nullable(),
  birth: z.coerce.date().optional().nullable(),
});

export const managerUserCreateInputSchema = baseManagerUserSchema.extend({
  email: z.string().email(),
  name: z.string().min(1),
});

export const managerUserUpdateInputSchema = baseManagerUserSchema.extend({});

export const managerUserResponseSchema = baseManagerUserSchema.extend({
  id: z.string(),
  email: z.string().email(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const managerUserPublicResponseSchema = managerUserResponseSchema.omit({
  accessToken: true,
  refreshToken: true,
});

// Types
export type BaseManagerUser = z.infer<typeof baseManagerUserSchema>;
export type ManagerUserCreateInput = z.infer<
  typeof managerUserCreateInputSchema
>;
export type ManagerUserUpdateInput = z.infer<
  typeof managerUserUpdateInputSchema
>;
export type ManagerUserResponse = z.infer<typeof managerUserResponseSchema>;
export type ManagerUserPublicResponse = z.infer<
  typeof managerUserPublicResponseSchema
>;
