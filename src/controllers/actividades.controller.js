import { actividadesModel } from '../models/actividades.model.js'
import {ProductModel} from '../models/products.model.js'
export const getActividades = async (req, res) => {
  try {
    const actividades = await actividadesModel.find()
    res.json(actividades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getActividad = async (req, res) => {
  try {
    const actividades = await actividadesModel.findById(req.params.id)
    if (!actividades) return res.status(404).json({ message: "Actividad no encontrada" });
    return res.json(actividades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createActividad = async (req, res) => {
  try {
    const { nombre,descripcionA } = req.body;
    const newActividad = new actividadesModel({
      nombre,
      descripcionA
    });
    await newActividad.save();
    res.json(newActividad);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteActividad = async (req, res) => {
  try {
    console.log('Actividad a eliminar:', req.params.id);

    // Buscar productos que tengan una referencia directa al _id de la actividad
    const asociados = await ProductModel.find({ 'actividades.actividad': req.params.id });
    console.log('Productos asociados:', asociados);

    if (asociados.length > 0) {
      console.log('No puedes eliminar esta actividad, está vinculada a un producto.');
      return res.status(400).json({ message: 'No puedes eliminar esta actividad, está vinculada a un producto.' });
    }

    const deleteActividad = await actividadesModel.findByIdAndDelete(req.params.id);
    if (!deleteActividad)
      return res.status(404).json({ message: "Actividad no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    console.error('Error en el controlador:', error);
    return res.status(500).json({ message: error.message });
  }
};


export const updateActividad = async (req, res) => {
  try {
    const { nombre,descripcionA } = req.body;
    const actividadUpdated = await actividadesModel.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, descripcionA},
      { new: true }
    );
    return res.json(actividadUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};





