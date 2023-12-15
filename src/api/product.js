import axios from "./axios";

export const getProductsRequest = async () => axios.get("/products");

export const createProductsRequest = async (products) => axios.post("/products", products);

export const updateProductsRequest = async (id,products) =>
  axios.put(`/products/${id}`, products);

export const deleteProductsRequest = async (id) => axios.delete(`/products/${id}`);

export const getProductRequest = async (id) => axios.get(`/products/${id}`);
