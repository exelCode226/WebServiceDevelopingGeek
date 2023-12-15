import React, { createContext, useContext, useState } from "react";
import {
  createProductsRequest,
  deleteProductsRequest,
  getProductsRequest,
  getProductRequest,
  updateProductsRequest,
} from "../api/product";
import toast, { Toaster } from 'react-hot-toast';
import { ActividadProvider } from "./actividadesContext";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [errors, setErrors] = useState([])

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductsRequest(id);
      if (res.status === 204) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));  
        toast.success("Producto eliminado exitosamente");
      }
    } catch (error) {
      console.error(error);
      setErrors(error.response.data)
      toast.error('No puedes eliminar un producto vinculado');
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductsRequest(product);
      console.log(res.data);
      toast.success('Producto creado exitosamente');
    } catch (error) {
      console.error(error);
      setErrors(error.response.data)
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      await updateProductsRequest(id, product);
      toast.success('Producto actualizado exitosamente');
    } catch (error) {
      console.error(error);
      setErrors(error.response.data)
      toast.error('No puedes actualizar');
    }
  };

  return (
    <ActividadProvider>
    <ProductContext.Provider
      value={{
        products,
        loading, // Expose the loading state
        getProducts,
        deleteProduct,
        createProduct,
        getProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
    </ActividadProvider>
  );
}
