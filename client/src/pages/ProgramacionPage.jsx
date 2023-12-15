import { useEffect, useState } from "react";
import { useProgramaciones } from "../context/programacionesContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Input,
  Paper,
  Pagination,
  Stack
} from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import toast, { Toaster } from 'react-hot-toast';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import Dialog from "@mui/material/Dialog";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";
import { Button } from "../components/ui";
import { IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ImFileEmpty } from "react-icons/im";




export function ProgramacionPage() {
  const { programaciones, getProgramacion, deleteProgramacion, marcarComoTerminado, marcarActividadComoTerminada } = useProgramaciones();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5;
  


  const handleTerminarProgramacion = async (programacionId) => {
    if (window.confirm("¿Está seguro que desea marcar esta programación como Terminado?")) {
      await Promise.resolve(marcarComoTerminado(programacionId));
      getProgramacion();
    }
  };

  const handleTerminarActividad = async (programacionId, productoIndex) => {
    if (window.confirm('¿Está seguro que desea marcar esta actividad como Terminada?')) {
      await marcarActividadComoTerminada(programacionId, productoIndex);
      getProgramacion(); // Recargar programaciones después de marcar como "Terminada"
      setTimeout(() => {
        handleCloseModal()
      }, 280);

    }
  };


  useEffect(() => {
    getProgramacion();
  }, []);

  const filteredProgramaciones = programaciones.filter((programacion) => {
    const searchTermLower = searchTerm.toLowerCase();
  
    // Función para buscar en un array anidado
    const searchInNestedArray = (nestedArray, term) => {
      return nestedArray.some((nestedItem) => {
        // Buscar en el array de empleados
        if (nestedItem.empleado) {
          return nestedItem.empleado.some((empleado) =>
            Object.values(empleado).some((value) =>
              typeof value === "string" && value.toLowerCase().includes(term)
            )
          );
        }
  
        // Buscar en otros arrays
        return Object.values(nestedItem).some((value) =>
          typeof value === "string" && value.toLowerCase().includes(term)
        );
      });
    };
  
    // Buscar en las propiedades directas de la programación
    if (Object.values(programacion).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchTermLower)
    )) {
      return true;
    }
  
    // Buscar en propiedades específicas
    if (
      searchInNestedArray(programacion.empleado, searchTermLower) ||
      searchInNestedArray(programacion.pedido.productos, searchTermLower) ||
      programacion.pedido.cliente.nombreCompleto.toLowerCase().includes(searchTermLower)
    ) {
      return true;
    }
  
    return false;
  });
  


  const pageCount = Math.ceil(filteredProgramaciones.length / pageSize);
  const paginatedProgramaciones = filteredProgramaciones
    .sort((a, b) => {
      // Ordenar por estado, colocando primero las programaciones "En proceso"
      if (a.estado === 'En proceso' && b.estado !== 'En proceso') {
        return -1;
      } else if (a.estado !== 'En proceso' && b.estado === 'En proceso') {
        return 1;
      } else {
        // En caso de empate o si ambos estados son iguales, mantener el orden actual
        return 0;
      }
    })
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteProgramacion = (programacionId) => {
    if (window.confirm("¿Está seguro que desea eliminar esta programación?")) {
      deleteProgramacion(programacionId);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedProgramacion, setSelectedProgramacion] = useState(null);

  const handleOpenModal = (programacion) => {
    setSelectedProgramacion(programacion);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };



  return (
    <>

      <div className="content-wrapper">
        <div className='scrollPageProg'>
          <h2 className="text-primary text-center tituModus">Programación</h2>
          {programaciones.length === 0 ? (
            <div>
              <div>
                <ButtonLink to="/add-programacion"><div className="btn btn-primary">Agregar programación</div></ButtonLink>
              </div>
              <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            </div>
              <div className="flex justify-center items-center p-10">
                <div>
                  <h1 className="font-bold text-xl">No hay programaciones en este momento.</h1>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="buscar-pagina">
                <div className="buscadorProgramacion">
                  <Input
                    className="buscar"
                    id="search-input"
                    type="text"
                    placeholder="Buscar programación"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <ButtonLink to="/add-programacion"><div className="btn btn-primary">Agregar programación</div></ButtonLink>
                </div>
              </div>





              <table className="table table-hover justify-center text-center">
                <thead>
                  <tr className="bg-primary">
                    <th className="">Cliente</th>
                    <th className="">Empleados</th>
                    <th className="">Actividades</th>
                    <th className="">Estado general</th>
                    <th className="">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProgramaciones.map((programacion, programacionIndex) => (
                    <tr key={programacion._id}>

                      <td className="text-black align-middle">
                        {programacion.pedido && programacion.pedido.cliente ? (
                          <p>{programacion.pedido.cliente.nombreCompleto}</p>
                        ) : (
                          <p>Cliente no disponible</p>
                        )}
                      </td>


                      <td className="text-black align-middle">
                        {programacion.empleado
                          ? programacion.empleado.map((grupoEmpleados, grupoIndex) => (
                            <div className="" key={grupoIndex}>
                              {grupoEmpleados.empleado.map((empleado, empleadoIndex) => (
                                <div className="" key={empleadoIndex}>
                                  <p>{empleado.username}</p>
                                </div>
                              ))}
                            </div>
                          ))
                          : "Empleado no encontrado"}

                      </td>




                      <td className="text-black align-middle">
                        {programacion.pedido && programacion.pedido.productos ? (
                          programacion.pedido.productos.map((producto, productoIndex) => (
                            <div className="" key={productoIndex}>
                              <p><strong>{producto.nombre}:</strong> {producto.actividades ? producto.actividades.join(', ') : 'No hay actividades'}</p>
                            </div>
                          ))
                        ) : (
                          <p>No hay productos en el pedido</p>
                        )}
                      </td>



                      <td className="text-black align-middle">
                        <div className="flex justify-center">
                          {programacion.estado === 'Terminado' ? (
                            <div className="flex items-center">
                              <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '5px' }} />
                              <span>Terminado</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <CheckCircleOutlineIcon style={{ color: 'red', marginRight: '5px' }} />
                              <span>En proceso</span>
                            </div>
                          )}
                        </div>
                      </td>





                      <td className="align-middle ">
                        <button
                          title="Información de la Programación"
                          className="btn btn-info mx-2 py-1"
                          onClick={() => handleOpenModal(programacion)}
                        >
                          <InfoSharpIcon />
                        </button>


                        {/* <Link to={`/programaciones/${programacion._id}`}>
                          <button title="Editar programación" className="btn btn-warning mx-2 py-1">
                            <EditIcon />
                          </button>
                        </Link> */}


                        {/* Otros botones */}



                        {programacion.estado !== 'En proceso' && (
                          <button
                            onClick={() => handleDeleteProgramacion(programacion._id)}
                            title="Eliminar programación"
                            className="btn btn-danger py-1"
                          >
                            <DeleteIcon />
                          </button>
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>



              {/* Puedes habilitar la paginación si lo deseas */}
              <div className="paginationTd">
              <Stack spacing={2}>
        <Pagination
       
        boundaryCount={1} 
        siblingCount={0} 
        color="primary"
          count={Math.ceil(filteredProgramaciones.length / pageSize)} 
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
      </Stack>
              </div>
            </div>
          )}





          <Dialog open={openModal} onClose={handleCloseModal}>
            {selectedProgramacion && (
              <div className="completo">
                <h2 className="modal-titulo">
                  <strong>Información de la programación</strong>
                </h2>

                {selectedProgramacion.pedido.productos.map((producto, productoIndex) => (
                  <div className="divModil" key={productoIndex}>

                    <div className="flex">

                      <div>

                        <p>
                          <strong className="subT">Producto:</strong> {producto.nombre}
                        </p>
                        <p>
                          <strong>Precio:</strong> {producto.precio}
                        </p>
                        <p>
                          <strong>Cantidad:</strong> {producto.cantidad}
                        </p>

                        {/* Mostrar las actividades del producto */}
                        <p>
                          <strong>Actividades:</strong>{' '}
                          {selectedProgramacion.actividades[productoIndex].actividadesPorProducto.join(', ')}
                        </p>

                        {/* Mostrar los empleados asociados a este producto */}
                        {selectedProgramacion.empleado[productoIndex].empleado.map((empleado, empleadoIndex) => (
                          <div key={empleadoIndex}>
                            <p>
                              <strong>Empleado:</strong> {empleado.username}
                            </p>
                            {/* Aquí podrías mostrar otras informaciones específicas del empleado si las hay */}
                          </div>
                        ))}



                        {/* Botón para marcar la actividad como Terminado */}


                      </div>


                      <div className="botonesTermiProgra">
                        <p>
                          {/* Utilizamos IconButton y CheckCircleOutlineIcon cuando está terminado */}
                          {selectedProgramacion.actividades[productoIndex].estadoActividades === 'Terminado' ? (

                            <div>
                              <IconButton disabled>
                                <CheckCircleOutlineIcon style={{ color: 'green' }} />
                              </IconButton>
                              <span>Terminado</span>
                            </div>




                          ) : (
                            <button
                              onClick={() => handleTerminarActividad(selectedProgramacion._id, productoIndex)}
                              title="Marcar como terminado"
                              className="terminadoBoton"
                            >
                              <CheckCircleOutlineIcon style={{ color: 'red' }} />  <span>En proceso</span>
                            </button>
                          )}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}


                <div className="flex">
                  {/* Otros botones o contenido del modal */}
                  <ButtonCancelar className="close-button" onClick={handleCloseModal}>
                    Cerrar
                  </ButtonCancelar>
                </div>
              </div>
            )}
          </Dialog>



        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
