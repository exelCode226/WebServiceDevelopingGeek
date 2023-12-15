import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

export const updateTaskRequest = async (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);


export const getEmpleadosRequest = async () => axios.get("/empleados");

export const createEmpleadoRequest = async (empleado) => axios.post("/empleados", empleado);

export const updateEmpleadoRequest = async (id,empleado) =>
  axios.put(`/empleados/${id}`, empleado);

export const deleteEmpleadoRequest = async (id) => axios.delete(`/empleados/${id}`);

export const getEmpleadoRequest = async (id) => axios.get(`/empleados/${id}`);
