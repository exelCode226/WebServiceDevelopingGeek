import { clientesModel } from "../models/clientes.model.js";
import {pedidosModel} from "../models/pedidos.model.js"

export const getClientes = async (req, res) => {
    try {
        const clientes = await clientesModel.find();
        res.json(clientes)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getIdCliente = async (req, res, next) => {
    try {
        const cliente = await clientesModel.findById(req.params.id)
        if (!cliente) return res.status(500).json({ message: "Cliente no encontrado" })
        res.json(cliente)
    } catch (error) {
        return res.status(404).json({ message: "Cliente no encontrado" })
    }
};


export const createClient = async (req, res) => {
    const { nombreCompleto, documento, celular, direccion } = req.body;

    const userFound = await clientesModel.findOne({ documento })
    if (userFound)
      return res.status(400).json(['Este documento ya existe.'])

    try {
        const newClient = new clientesModel({
            nombreCompleto,
            documento,
            celular,
            direccion
        });

        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
        console.log("El cliente se creo correctamente")
    } catch (error) {
        console.log("El error es:\n" + error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};



export const updateClient = async (req, res) => {
    try {
        const { nombreCompleto, documento, celular, direccion } = req.body;
        const updatedClient = await clientesModel.findByIdAndUpdate(
            {_id: req.params.id},
            {nombreCompleto, documento, celular, direccion },
            { new: true },
            
        );
        return res.json(updatedClient)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export async function deleteClient(req, res) {
    try {
      // Verificar si hay pedidos asociados al cliente
      const associatedOrders = await pedidosModel.find({ cliente: req.params.id });
  
      if (associatedOrders.length > 0) {
        console.log("No se puede eliminar porque está asociado a pedidos.");
        return res.status(400).json(['Este cliente está vinculado a un pedido.']);
      }
  
      // Si no hay pedidos asociados, eliminar el cliente
      const deletedCliente = await clientesModel.findByIdAndDelete(req.params.id);
  
      if (!deletedCliente)
        return res.status(404).json({ message: "Cliente no encontrado" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }



