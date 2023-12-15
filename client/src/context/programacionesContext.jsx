import { createContext, useContext, useState, useEffect } from "react";
import { getProgramacionesRequest, getProgramacionIdRequest, createProgramacionRequest, deleteProgramacionRequest, updateProgramacionRequest } from "../api/programacion";
import { EmpleadoProvider } from "./empleadoContext";
import { ProductProvider } from "./productsContext";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2'


const programacionesContext = createContext();

export const useProgramaciones = () => {
    const context = useContext(programacionesContext);
    if (!context) throw new Error("use programaciones must be used within a programacionesProvider ");
    return context;
}


export function ProgramacionProvider({ children }) {
    const [programaciones, setProgramaciones] = useState([]);
    const [errors, setErrors] = useState([])



    const getProgramacion = async () => {
        const res = await getProgramacionesRequest();
        setProgramaciones(res.data);
        console.log(res.data);
        // try {

        //     const res = await getProgramacionesRequest();

        //     console.log(res.data);

        //     // Agrega este log
        //     setProgramaciones(res.data);

        // } catch (error) {
        //     setErrors(error.response.data)
        // }
    };

    const obtenerPedidosProgramados = async () => {
        try {
          const response = await getProgramacionesRequest(); // Puedes ajustar la función según la lógica de tu backend
          const programaciones = response.data;
      
          // Filtra los pedidos de las programaciones
          const pedidosProgramados = programaciones.map(programacion => programacion.pedido);
      
          return pedidosProgramados;
        } catch (error) {
          console.error("Error al obtener los pedidos programados:", error);
          throw error;
        }
      };

      const obtenerEmpleadosProgramados = async () => {
        try {
          const response = await getProgramacionesRequest();
          const programaciones = response.data;
      
          // Obtener todos los empleados de todas las programaciones
          const empleadosProgramados = programaciones.flatMap((programacion) =>
            programacion.empleado.flatMap((empleadoGrupo) =>
              empleadoGrupo.empleado.filter((empleado) => empleado.estadoEmpleado !== 'En proceso')
            )
          );
      
          return empleadosProgramados;
        } catch (error) {
          console.error("Error al obtener los empleados programados:", error);
          throw error;
        }
      };
      
      
      

      const deleteProgramacion = async (id) => {
        try {
          const res = await deleteProgramacionRequest(id);
          if (res.status === 204) {
            setProgramaciones(programaciones.filter((programacion) => programacion._id !== id));
            toast.success("Programación eliminada exitosamente");
          }
        } catch (error) {
          console.log(error);
      
          if (error.response && error.response.status === 403) {
            toast.error("No tienes permisos para eliminar la programación");
          } else {
            setErrors(error.response ? [error.response.data.message] : ["Error desconocido"]);
            toast.error("No se puede eliminar");
          }
        }
      };

    const createProgramacion = async (programaciones) => {
        try {
            const res = await createProgramacionRequest(programaciones);
            console.log(res.data);
            // Llama a la función para obtener la lista actualizada
            toast.success('Programación exitosa');
        } catch (error) {
            console.error(error);
            // setErrors(error.response.data)
        }
    };
    
  
    const getIdProgramacion = async (id) => {
        try {
            const res = await getProgramacionIdRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateProgramacion = async (id, updatedProgramacion) => {
        try {
            await updateProgramacionRequest(id, updatedProgramacion);
            toast.success('Programación actualizada exitosamente');
        } catch (error) {
          if (error.response && error.response.status === 403) {
            toast.error("No tienes permisos para editar una programación");
          } else {
            setErrors(error.response ? [error.response.data.message] : ["Error desconocido"]);
            toast.error("No se puede editar");
          }
        }
    };


const marcarComoTerminado = async (programacionId) => {
  try {
    const updatedProgramacion = await updateProgramacionRequest(programacionId, {
      estado: 'Terminado',
    });

    // Actualizar la lista de programaciones en el estado
    setProgramaciones((prevProgramaciones) =>
      prevProgramaciones.map((programacion) =>
        programacion._id === programacionId ? updatedProgramacion.data : programacion
      )
    );

    toast.success('Programación marcada como Terminado exitosamente');
  } catch (error) {
    console.error(error);
    toast.error('Error al marcar la programación como Terminado');
  }
};


// ... (resto del código en tu contexto) ...

const marcarActividadComoTerminada = async (programacionId, productoIndex) => {
  try {
    const updatedProgramacion = await updateProgramacionRequest(programacionId, {
      actividades: programaciones.find((p) => p._id === programacionId).actividades.map((actividad, index) => ({
        ...actividad,
        estadoActividades: index === productoIndex ? 'Terminado' : actividad.estadoActividades,
      })),
    });

    setProgramaciones((prevProgramaciones) =>
      prevProgramaciones.map((programacion) =>
        programacion._id === programacionId ? updatedProgramacion.data : programacion
      )
    );

    toast.success('Actividad terminada exitosamente');
  } catch (error) {
    console.error(error);
    toast.error('Error al marcar como Terminado');
  }
};



// ... (resto del código en tu contexto) ...





    useEffect(() => {
        if (errors.length > 0) {
          const timer = setTimeout(() => {
            setErrors([])
          }, 1500)
          return () => clearTimeout(timer)
        }
      }, [errors])

    return (
        <EmpleadoProvider>
            <ProductProvider>
                <programacionesContext.Provider
                    value={{
                        programaciones,
                        getProgramacion,
                        obtenerPedidosProgramados,
                        obtenerEmpleadosProgramados,
                        deleteProgramacion,
                        createProgramacion,
                        getIdProgramacion,
                        updateProgramacion,
                        marcarComoTerminado,
                        marcarActividadComoTerminada,
                        errors,
                    }}
                >
                    {children}
                </programacionesContext.Provider>
            </ProductProvider>
        </EmpleadoProvider>
    );
}
