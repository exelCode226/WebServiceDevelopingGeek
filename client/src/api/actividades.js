import axios from "./axios";

export const getActividadesRequest = async () => axios.get("/actividades");

export const createActividadRequest = async (actividad) => axios.post("/actividades", actividad);

export const updateActividadRequest = async (id, actividad) => axios.put(`/actividades/${id}`, actividad);

export const deleteActividadRequest = async (id) => axios.delete(`/actividades/${id}`);

export const getActividadRequest = async (id) => axios.get(`/actividades/${id}`);
