import { z } from "zod";

export const createClienteSchema = z.object({
    nombreCompleto: z.string({
        required_error:"Se requiere el nombre completo"
    }),
    documento: z.string({
        required_error:'Se requiere el documento'
    }), 
    celular: z.string({
        required_error:'Se requiere el celular'
    }),
    direccion: z.string({
        required_error:'Se requieren la direccion'
    })
    
})