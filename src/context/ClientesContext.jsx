import { createContext, useContext, useState, useEffect } from "react";
import {
  createClienteRequest,
  deleteClienteRequest,
  getClientesRequest, // Cambia el nombre aquí a getClientesRequest
  getClienteRequest,
  updateClienteRequest,
} from "../api/clientes";
import toast, { Toaster } from 'react-hot-toast';

export const ClientesContext = createContext();

export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) throw new Error("no hay nada aun");
  return context;
};

export function ClientesProvider({ children }) {
  const [clientes, setClientes] = useState([]);
  const [errors, setErrors] = useState([])


  const getClientes = async () => {
    const res = await getClientesRequest();
    setClientes(res.data);
  };
  
  const deleteCliente = async (id) => {
    try {
      const res = await deleteClienteRequest(id);
      if (res.status === 204) setClientes(clientes.filter((cliente) => cliente._id !== id));
      toast.success("Cliente eliminado exitosamente");
    } catch (error) {
      setErrors(error.response.data)
      toast.error('Este cliente está vinculado a un pedido');
    }
  };
  // const createCliente = async (cliente) => {
  //   try {
  //     const res = await createClienteRequest(cliente);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const createCliente = async (cliente) => {
    try {
      const res = await createClienteRequest(cliente);
      console.log(res.data);
      toast.success("Cliente creado exitosamente");
      // Después de crear el cliente, actualiza la lista de clientes
      await getClientes(); // Llama a la función para obtener la lista actualizada
    } catch (error) {
      console.log(error);
      setErrors(error.response.data)
    }
  };
  
  const getCliente = async (id) => {
    try {
      const res = await getClienteRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response.data)
    }
  };

  const updateCliente = async (id, cliente) => {
    try {
      await updateClienteRequest(id, cliente);
      toast.success("Cliente actualizado exitosamente");
    } catch (error) {
      console.error(error);
      setErrors(error.response.data)
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [errors])


  return (
    <ClientesContext.Provider
      value={{
        clientes,
        getClientes,
        deleteCliente,
        createCliente,
        getCliente,
        updateCliente,
        errors,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
}