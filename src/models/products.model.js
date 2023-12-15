import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    actividades: [{
        nombre: String, // Agrega el nombre de la actividad
        actividad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actividades' // Referencia al modelo de actividades
        }
    }]
});


export const ProductModel = mongoose.model('productos', productSchema);