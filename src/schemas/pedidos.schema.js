import { z } from "zod";

export const createPedidoSchema = z.object({
    cliente: z.unknown({
        required_error:'Se requiere el cliente'
    }),
    productos: z.array(
        z.object({
          producto: z.unknown({
            required_error: 'Se requiere el producto'
          }),
          cantidad: z.number({
            required_error: 'Se requiere la cantidad'
          })
        })
      ),
      
    fecha_aprox: z.string({
        required_error:'Se requiere la fecha'
    }),
    especificaciones:  z.string({
        required_error:'Se requieren las especificaciones'
    })
    
})