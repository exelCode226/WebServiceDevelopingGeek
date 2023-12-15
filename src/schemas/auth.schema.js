import { z } from 'zod'

//Buscar zod para mirar las validaciones, por ejemplo los caracteres de la contrasena 
//Aquí puedo consumir la api de alertas para hacer las validaciones en vez de un mensaje de error

export const registerSchema = z.object({
    nombre: z.string({
        required_error: 'Se requiere nombre.'
    }),
    documento: z.string({
        required_error: 'Se requiere documento.'
    }),
    email: z.string({
        required_error: 'Se requiere correo.'
    }),
    contrasena: z.string({
        required_error: 'Se requiere contraseña.'
    }).min(6, {
        message: "6 caracteres mínimos para la contraseña.",
      }).refine(value => {
        // Para que contenga al menos un caracter especial
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~]/;
        return specialCharRegex.test(value);
      }, {
        message: "La contraseña debe contener al menos un carácter especial.",
      }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Se requiere correo.'
    }),
    contrasena: z.string({
        required_error: 'Se requiere contraseña'
    })
});