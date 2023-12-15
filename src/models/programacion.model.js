import mongoose from "mongoose";

const programacionSchema = new mongoose.Schema({
  empleado: [
    {
      empleado: [{ type: mongoose.Types.ObjectId, ref: 'Empleado', required: true }],
      estadoEmpleado: {
        type: String,
        enum: ['En proceso', 'Terminado'], // Puedes agregar más estados si es necesario
        default: 'En proceso',
      },
    },
  ],
  actividades: [
    {
      actividadesPorProducto: [String],
      estadoActividades: {
        type: String,
        enum: ['En proceso', 'Terminado'],
        default: 'En proceso',
      },
    },
  ],
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'pedidos', required: true },
  estado: {
    type: String,
    enum: ['En proceso', 'Terminado'],
    default: 'En proceso',
  },
});


export const programacionModel = mongoose.model('Programacion', programacionSchema, "programaciones");

