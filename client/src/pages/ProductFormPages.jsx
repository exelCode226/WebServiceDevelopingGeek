import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Card, Input, Label, Button, Select } from "../components/ui";
import { useProducts } from "../context/productsContext";
import { useActividades } from "../context/actividadesContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";
import { Textarea } from "../components/ui/Textarea";

dayjs.extend(utc);

export function ProductFormPages() {
  const { createProduct, getProduct, updateProduct } = useProducts();
  const { actividades, getActividades } = useActividades([]);
  const [selectedActividades, setSelectedActividades] = useState([""]);
  const [precio, setPrecio] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  const addActividad = () => {
    setSelectedActividades([...selectedActividades, ""]);
  };

  const removeActividad = (index) => {
    if (selectedActividades.length > 1) {
      const updatedActividades = [...selectedActividades];
      updatedActividades.splice(index, 1);
      setSelectedActividades(updatedActividades);
      setValue("actividades", updatedActividades);
    } else {
      toast.error("No se puede eliminar la última actividad");
    }
  };

  const handlePrecioChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const formattedValue = Number(numericValue).toLocaleString("es-ES");
    setPrecio(formattedValue);
  };

  const validatePrecio = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) {
      return "El precio es requerido";
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (selectedActividades.some((actividad) => !actividad)) {
      toast.error("Por favor, seleccione una actividad");
      return;
    }

    try {
      const formattedData = {
        ...data,
        nombre: data.nombre
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(" "),
        descripcion: data.descripcion
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(" "),
        date: dayjs.utc(data.date).format(),
        actividades: selectedActividades,
        precio: Number(precio.replace(/[^0-9]/g, "")),
      };

      if (params.id) {
        updateProduct(params.id, formattedData);
      } else {
        createProduct(formattedData);
      }

      setTimeout(() => {
        navigate("/products");
      }, 2800);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setSelectedActividades(product.actividades || []);
        setValue("nombre", product.nombre);
        setValue("descripcion", product.descripcion);
        setValue("precio", product.precio);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    loadProducts();
    getActividades();
  }, [params.id, getProduct]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="">
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cartapedidos">
            <section className="seccion">
              {/* Card for product details */}
              <card>
                <div className="pass">
                  <div className="formLeft m-2">
                    <div className="text-center separadorForms">
                      <Label htmlFor="nombre">Nombre del producto</Label>
                      <Input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre"
                        {...register("nombre", {
                          required: "Este campo es requerido",
                        })}
                        autoFocus
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                      />
                      {errors.nombre && (
                        <p className="text-red-500">{errors.nombre.message}</p>
                      )}
                    </div>

                    <div className="text-center separadorForms">
                      <Label htmlFor="descripcion">
                        Descripción del producto
                      </Label>
                      <Input
                        type="text"
                        name="descripcion"
                        id="descripcion"
                        placeholder="Descripción"
                        {...register("descripcion", {
                          required: "La descripción es requerida",
                        })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                      />
                      {errors.descripcion && (
                        <p className="text-red-500">
                          {errors.descripcion.message}
                        </p>
                      )}
                    </div>

                    <div className="text-center separadorForms">
                      <Label htmlFor="precio">Precio del producto</Label>
                      <Input
                        type="text"
                        name="precio"
                        id="precio"
                        placeholder="Precio"
                        value={precio}
                        onChange={handlePrecioChange}
                        onBlur={(e) => setValue("precio", e.target.value)}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                      />
                      {errors.precio && (
                        <p className="text-red-500">{errors.precio.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </card>

              {/* Card for activities */}
              <card  >
                <div className=" p-4">
                  <label className="block text-center">Actividad</label>

                  {selectedActividades.map((actividad, index) => {
                    const opcionesDisponibles = actividades.filter(
                      (item) =>
                        !selectedActividades.includes(item._id) ||
                        item._id === actividad
                    );

                    return (
                      <div
                        className="d-flex align-items-baseline separadorForms mb-3"
                        key={index}
                      >
                        {/* Actividad Select */}
                        <div className="flex-grow-1">
  <Select
    id={`actividad${index}`}
    name={`actividades[${index}]`}
    {...register(`actividades[${index}]`, {
      required: true,
    })}
    value={actividad}
    onChange={(e) => {
      const updatedActividades = [...selectedActividades];
      updatedActividades[index] = e.target.value;
      setSelectedActividades(updatedActividades);
    }}
    autoFocus={index === 0}
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
  >
    <option disabled value="" className="tamaño">
      Seleccione una actividad
    </option>
    {opcionesDisponibles.map((item) => (
      <option key={item._id} value={item._id} disabled={item.disabled}>
        {item.nombre}
      </option>
    ))}
  </Select>
  {/* {errors.actividades && index === selectedActividades.length - 1 && (
    <div className="justify-center text-center">
      <p className="text-red-500">
        {errors.actividades.type === 'required'
          ? 'Se requiere una actividad'
          : 'Seleccione una actividad'}
      </p>
    </div>
  )} */}
</div>




                        {/* Button for removing the specific activity */}
                        {selectedActividades.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeActividad(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Button for adding activities */}
                  <button
                    type="button"
                    onClick={() => {
                      // Reiniciar el estado de las actividades seleccionadas al agregar una nueva actividad
                      setSelectedActividades([""]);
                      addActividad();
                    }}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
                  >
                    Agregar actividad
                  </button>
                </div>
              </card>
            </section>

          </div>

          {/* Save and cancel buttons */}
          <div className="botonesPedidos1 flex-container">
            <Button type="submit">Guardar</Button>
            <ButtonCancelar onClick={() => navigate("/products")}>
              Cancelar
            </ButtonCancelar>
          </div>
        </form>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default ProductFormPages;
