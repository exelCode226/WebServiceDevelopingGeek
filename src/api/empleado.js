import axios from "./axios";

export const getEmpleadosRequest = async () => axios.get("/empleados");

export const createEmpleadoRequest = async (empleado) => axios.post("/empleados", empleado);

export const updateEmpleadoRequest = async (id,empleado) =>
  axios.put(`/empleados/${id}`, empleado);

export const deleteEmpleadoRequest = async (id) => axios.delete(`/empleados/${id}`);

export const getEmpleadoRequest = async (id) => axios.get(`/empleados/${id}`);

export const cambiarEstadoEmpleadoRequest = async (id) => {
  try {
    const response = await axios.put(`/empleados/${id}/estado`);
    return response.data; // O cualquier otro dato útil que necesites de la respuesta
  } catch (error) {
    throw error; // Lanzar el error para manejarlo en el lugar donde llamas a esta función
  }
};