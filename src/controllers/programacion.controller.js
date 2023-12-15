import { programacionModel } from "../models/programacion.model.js";
import { ObjectId } from "mongodb";
import { pedidosModel} from "../models/pedidos.model.js"

export async function getProgramacion(req, res) {
  try {
    const programacion = await programacionModel
      .find()
      .populate('empleado.empleado', 'username')
      .populate({
        path: 'pedido',
        populate: {
          path: 'cliente',
          select: 'nombreCompleto',
        },
      });

    console.log(programacion);

    res.json(programacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const getIdProgramacion = async (req, res) => {
  try {
    const programacion = await programacionModel.findById(req.params.id);
    if (!programacion)
      return res.status(404).json({ message: "Programación no encontrada" });
    return res.json(programacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export async function createProgramacion(req, res) {
  try {
    const { empleado, pedido } = req.body;

    const pedidoData = await pedidosModel.findById(pedido);
    const actividadesPorProducto = pedidoData.productos.map(producto => ({
      actividadesPorProducto: producto.actividades,
    }));

    const nuevoProgramacion = new programacionModel({
      empleado: empleado.map(e => ({
        empleado: e.empleado,
      })),
      actividades: actividadesPorProducto.map(actividad => ({
        actividadesPorProducto: actividad.actividadesPorProducto,
        estadoActividades: 'En proceso',
      })),
      pedido,
      estado: 'En proceso',
    });

    const respuesta = await nuevoProgramacion.save();

    await actualizarEstadoEmpleados(respuesta, actividadesPorProducto);

    console.log(respuesta + ' Se creó correctamente');
    res.status(201).json(respuesta);
  } catch (error) {
    console.log('El error es: \n' + error);
    res.status(500).json({ message: error.message });
  }
}

export const updateProgramacion = async (req, res) => {
  try {
    const { empleado, pedido, actividades, estado } = req.body;

    const todasTerminadas = actividades.every(
      (actividad) => actividad.estadoActividades === 'Terminado'
    );

    const nuevoEstado = todasTerminadas ? 'Terminado' : 'En proceso';

    const updatedProgramacion = await programacionModel.findOneAndUpdate(
      { _id: req.params.id },
      { empleado, pedido, actividades, estado: nuevoEstado },
      { new: true }
    );

    await actualizarEstadoEmpleados(updatedProgramacion, actividades);

    return res.json(updatedProgramacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function actualizarEstadoEmpleados(programacion, actividadesPorProducto) {
  const empleados = programacion.empleado;
  const actividades = actividadesPorProducto;

  for (let i = 0; i < actividades.length; i++) {
    const estadoActividadActualizado = actividades[i].estadoActividades;
    empleados[i].estadoEmpleado = estadoActividadActualizado;
  }

  await programacion.save();

}




export const deleteProgramacion = async (req, res) => {
  try {
    
    const deletedProgramacion = await programacionModel.findByIdAndDelete(req.params.id);
    if (!deletedProgramacion)
      return res.status(404).json({ message: "Programacion no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
