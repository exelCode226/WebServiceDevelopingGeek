import React, { useEffect, useState } from "react";
import { useClientes } from "../context/ClientesContext";
// import {ImFileEmpty} from "react-icons/im"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import toast, { Toaster } from "react-hot-toast";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputLabel,
  Paper,
  Switch,
  Pagination,
  Stack
} from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { ImFileEmpty } from "react-icons/im";




export function ClientesPage() {
  const { clientes, getClientes } = useClientes();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5; // Cantidad de elementos por página
  const { deleteCliente } = useClientes();
  useEffect(() => {
    getClientes();
  }, []);





  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredClientes.length / pageSize);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (clienteId) => {
    if (window.confirm("¿Está seguro que desea eliminar este cliente?")) {
      deleteCliente(clienteId);
    }
  };

  return (
    <>
      <div className="content-wrapper">

        <h2 className="text-primary text-center tituModus">Clientes</h2>

        {clientes.length === 0 ? (
         <div>
         <div>
           <ButtonLink to="/add-cliente"><div className="btn btn-primary">Agregar cliente</div></ButtonLink>
         </div>
         <div>
         <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
       </div>
         <div className="flex justify-center items-center p-10">
           <div>
             <h1 className="font-bold text-xl">No hay clientes en este momento.</h1>
           </div>
         </div>
       </div>
        ) : (
          <div>
            <div className="buscadorYboton">
              <div className="buscar-pagina">
                <div className="buscadorPedidos">
                  <Input
                    className="buscar"
                    id="search-input"
                    type="text"
                    placeholder="Buscar cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    endAdornment={<IconButton aria-label="search"></IconButton>}
                  />
                </div>
              </div>

              <div>
                <ButtonLink to="/add-cliente"><div className="btn btn-primary">Agregar cliente</div></ButtonLink>
              </div>

            </div>

            <table className="table table-hover justify-center text-center">

              <thead>
                <tr className="bg-primary">
                  <th className="">Documento</th>
                  <th className="">Nombre completo</th>
                  <th className="">Celular</th>
                  <th className="">Dirección</th>
                  <th className="">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {paginatedClientes.map((cliente) => (
                  <tr key={cliente._id}>
                    <td className="text-black">{cliente.documento}</td>
                    <td className="text-black">{cliente.nombreCompleto}</td>
                    <td className="text-black">{cliente.celular}</td>
                    <td className="text-black">{cliente.direccion}</td>
                    <td>

                      <Link to={`/clientes/${cliente._id}`} >
                        <button title="Editar cliente" className="btn btn-warning mx-2 py-1 ">
                          <EditIcon />
                        </button>
                      </Link>


                      <button onClick={() => handleDeleteEmpleado(cliente._id)} title="Eliminar cliente" className="btn btn-danger py-1">
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
          count={Math.ceil(filteredClientes.length / pageSize)} 
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
