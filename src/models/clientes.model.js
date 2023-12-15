import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema({
    nombreCompleto:{
        type: String,
        required: true,
        trim: true,
    },
    documento:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    celular:{
        type: String,
        required: true,
        trim: true,
    }, 
    direccion:{
        type: String,
        required: true,
        trim: true,
    }
})

export const clientesModel = mongoose.model('Cliente', clientesSchema, "clientes");

