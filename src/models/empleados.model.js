import mongoose from "mongoose";
import { boolean } from "zod";

const empleSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    typeEmpl: {
      type: String,
      required: true,
    },
    identify: {
      type: String,
      required: true,
      unique: true,
    },
    estado:{
      type:Boolean,
      default:true
    },
    celular:{
      type:String,
      required:true
    },
   
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Empleado", empleSchema);
