import empleSchema from "../models/empleados.model.js";
import { programacionModel } from "../models/programacion.model.js";

// Obtener todos los empleados del usuario actual
export const getEmpleados = async (req, res) => {
  try {
    const empleados = await empleSchema.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
  const { username, typeEmpl, identify,celular} = req.body;

  try {

    const empleFound = await empleSchema.findOne({ identify });
    if (empleFound){
      return res.status(400).json(['Este documento ya existe.']);

    }

    const newEmpleado = new empleSchema({
      username,
      typeEmpl,
      identify,
      celular
    });

    await newEmpleado.save();
    res.json(newEmpleado);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar un empleado por su ID
export const deleteEmpleado = async (req, res) => {
  try {
    const associatedOrders = await programacionModel.find({ "empleado.empleado": req.params.id });
  
      if (associatedOrders.length > 0) {
        console.log("No se puede eliminar porque está asociado a programación.");
        return res.status(400).json(['Este empleado está vinculado a un pedido.']);
      }

    const deletedEmpleado = await empleSchema.findByIdAndDelete(req.params.id);
    if (!deletedEmpleado)
      return res.status(404).json({ message: "Empleado no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar un empleado por su ID
export const updateEmpleado = async (req, res) => {
  try {
    const { username, typeEmpl, identify, celular } = req.body;
    const empleadoUpdated = await empleSchema.findOneAndUpdate(
      { _id: req.params.id, },
      { username, typeEmpl, identify, celular },
      { new: true }
    );
    return res.json(empleadoUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener un empleado por su ID
export const getEmpleado = async (req, res) => {
  try {
    const empleado = await empleSchema.findById(req.params.id);
    if (!empleado) return res.status(404).json({ message: "Empleado no encontrado" });
    return res.json(empleado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para cambiar el estado de un empleado
export const cambiarEstadoEmpleado = async (req, res) => {
  const { empleadoId } = req.params; // Suponiendo que tienes el ID del empleado en los parámetros de la solicitud

  try {
    // Buscar al empleado por su ID
    const empleado = await empleSchema.findById(empleadoId); // Utilizar empleadoId en lugar de req.params.id

    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    // Cambiar el estado del empleado
    empleado.estado = !empleado.estado; // Cambia el estado a su opuesto

    // Guardar el empleado actualizado en la base de datos
    await empleado.save();

    return res.status(200).json({ message: 'Estado del empleado actualizado', empleado });
  } catch (error) {
    return res.status(500).json({ message: 'Error al cambiar el estado del empleado', error: error.message });
  }
};