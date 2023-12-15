import { createContext, useContext, useState, useEffect } from "react";
import {
  createPedidoRequest,
  deletePedidoRequest,
  getPedidosRequest,
  getPedidoRequest,
  updatePedidoRequest,

} from "../api/pedidos";
import { ClientesProvider } from "./ClientesContext";
import { ProductProvider } from "./productsContext";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'

const PedidoContext = createContext();

export const usePedidos = () => {
  const context = useContext(PedidoContext);
  if (!context) throw new Error("use pedidos must be used within a PedidosProvider ");
  return context;
};

export function PedidoProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
  const [errors, setErrors] = useState([])


  const getPedidos = async () => {
    const res = await getPedidosRequest();
    setPedidos(res.data);
    console.log(pedidos);
  };

  const deletePedido = async (id) => {
    try {
      const res = await deletePedidoRequest(id);
      if (res.status === 204) setPedidos(pedidos.filter((pedido) => pedido._id !== id));
      toast.success("Pedido eliminado exitosamente");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("No tienes permisos para eliminar un pedido");
      } else {
        setErrors(error.response ? error.response.data : "Error desconocido");
        toast.error("Este pedido está programado.");
      }
    }
  };

  const createPedido = async (pedido) => {
    try {
      const res = await createPedidoRequest(pedido);
      console.log(res.data);
      toast.success('Pedido creado exitosamente.');
    } catch (error) {
      console.log(error);
      setErrors(error.response.data)
    }
  };

  const getPedido = async (id) => {
    try {
      const res = await getPedidoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response.data)
    }
  };

  const updatePedido = async (id, pedido) => {
    try {
      await updatePedidoRequest(id, pedido);
      toast.success('Pedido actualizado exitosamente.');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("No tienes permisos para editar un pedido");
      } else {
        setErrors(error.response ? error.response.data : "Error desconocido");
        toast.error("No se puede editar");
      }
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
    <ClientesProvider>
      <ProductProvider>
    <PedidoContext.Provider
        value={{
          pedidos,
          getPedidos,
          deletePedido,
          createPedido,
          getPedido,
          updatePedido,
        }}
      >
        {children}
      </PedidoContext.Provider>
    </ProductProvider>
    </ClientesProvider>
  );
}