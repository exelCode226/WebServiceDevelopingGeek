import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://exel:1108@cluster0.s3oycxh.mongodb.net/DGlogin")
        console.log("La base de datos está conectada")
    } catch (error) {
        console.log(error);
    }
};