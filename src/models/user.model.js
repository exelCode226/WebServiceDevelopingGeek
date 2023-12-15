import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    documento: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    contrasena: {
        type: String,
        required: true,
        trim: true,
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
        required: true
   }]
},

    {
        timestamps: true, //Esto lleva las fechas de creación a la base de datos
    }

)

export default mongoose.model('User', userSchema)


