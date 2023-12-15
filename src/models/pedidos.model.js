import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({
  cliente: { type: mongoose.Types.ObjectId, ref: "Cliente", required: true },
  productos: [
    {
      producto: { type: mongoose.Types.ObjectId, ref: "productos", required: true },
      cantidad: { type: Number, required: true },
      nombre: String, // Campo adicional para almacenar el nombre del producto
      actividades: [String],
      precio: Number,
    }
  ],
  precioTotal: {
    type: Number,
  },
  fechaC: {
    type: String,
    trim: true,
  },
  fecha_aprox: {
    type: String,
    trim: true,
    required: true,
  },
  especificaciones: {
    type: String,
    required: true,
  },
  estado: {
    type: String, 
    enum: ["Pendiente", "En proceso", "Terminado"], // Define los valores permitidos
    default: "Pendiente"
  },
  user:{
     type: mongoose.Types.ObjectId, ref: "User", required: true 
    }
});

// Antes de guardar el pedido, puedes utilizar una función pre-save para obtener el nombre del producto
pedidosSchema.pre('save', async function (next) {
  const Product = mongoose.model('productos');
  const product = await Product.findOne({ _id: this.productos.producto });
  if (product) {
    this.productos.nombre = product.nombre;
  }
  next();
});

export const pedidosModel = mongoose.model("pedidos", pedidosSchema);