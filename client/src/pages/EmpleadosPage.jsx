import React, { useEffect, useState } from "react";
import { useEmpleados } from "../context/empleadoContext";
import { ImFileEmpty } from "react-icons/im";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { Button, FormControl, FormControlLabel, IconButton, Input, InputLabel, Paper, Switch, Pagination, Stack } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import PlaneSwitch from "../components/ui/PlaneSwitch";


export function EmpleadosPage() {
  const { empleados, getEmpleados, deleteEmpleado, cambiarEstadoEmpleado } = useEmpleados();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");



  const pageSize = 5; // Cantidad de elementos por página



  useEffect(() => {
    // Llama a getEmpleados dentro del useEffect para obtener los datos
    getEmpleados();
  }, []);

  const handleChangeEstado = async (empleadoId) => {
    const empleadoToUpdate = empleados.find((empleado) => empleado._id === empleadoId);

    if (!empleadoToUpdate) {
      return;
    }

    try {
      // Actualizar el estado localmente
      const updatedEmpleados = empleados.map((empleado) =>
        empleado._id === empleadoId ? { ...empleado, estado: !empleado.estado } : empleado
      );

      // Actualizar el estado del empleado en el servidor
      await cambiarEstadoEmpleado(empleadoId);
      getEmpleados(); // Suponiendo que getEmpleados vuelve a obtener la lista actualizada de empleados desde el servidor

      toast.success('Estado del empleado actualizado');
    } catch (error) {
      toast.error('Hubo un error al actualizar el estado del empleado');

      const updatedEmpleados = empleados.map((empleado) =>
        empleado._id === empleadoId ? { ...empleado, estado: !empleado.estado } : empleado
      );
      // Aquí podrías revertir los cambios locales si la solicitud al servidor falla
    }
  };

  const filteredEmpleados = empleados.filter(
    (empleado) =>
      empleado.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.identify.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.typeEmpl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredEmpleados.length / pageSize);
  const paginatedEmpleados = filteredEmpleados.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (empleadoId) => {
    if (window.confirm("¿Está seguro que desea eliminar este empleado?")) {
      deleteEmpleado(empleadoId);
    }
  };

  return (
    <>

      <div className="content-wrapper">

        <h2 className="text-primary text-center tituModus">Empleados</h2>

        <div className="buscadorYboton">


          <div className="buscar-pagina">



          </div>


        </div>



        {empleados.length === 0 ? (

          <div>
            <div>
              <ButtonLink to="/add-empleado"><div className="btn btn-primary">Agregar empleado</div></ButtonLink>
            </div>
            <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            </div>
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">No hay empleados en este momento.</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="content">

            <div className="buscar-pagina">
              <div className="buscadorPedidos">
                <Input
                  className="buscar"
                  id="search-input"
                  type="text"
                  placeholder="Buscar empleado"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <ButtonLink to="/add-empleado">
                  <div className="btn btn-primary">Agregar empleado</div>
                </ButtonLink>
              </div>
            </div>
            <table className="table table-hover justify-center text-center">

              <thead>
                <tr className="bg-primary">
                  <th className="">Documento</th>
                  <th className="">Nombre</th>
                  <th className="">Especialidad</th>
                  <th className="">Celular</th>
                  <th className="">Estado</th>
                  <th className="">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmpleados.map((empleado) => (
                  <tr key={empleado._id}>
                    <td className="text-black">{empleado.identify}</td>
                    <td className="text-black">{empleado.username}</td>
                    <td className="text-black">{empleado.typeEmpl}</td>
                    <td className="text-black">{empleado.celular}</td>

                     <td>
                     
                      {/* <FormControlLabel
                        title="Estados Empleados"
                        control={
                          <Switch
                            sx={{ m: 0.00002 }}
                            defaultChecked={empleado.estado}
                            onChange={() => handleChangeEstado(empleado._id)}
                          />
                        }
                      /> */}
                         <PlaneSwitch defaultChecked={empleado.estado} handleChangeEstado={() => handleChangeEstado(empleado._id)} />

                    
                    </td>
                    <td>

                      <Link to={`/empleados/${empleado._id}`} >
                        <button title="Editar empleado" className="btn btn-warning mx-2 py-1 ">
                          <EditIcon />
                        </button>
                      </Link>

                      <button onClick={() => handleDeleteEmpleado(empleado._id)} title="Eliminar empleado" className="btn btn-danger py-1">
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
                  count={Math.ceil(filteredEmpleados.length / pageSize)}
                  page={currentPage}
                  onChange={(event, newPage) => handlePageChange(newPage)}
                />
              </Stack>
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

export default EmpleadosPage;