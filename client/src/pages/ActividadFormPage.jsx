import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Card, Input, Label, Button, Select } from "../components/ui";
import { useActividades } from "../context/actividadesContext";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { useProducts } from "../context/productsContext";
import toast, { Toaster } from 'react-hot-toast';
import { ButtonCancelar } from "../components/ui/ButtonCancelar";
import { Textarea } from "../components/ui/Textarea";

dayjs.extend(utc);

export function ActividadFormPages() {
  const { createActividad, getActividad, updateActividad } = useActividades();

  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const { products, getProducts } = useProducts([]);
  useEffect(() => {
    getProducts();
  }, []);
  const onSubmit = async (data) => {
    try {
      const formattedDate = dayjs.utc(data.date).format();
      const actividadData = {
        ...data,
        date: formattedDate,
        nombre: data.nombre
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(""),
        descripcionA: data.descripcionA
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(""),
      };
  
      if (params.id) {
        await updateActividad(params.id, actividadData);
        setShowSuccessAlert2(true);
      } else {
        await createActividad(actividadData);
        setShowSuccessAlert(true);
      }
  
      setTimeout(() => {
        navigate("/actividades");
      }, 2800);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadActividades = async () => {
      if (params.id) {
        const actividad = await getActividad(params.id);
        setValue("nombre", actividad.nombre);
        setValue("descripcionA", actividad.descripcionA);
        // setValue("producto", actividad.producto);
      }
    };
    loadActividades();
  }, [params.id, getActividad, setValue]);

  return (

    <>

      <div className="cardCenter">
        <div className="content-wrapper">

          <div className="flex">


            <Card className="cardBro">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="nombre" >Nombre de la actividad</Label>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && (
                  <p className="text-red-500">
                    El nombre es requerido
                  </p>
                )}

                <Label htmlFor="descripcionA">Descripción de la actividad</Label>
                <Textarea
                  min="0"
                  type="text"
                  name="descripcionA"
                  id="descripcionA"
                  placeholder="Descripción"
                  {...register("descripcionA", { required: true })}
                />
                {errors.descripcionA && (
                  <p className="text-red-500">
                    La descripción de la actividad es requerida
                  </p>
                )}

                <div className="flex">
                  <Button>Guardar</Button>
                  <ButtonCancelar onClick={() => navigate("/actividades")}>Cancelar</ButtonCancelar>
                </div>

              </form>
            </Card>
          </div>
        </div>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>


  );
}


