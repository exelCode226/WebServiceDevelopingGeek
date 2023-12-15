import axios from "./axios";

export const getPedidosRequest = async () => axios.get("/pedidos");

export const createPedidoRequest = async (pedido) => axios.post("/pedidos", pedido);

export const updatePedidoRequest = async (id, pedido) => axios.put(`/pedidos/${id}`, pedido);

export const deletePedidoRequest = async (id) => axios.delete(`/pedidos/${id}`);

export const getPedidoRequest = async (id) => axios.get(`/pedidos/${id}`);

