import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useClientes } from "../context/ClientesContext";
import toast, { Toaster } from 'react-hot-toast';
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";

dayjs.extend(utc);

export function ClientesFormPage() {
  const { createCliente, getCliente, updateCliente, errors: clienteErrors } = useClientes();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const loadcliente = async () => {
      if (params.id) {
        const cliente = await getCliente(params.id);
        setValue("nombreCompleto", cliente.nombreCompleto);
        setValue("documento", cliente.documento);
        setValue("celular", cliente.celular);
        setValue("direccion", cliente.direccion);
        setValue("completed", cliente.completed);

        // Habilitar el modo de edición
        setIsEditMode(true);
      }
    };
    loadcliente();
  }, [params.id]);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateCliente(params.id, {
          ...data,
          nombreCompleto: data.nombreCompleto
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" "),
          date: dayjs(data.date).utc().format(),
        });
      } else {
        createCliente({
          ...data,
          nombreCompleto: data.nombreCompleto
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" "),
          date: dayjs(data.date).utc().format(),
        });
      }

      setTimeout(() => {
        navigate("/clientes");
      }, 2800);

    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  return (
    <>
      <div className="cardCenter">
        <div className="content-wrapper">
          {clienteErrors.map((errors, i) => (
            <div className='bg-red-500 p-2 text-center text-white content-center' key={i}>
              {errors}
            </div>
          ))}

          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>

              <Label htmlFor="documento">Documento de identidad</Label>
              <Input
                type="number"
                pattern="[0-9]*"
                name="documento"
                placeholder="Documento"
                {...register("documento", { required: true, minLength: 7, maxLength: 12, })}
                autoFocus
                disabled={isEditMode} // Deshabilitar solo en modo de edición
              />
              {errors.documento && errors.documento.type === 'required' && (
                <p className="text-red-500">Se requiere el documento</p>

              )}
              {errors.documento && errors.documento.type === 'minLength' && (
                <p className="text-red-500">Mínimo de caracteres son 7</p>

              )}
              {errors.documento && errors.documento.type === 'maxLength' && (
                <p className="text-red-500">Máximo de caracteres son 12</p>

              )}


              <Label htmlFor="nombreCompleto">Nombre completo</Label>
              <Input
                type="text"
                min="4"
                max="30"
                name="nombreCompleto"
                placeholder="Nombre"
                {...register("nombreCompleto", { required: true })}
                autoFocus
              />
              {errors.nombreCompleto && (
                <p className="text-red-500 ">Se requiere el nombre completo.</p>
              )}



              <Label htmlFor="celular">Celular</Label>
              <Input
                type="number"
                min="1"
                max="10000000000"
                name="celular"
                placeholder="Celular"
                {...register("celular", { required: true, minLength: 6, maxLength: 10, })}
                autoFocus
              />
              {errors.celular && errors.celular.type === 'required' && (
                <p className="text-red-500">Se requiere el documento</p>

              )}
              {errors.celular && errors.celular.type === 'minLength' && (
                <p className="text-red-500">Mínimo de caracteres son 6</p>

              )}
              {errors.celular && errors.celular.type === 'maxLength' && (
                <p className="text-red-500">Máximo de caracteres son 10</p>

              )}

              <Label htmlFor="direccion">Dirección</Label>
              <Input
                type="text"
                min="5"
                maxLength={40}
                name="direccion"
                placeholder="Dirección"
                {...register("direccion", { required: true })}
                autoFocus
              />
              {errors.direccion && (
                <p className="text-red-500 ">Se requiere la dirección.</p>
              )}

              <div className="flex">
                <Button>Guardar</Button>
                <ButtonCancelar onClick={() => navigate("/clientes")}>Cancelar</ButtonCancelar>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}
