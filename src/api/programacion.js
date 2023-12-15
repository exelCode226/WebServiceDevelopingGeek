import axios from "./axios";


export const getProgramacionesRequest = async () => axios.get("/programaciones");
export const createProgramacionRequest = async (programacion) => axios.post("/programaciones", programacion);
export const updateProgramacionRequest = async (id, programacion) => axios.put(`/programaciones/${id}`, programacion);
export const deleteProgramacionRequest = async (id) => axios.delete(`/programaciones/${id}`);
export const getProgramacionIdRequest = async (id) => axios.get(`/programaciones/${id}`);

const BASE_URL = 'tu_url_api'; // Reemplaza 'tu_url_api' con la URL de tu servidor
