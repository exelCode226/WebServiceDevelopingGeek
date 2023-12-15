import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  })

});
