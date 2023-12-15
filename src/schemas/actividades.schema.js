import { z } from "zod";

export const createProductSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  descripcionA: z.string({
    required_error: "La descripción es requerido",
  }).min(0, {
    message: "No puedes ingresar un precio negativo",
  })
});
