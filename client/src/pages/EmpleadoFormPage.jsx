import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label, Select } from "../components/ui";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";
import { useEmpleados } from "../context/empleadoContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';




dayjs.extend(utc);

export function EmpleadoFormPage() {


  const { createEmpleado, getEmpleado, updateEmpleado, errors: empleadoErrors } = useEmpleados();

  const navigate = useNavigate();

  const params = useParams();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateEmpleado(params.id, {
          ...data,
          username: data.username
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" "),
          date: dayjs.utc(data.date).format(),
        });

        setTimeout(() => {
          navigate("/empleados");
        }, 2800)

      } else {
        await createEmpleado({
          ...data,
          username: data.username
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" "),
          date: dayjs.utc(data.date).format(),

        });

        setTimeout(() => {
          navigate("/empleados");
        }, 2800)


      }



    } catch (error) {

      console.log(error);
      toast.error('Error al crear/actualizar empleado');
    }
  });


  useEffect(() => {
    const loadEmpleado = async () => {
      if (params.id) {
        const empleado = await getEmpleado(params.id);
        setValue("username", empleado.username);
        setValue("identify", empleado.identify);
        setValue("typeEmpl", empleado.typeEmpl);
        setValue("celular", empleado.celular);
        setValue(
          "date",
          empleado.date ? dayjs(empleado.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", empleado.completed)
      }
    };
    loadEmpleado();
  }, []);

  return (
    <>




      <div className="cardCenter">




        <div className="content-wrapper">





          <Card className="cardBro">

            <form onSubmit={onSubmit}>

              {empleadoErrors.map((errors, i) => (
                 <div className='bg-red-500 p-2 text-center text-white content-center' key={i}>
                 {errors}
               </div>
              ))}

              <Label htmlFor="identify">Documento</Label>
              <Input
                type="number"
                name="identify"
                placeholder="Documento"
                disabled={params.id ? true : false}
                onChange={() => {
                  trigger('identify');
                }}
                {...register('identify', { required: true, minLength: 8, maxLength: 12 })}
              />


              {errors.identify && errors.identify.type === 'required' && (
                <p className="text-red-500">Se requiere el documento</p>
              )}
              {errors.identify && errors.identify.type === 'minLength' && (
                <p className="text-red-500">Mínimo de caracteres son 8</p>
              )}
              {errors.identify && errors.identify.type === 'maxLength' && (
                <p className="text-red-500">El máximo de caracteres permitidos es 12</p>
              )}


              <Label htmlFor="username">Nombre completo</Label>
              <Input
                type="text"
                name="username"
                placeholder="Nombre Completo"
                {...register('username',
                  {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                    pattern: /^[A-Za-z ]+$/i,

                  })} // Validación de longitud mínima
              />
              {errors.username && errors.username.type === 'required' && (
                <p className="text-red-500">Se requiere nombre completo</p>
              )}
              {errors.username && errors.username.type === 'minLength' && (
                <p className="text-red-500">El nombre debe tener al menos 5 caracteres</p>
              )}
              {errors.username && errors.username.type === 'maxLength' && (
                <p className="text-red-500">El nombre debe tener maximo 20 caracteres</p>
              )}
              {errors.username && errors.username.type === 'pattern' && (
                <p className="text-red-500">Este campo solo admite letras</p>
              )}

              <Label htmlFor="celular">Celular</Label>
              <Input
                type="number"
                name="celular"
                placeholder="Celular"

                {...register('celular', { required: true, minLength: 6, maxLength: 12, })} />
              {errors.celular && errors.celular.type === 'required' && (
                <p className="text-red-500">Se requiere el Celular</p>

              )}
              {errors.celular && errors.celular.type === 'minLength' && (
                <p className="text-red-500">Mínimo de caracteres son 6</p>

              )}
              {errors.celular && errors.celular.type === 'maxLength' && (
                <p className="text-red-500">Máximo de caracteres son 12</p>

              )}





              <Label htmlFor="typeEmpl">Tipo de empleado</Label>
              <Select className="inputCompenent" title="Seleccionador tipo" name="typeEmpl" {...register('typeEmpl', { required: true })}>
                <option value="Varios">Varios</option>
                <option value="Tapicero">Tapicero</option>
                <option value="Esqueletero">Esqueletero</option>
              </Select>
              {errors.typeEmpl && (
                <p className="text-red-500"></p>
              )}

              {/* <Label htmlFor="date">Fecha</Label>
            <Input type="date" name="date" {...register("date")} /> */}
              <div className="flex">
                <Button>Guardar</Button>
                <ButtonCancelar onClick={() => navigate("/empleados")}>Cancelar</ButtonCancelar>
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

export default EmpleadoFormPage;