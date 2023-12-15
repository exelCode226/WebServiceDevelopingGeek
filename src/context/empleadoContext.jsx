import { createContext, useContext, useState, useEffect } from "react";
import { createEmpleadoRequest, deleteEmpleadoRequest, getEmpleadosRequest, getEmpleadoRequest, updateEmpleadoRequest,cambiarEstadoEmpleadoRequest } from "../api/empleado";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";



const EmpleadoContext = createContext();

export const useEmpleados = () => {
  const context = useContext(EmpleadoContext);
  if (!context) throw new Error("useEmpleados debe ser utilizado dentro de un EmpleadoProvider");
  return context;
};

export function EmpleadoProvider({ children }) {
  const [empleados, setEmpleados] = useState([]);
  const [errors, setErrors] = useState([])

  



  const getEmpleados = async () => {
    try {

      const res = await getEmpleadosRequest();


      // Agrega este log
      setEmpleados(res.data);

    } catch (error) {
      setErrors(error.response.data)
    }
  };

  const deleteEmpleado = async (id) => {
    try {
      const res = await deleteEmpleadoRequest(id);
      if (res.status === 204) setEmpleados(empleados.filter((empleado) => empleado._id !== id));
      toast.success("Empleado eliminado exitosamente");

    } catch (error) {
      setErrors([error.response.data.message])
      toast.error('Este empleado está programado');
    }
  };

  const createEmpleado = async (empleado) => {

    try {
      const res = await createEmpleadoRequest(empleado);
      console.log(res.data);
      toast.success('Empleado creado exitosamente');
    } catch (error) {
      setErrors(error.response.data)
    }
  };

  const getEmpleado = async (id) => {
    try {
      const res = await getEmpleadoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmpleado = async (id, updatedEmpleado) => {
    try {
      await updateEmpleadoRequest(id, updatedEmpleado);
      toast.success('Empleado actualizado exitosamente');
    } catch (error) {
      setErrors(error.response.data)
    }
  };

  const cambiarEstadoEmpleado = async (empleadoId) => {
    try {
      await cambiarEstadoEmpleadoRequest(empleadoId);
      //toast.success('Empleado actualizado exitosamente');
    } catch (error) {
      setErrors(error.response.data);
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
    <EmpleadoContext.Provider
      value={{
        empleados,
        getEmpleados,
        deleteEmpleado,
        createEmpleado,
        getEmpleado,
        updateEmpleado,
        cambiarEstadoEmpleado,
        errors,
      }}
    >
      {children}
    </EmpleadoContext.Provider>
  );
}
