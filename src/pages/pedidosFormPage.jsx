import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label, Select } from "../components/ui";
import { usePedidos } from "../context/pedidosContext";
import { useClientes } from "../context/ClientesContext";
import { useProducts } from "../context/productsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm, useFieldArray } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";

dayjs.extend(utc);

export function PedidosFormPage() {
  const { createPedido, getPedido, updatePedido } = usePedidos();
  const { clientes, getClientes } = useClientes([]);
  const { products, getProducts } = useProducts();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      productos: [{ producto: "", cantidad: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productos",
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getClientes();
    getProducts();
  }, [getClientes, getProducts]);

  const getFutureDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 4);

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const addProducto = () => {
    append({ producto: "", cantidad: 0 });
  };

  const removeProducto = (indexToRemove) => {
    remove(indexToRemove);
  };

  const onSubmit = async (data) => {
    try {
      const pedidoData = {
        ...data,
        especificaciones: data.especificaciones
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(" "),
        date: dayjs(data.date).utc().format(),
        productos: data.productos.map((producto) => ({
          producto: producto.producto,
          cantidad: parseInt(producto.cantidad, 10), // Asegúrate de especificar la base (10) para parseInt
        })),
      };

      if (params.id) {
        updatePedido(params.id, pedidoData);
      } else {
        createPedido(pedidoData);
      }

      setTimeout(() => {
        navigate("/pedidos");
      }, 2800);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadPedido = async () => {
      if (params.id) {
        const pedido = await getPedido(params.id);

        setValue("cliente", pedido.cliente);
        setValue("productos", pedido.productos);
        setValue("fecha_aprox", pedido.fecha_aprox);
        setValue("especificaciones", pedido.especificaciones);
      }
    };
    loadPedido();
  }, [params.id, getPedido, setValue]);

  return (
    <>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cartapedidos">
            <card>
              <section className="seccion">
                <div className="formLeft m-2">
                  <div className="text-center separadorForms">
                    <Label htmlFor="cliente">Cliente</Label>
                    <Select
                      id="cliente"
                      name="cliente"
                      {...register("cliente", { required: true })}
                      autoFocus
                      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    >
                      <option disabled value="" selected>
                        Seleccionar un cliente
                      </option>
                      {clientes?.map((items, index) => (
                        <option key={index} value={items._id}>
                          {items.nombreCompleto}
                        </option>
                      ))}
                    </Select>
                    {errors.cliente && (
                      <p className="text-red-500">Seleccione el cliente</p>
                    )}
                  </div>

                  <div className="formRight">
                    <div className="text-center separadorForms">
                      <Label htmlFor="fecha_aprox">Fecha aproximada</Label>
                      <Input
                        type="date"
                        name="fecha_aprox"
                        {...register("fecha_aprox", { required: true })}
                        autoFocus
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        min={getFutureDate()}
                      />
                      {errors.fecha_aprox && (
                        <p className="text-red-500">Ingrese la Fecha</p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <Label htmlFor="especificaciones" className="">
                      Especificaciones
                    </Label>
                    <Textarea
                      name="especificaciones"
                      id="especificaciones"
                      rows="3"
                      {...register("especificaciones", { required: true })}
                      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.especificaciones && (
                      <p className="text-red-500">
                        Ingrese las especificaciones.
                      </p>
                    )}
                  </div>
                </div>

                <div className="formRight">
                  {fields.map((field, index) => (
                    <div
                      className="text-center separadorForms flex"
                      key={field.id}
                    >
                      <div className="selectPedidos flex-grow-1 mr-2">
                        <label
                          className="labelFormPedidos"
                          htmlFor={`producto`}
                        >
                          Producto
                        </label>
                        <Select
                          id={`producto_${index}`}
                          name={`productos[${index}].producto`}
                          {...register(`productos[${index}].producto`, {
                            required: true,
                          })}
                          autoFocus
                          className="product w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        >
                          <option disabled value="" selected>
                            Seleccionar un producto
                          </option>
                          {products?.map((availableProduct, innerIndex) => (
                            <option
                              key={innerIndex}
                              value={availableProduct._id}
                              disabled={fields
                                .filter(
                                  (p) =>
                                    p.producto !== undefined &&
                                    p.producto !== null
                                )
                                .some(
                                  (p) =>
                                    p.producto === availableProduct._id &&
                                    p.producto !== fields[index].producto
                                )}
                            >
                              {availableProduct.nombre}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-center">
                        <label
                          className="labelFormPedidos"
                          htmlFor={`cantidad`}
                        >
                          Cantidad
                        </label>
                        <Input
                          type="number"
                          id={`cantidad`}
                          name={`productos[${index}].cantidad`}
                          {...register(`productos[${index}].cantidad`, {
                            required: true,
                          })}
                          autoFocus
                          className="w-full px-4 py-2 rounded-md inputCantidad"
                          min="1"
                          max="50"
                        />
                      </div>

                      {/* Condición para mostrar o no el botón de eliminar */}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProducto(index)}
                          className="custom-button"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addProducto}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
                  >
                    Agregar
                  </button>
                </div>
              </section>
            </card>
          </div>
          <div className="botonesPedidos1 flex justify-center mt-4">
            <Button type="submit">Guardar</Button>
            <ButtonCancelar onClick={() => navigate("/pedidos")}>
              Cancelar
            </ButtonCancelar>
          </div>
        </form>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
