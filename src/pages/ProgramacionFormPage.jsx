import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Label, Select } from "../components/ui";
import { useProgramaciones } from "../context/programacionesContext";
import { useEmpleados } from "../context/empleadoContext";
import { usePedidos } from "../context/pedidosContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";

dayjs.extend(utc);

export function ProgramacionFormPage() {
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [programados, setProgramados] = useState([]);
    const [empleadosProgramados, setEmpleadosProgramados] = useState([]);
  
    // Función para verificar si un pedido está programado
    const estaProgramado = (pedidoId) => {
      return programados.some((programado) => programado._id === pedidoId);
    };
  const {
    createProgramacion,
    getIdProgramacion,
    updateProgramacion,
    obtenerPedidosProgramados,
    obtenerEmpleadosProgramados,
    getProgramacion,
  } = useProgramaciones();

  const { empleados, getEmpleados } = useEmpleados();
  const { pedidos, getPedidos } = usePedidos();

  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getIdProgramacion();
    getEmpleados();
    getPedidos();
    getProgramacion();
  }, []);

  useEffect(() => {
    const loadProgramacion = async () => {
      if (params.id) {
        const programacion = await getIdProgramacion(params.id);
        setValue("Empleado", programacion.empleado);
        setValue("pedido", programacion.pedido._id);
      }
    };
  

    const loadProgramados = async () => {
        try {
          const listaProgramados = await obtenerPedidosProgramados();
          setProgramados(listaProgramados);
      
          const listaEmpleadosProgramados = await obtenerEmpleadosProgramados();
          setEmpleadosProgramados(listaEmpleadosProgramados);
        } catch (error) {
          console.error("Error al obtener programaciones:", error);
        }
      };
      

    loadProgramacion();
    loadProgramados();
  }, [params.id, getIdProgramacion, setValue]);

  const handlePedidoSelection = (event) => {
    const pedidoId = event.target.value;
    const pedidoSeleccionado = pedidos.find((pedido) => pedido._id === pedidoId);

    const estaProgramado = programados.some((programado) => programado._id === pedidoId);

    if (estaProgramado) {
      toast.error("Este pedido ya está programado");
      setSelectedPedido(null);
    } else {
      setSelectedPedido(pedidoSeleccionado);
      setValue("empleado", ""); // Restablecer valores de los selects de empleado
    }
  };

  const estaEmpleadoProgramado = (empleadoId, estadoEmpleado) => {
    return empleadosProgramados.some(
      (programado) => programado._id === empleadoId && programado.estadoEmpleado === estadoEmpleado
    );
  };

  const onSubmit = async (data) => {
    try {
      data.date = dayjs(data.date).utc().format();
      const empleadoData = Object.keys(data.empleado).map((productoIndex) => ({
        empleado: data.empleado[productoIndex].empleado,
      }));
      data.empleado = empleadoData;

      if (params.id) {
        await updateProgramacion(params.id, data);
      } else {
        await createProgramacion(data);
      }

      setTimeout(() => {
        navigate("/programaciones");
      }, 2800);
    } catch (error) {
      console.error(error);
      toast.error("Selecciona un pedido.");
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="divSeleccionPedidoInProgramacion">
                <Label htmlFor="pedido">Seleccionar un Pedido</Label>
                <Select
                  id="pedido"
                  name="pedido"
                  {...register("pedido")}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  onChange={handlePedidoSelection}
                >
                  <option disabled selected>
                    Seleccionar un pedido
                  </option>
                  {pedidos
  .filter((pedido) => !estaProgramado(pedido._id))
  .map((pedido) => (
    <option key={pedido._id} value={pedido._id} disabled={estaProgramado(pedido._id)}>
      Pedido del cliente: {pedido.cliente.nombreCompleto}
    </option>
))}
                </Select>
              </div>
            </div>

            <div className="separaPrograForm">
              <div className="productos-container">
                {selectedPedido &&
                  selectedPedido.productos.map((producto, productoIndex) => (
                    <div className="productosDIV text-center" key={producto._id}>
                      <Label>{producto.nombre}</Label>
                      {producto.actividades.map((actividad, actividadIndex) => (
                        <div key={actividadIndex}>
                          <h3 htmlFor={`empleado-${producto._id}-${actividad}`}>
                            Empleado para <strong className="subT">{actividad}</strong>
                          </h3>
                          <Select
                            id={`empleado-${producto._id}-${actividad}`}
                            name={`empleado[${productoIndex}].empleado[${actividadIndex}]`}
                            {...register(`empleado[${productoIndex}].empleado[${actividadIndex}]`)}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                          >
                            <option value="" disabled>
                              Seleccionar un empleado
                            </option>
                            {empleados
  .filter((empleado) => !estaEmpleadoProgramado(empleado._id, 'En proceso'))
  .map((empleado) => (
    <option key={empleado._id} value={empleado._id}>
      {empleado.username}
    </option>
))}
                          </Select>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            <div className="buttonsFormPedidos flex" title="Guardar programación">
              <Button>Guardar</Button>
              <ButtonCancelar onClick={() => navigate("/programaciones")}>Cancelar</ButtonCancelar>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
