import { pedidosModel } from "../models/pedidos.model.js";
import { ObjectId } from "mongodb";
import {ProductModel} from "../models/products.model.js"
import { programacionModel } from "../models/programacion.model.js";

export async function getPedidos(req, res, next) {
  try {
    const pedidos = await pedidosModel
      .find()
      .populate("cliente", "nombreCompleto")
      .populate("productos.producto", "nombre")
      .populate("user");

    res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const getIdPedido = async (req, res, next) => {
  try {
    const pedido = await pedidosModel.findById(req.params.id);
    if (!pedido)
      return res.status(404).json({ message: "pedido no encontrado" });
    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export async function createPedido(req, res) {
  const { cliente, productos, fecha_aprox, especificaciones, fechaC = new Date().toLocaleString() } = req.body;

  try {
    const productosConNombresActividadesYPrecio = await Promise.all(
      productos.map(async (productoItem) => {
        const producto = await ProductModel.findById(productoItem.producto);
        if (!producto) {
          throw new Error("Producto no encontrado");
        }

        const actividadesNombres = producto.actividades.map((actividad) => actividad.nombre);

        return {
          producto: producto._id,
          cantidad: productoItem.cantidad,
          nombre: producto.nombre,
          actividades: actividadesNombres,
          precio: producto.precio // Agregamos el precio del producto
        };
      })
    );

    const precioTotal = productosConNombresActividadesYPrecio.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);

    const nuevoPedido = new pedidosModel({
      cliente,
      productos: productosConNombresActividadesYPrecio,
      precioTotal,
      fecha_aprox,
      fechaC,
      especificaciones,
      user: req.user.id
    });

    const response = await nuevoPedido.save();
    console.log(response + " Se creó correctamente");
    res.status(201).json(response);
  } catch (error) {
    console.error("El error es: \n", error);
    res.status(500).json({ message: error.message });
  }
}





export const updatePedido = async (req, res) => {
  try {
    const {cliente, productos, fecha_aprox, cantidad, estado, especificaciones, fechaC  = new Date().toLocaleString()  } = req.body;

    const updatedPedido = await pedidosModel.findOneAndUpdate(
      { _id: req.params.id },
      { cliente, productos, fecha_aprox, cantidad, especificaciones, fechaC, estado},
      { new: true } // req.body trae los nuevos datos
    );
    return res.json(updatedPedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deletePedido = async (req, res) => {
  try {
    const asociados = await programacionModel.find({ pedido: req.params.id });

    if (asociados.length > 0) {
      return res.status(400).json({ message: 'No puedes eliminar un pedido vinculado.' });
    }
    const deletedPedido = await pedidosModel.findByIdAndDelete(req.params.id);
    if (!deletedPedido)
      return res.status(404).json({ message: "pedido no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};