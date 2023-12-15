import React, { useEffect, useState } from "react";
import { useActividades } from "../context/actividadesContext";
import { ImFileEmpty } from "react-icons/im";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
// import CustomizedSwitches from "../components/ui/Switch";
import { FormControl, IconButton, Input, InputLabel, Paper,Pagination,Stack } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';



export function ActividadesPage() {
  const { actividades, getActividades, deleteActividad } = useActividades();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 6; // Cantidad de elementos por página

  useEffect(() => {
    getActividades();
  }, []);

  const filteredActividades = actividades.filter(
    (actividad) =>
      actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredActividades.length / pageSize);
  const paginatedActividades = filteredActividades.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (actividadId) => {
    if (window.confirm("¿Está seguro que desea eliminar este pedido?")) {
      deleteActividad(actividadId);
    }
  }

  return (
    <>
      <div className="content-wrapper">

        <h2 className="text-primary text-center tituModus">Actividades</h2>



        {actividades.length === 0 ? (
          <div>
          <div>
            <ButtonLink to="/add-actividades"><div className="btn btn-primary">Agregar actividad</div></ButtonLink>
          </div>
          <div>
          <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
        </div>
          <div className="flex justify-center items-center p-10">
            <div>
              <h1 className="font-bold text-xl">No hay actividades en este momento.</h1>
            </div>
          </div>
        </div>
        ) : (

          <div>
            <div className="content">



              <div className="buscadorYboton">


                <div className="buscar-pagina">

                  <div className="buscadorPedidos">

                    <Input
                      id="search-input"
                      type="text"
                      placeholder="Buscar actividad"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      endAdornment={
                        <IconButton aria-label="search">
                          {/* Icono de búsqueda */}
                        </IconButton>
                      }
                    />

                  </div>
                </div>



                <div>
                  <ButtonLink to="/add-actividades"><div className="btn btn-primary">Agregar actividad</div></ButtonLink>
                </div>

              </div>
              <div>

                <table className="table table-hover justify-center text-center">

                  <thead >
                    <tr className="bg-primary">
                      <th className="">Nombre actividad</th>
                      <th className="">Descripción actividad</th>
                      <th className="">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedActividades.map((actividad) => (
                      <tr key={actividad._id}>
                        <td className="text-black">{actividad.nombre}</td>
                        <td className="text-black">{actividad.descripcionA}</td>
                        <td>


                          <Link to={`/actividades/${actividad._id}`} >
                            <button title="Editar cliente" className="btn btn-warning mx-2 py-1 ">
                              <EditIcon />
                            </button>
                          </Link>


                          <button onClick={() => handleDeleteEmpleado(actividad._id)} title="" className="btn btn-danger py-1">
                            <DeleteIcon />
                          </button>


                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                <div>
                <Stack spacing={2}>
        <Pagination
        
        boundaryCount={1} 
        siblingCount={0} 
        color="primary"
          count={Math.ceil(filteredActividades.length / pageSize)} 
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
      </Stack>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );
}
