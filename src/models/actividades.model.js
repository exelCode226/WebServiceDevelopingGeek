import mongoose from "mongoose";

const actividadesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcionA: {
        type: String,
        required: true,
    },

})

export const actividadesModel = mongoose.model('actividades', actividadesSchema);