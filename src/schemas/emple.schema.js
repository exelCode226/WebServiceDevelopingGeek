import { z } from "zod";

export const createEmpleSchema = z.object({
    username: z.string({
        required_error: "Nombre completo es requerido",
    }),
    typeEmpl: z
        .string({
            required_error: "Tipo Empleado es requerido",
        }),
    identify:z.string({
        required_error:"Documento es requerido"
    })

});