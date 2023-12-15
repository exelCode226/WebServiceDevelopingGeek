import axios from "./axios";

export const getClientesRequest = async () => axios.get("/clientes");

export const createClienteRequest = async (cliente) => axios.post("/clientes", cliente);

export const updateClienteRequest = async (id, cliente) => axios.put(`/clientes/${id}`, cliente);

export const deleteClienteRequest = async (id) => axios.delete(`/clientes/${id}`);

export const getClienteRequest = async (id) => axios.get(`/clientes/${id}`);