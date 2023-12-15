import { ProductModel } from '../models/products.model.js'
import {pedidosModel} from "../models/pedidos.model.js"
import { actividadesModel } from '../models/actividades.model.js';


export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("actividades", "nombre");
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export const createProducts = async (req, res) => {
  try {
    const { nombre, descripcion, precio, actividades } = req.body;
    
    // Mapea las actividades para buscar cada actividad por ObjectId
    const actividadObjects = await Promise.all(actividades.map(async (actividadId) => {
      const actividad = await actividadesModel.findById(actividadId);
      if (!actividad) {
        return null;
      }
      return {
        nombre: actividad.nombre,
        actividad: actividad._id
      };
    }));

    // Filtra las actividades que se encontraron con éxito
    const validActividades = actividadObjects.filter((obj) => obj !== null);

    // Crea un nuevo producto con la información de las actividades
    const newProduct = new ProductModel({
      nombre,
      descripcion,
      precio,
      actividades: validActividades
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






export const deleteProduct = async (req, res) => {
  try {
    const asociados = await pedidosModel.find({ "productos.producto": req.params.id });

    if (asociados.length > 0) {
      return res.status(400).json({ message: 'No puedes eliminar un producto vinculado.' });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, actividades } = req.body;

    // Mapea las actividades para buscar cada actividad por ObjectId
    const actividadObjects = await Promise.all(actividades.map(async (actividadId) => {
      const actividad = await actividadesModel.findById(actividadId);
      if (!actividad) {
        return null;
      }
      return {
        nombre: actividad.nombre,
        actividad: actividad._id
      };
    }));

    // Filtra las actividades que se encontraron con éxito
    const validActividades = actividadObjects.filter((obj) => obj !== null);

    // Actualiza el producto con la información de las actividades
    const productUpdated = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, descripcion, precio, actividades: validActividades },
      { new: true }
    );

    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};







