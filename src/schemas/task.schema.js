import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});
