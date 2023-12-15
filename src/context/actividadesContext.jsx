import { createContext, useContext, useState, useEffect } from "react";
import {
  createActividadRequest,
  deleteActividadRequest,
  getActividadesRequest,
  getActividadRequest,
  updateActividadRequest,

} from "../api/actividades";
import toast, { Toaster } from 'react-hot-toast';
import { set } from "mongoose";

const actividadesContext = createContext();

export const useActividades = () => {
  const context = useContext(actividadesContext);
  if (!context) throw new Error("use pedidos must be used within a PedidosProvider ");
  return context;
};

export function ActividadProvider({ children }) {
  const [actividades, setActividades] = useState([]);
  const [errors, setErrors] = useState([])

  const getActividades = async () => {
    const res = await getActividadesRequest();
    setActividades(res.data);
  };

  const deleteActividad = async (id) => {
    try {
      const res = await deleteActividadRequest(id);
      if (res.status === 204) setActividades(actividades.filter((actividad) => actividad._id !== id));
      toast.success("Actividad eliminada exitosamente");
    } catch (error) {
      console.log(error);
      console.log(error.response); // Agrega esta línea para imprimir la respuesta completa del servidor
      setErrors(error.response)
      toast.error('Esta actividad está vinculada');
    }
  };
  
  const createActividad = async (actividad) => {
    try {
      const res = await createActividadRequest(actividad);
      console.log(res.data);
      toast.success('Actividad creada exitosamente');
    } catch (error) {
      console.log(error);
      setErrors(error.response.data)
      toast.error('No puedes eliminar');
    }
  };

  const getActividad = async (id) => {
    try {
      const res = await getActividadRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateActividad = async (id, actividad) => {
    try {
      await updateActividadRequest(id, actividad);
      toast.success("Actividad actualizada exitosamente");
    } catch (error) {
      console.error(error);
      setErrors
      toast.error('No puedes actualizar');
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
    <actividadesContext.Provider
      value={{
        actividades,
        getActividades,
        deleteActividad,
        createActividad,
        getActividad,
        updateActividad,
      }}
    >
      {children}
    </actividadesContext.Provider>
  );
}