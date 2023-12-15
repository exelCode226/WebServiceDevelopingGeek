import { useEffect, useState } from "react";
import { usePedidos } from "../context/pedidosContext";
import { Button } from "../components/ui";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import CancelIcon from "@mui/icons-material/Cancel";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";
import DownloadIcon from "@mui/icons-material/Download";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import toast, { Toaster } from "react-hot-toast";
import "../components/styles/register.css";
import Dialog from "@mui/material/Dialog";
import { ImFileEmpty } from "react-icons/im";


export function PedidosPage() {
  const { pedidos, getPedidos } = usePedidos();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5; // Cantidad de elementos por página
  const { deletePedido } = usePedidos();
  useEffect(() => {
    getPedidos();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredPedidos = pedidos.filter((pedido) => {
    const searchTermLower = searchTerm.toLowerCase();

    // Check if the cliente's name or any of the pedido's products' names or other fields match the search term
    return (
      pedido.cliente.nombreCompleto.toLowerCase().includes(searchTermLower) ||
      pedido.productos.some((product) => {
        // Check the nombre property of each product
        return product.producto.nombre.toLowerCase().includes(searchTermLower);
      }) ||
      pedido.fecha_aprox.toLowerCase().includes(searchTermLower) ||
      pedido.especificaciones.toLowerCase().includes(searchTermLower)
    );
  });

  const pageCount = Math.ceil(filteredPedidos.length / pageSize);
  const paginatedPedidos = filteredPedidos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const generatePDFFromModal = () => {
    if (selectedPedido) {
      const doc = new jsPDF();

      const x = 15;
      let y = 20;

      // Establece la fuente a Arial para todo el PDF
      doc.setFont("Arial", "normal");

      // Información del cliente y pedido
      doc.autoTable({
        startY: y,
        head: [["Información", "Pedido"]],
        body: [
          ["Cliente", selectedPedido.cliente.nombreCompleto],
          ["Especificaciones", selectedPedido.especificaciones],
        ],
        margin: { left: x },
        columnStyles: { 0: { fontStyle: "bold" } },
      });

      y = doc.autoTable.previous.finalY + 10;

      const productsTable = selectedPedido.productos.map((producto) => [
        producto.producto.nombre,
        producto.cantidad,
      ]);

      // Agrega el "Precio Total" a la tabla de productos
      productsTable.push(["Precio Total", selectedPedido.precioTotal.toLocaleString("es-ES")]);

      // Productos
      doc.autoTable({
        startY: y,
        head: [["Producto", "Cantidad"]],
        body: productsTable,
        margin: { left: x },
        columnStyles: { 0: { fontStyle: "bold" } },
      });

      // Sección "Entregado por" y "Recibido por" fuera de la tabla
      y = doc.autoTable.previous.finalY + 10;

      // Establece un tipo de letra diferente para este texto
      const fontStyleForText = { style: "times", size: 12 }; // Ajusta según el tipo de letra y tamaño deseado

      doc.setFont(fontStyleForText.style, fontStyleForText.size);

      doc.text(
        "Entregado por: ___________________ Recibido por: ___________________",
        x,
        y
      );

      // Guarda el PDF
      doc.save("pedidoInfo.pdf");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (pedidoId) => {
    if (window.confirm("¿Está seguro que desea eliminar este pedido?")) {
      deletePedido(pedidoId);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <h2 className="text-primary text-center tituModus">Pedidos</h2>

        {pedidos.length === 0 ? (
          <div>
            <div>
              <ButtonLink to="/add-pedido"><div className="btn btn-primary">Agregar pedido</div></ButtonLink>
            </div>
            <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            </div>
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">No hay pedidos en este momento.</h1>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="buscar-pagina">
              <div className="buscadorPedidos">
                <Input
                  className="buscar"
                  id="search-input"
                  type="text"
                  placeholder="Buscar pedido"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <ButtonLink to="/add-pedido">
                  <div className="btn btn-primary">Agregar pedido</div>
                </ButtonLink>
              </div>
            </div>

            <table className="table table-hover justify-center text-center">
              <thead>
                <tr className="bg-primary">
                  <th className="">Cliente</th>
                  <th className="">Producto - Cantidad</th>
                  {/* <th className="">Estado</th> */}
                  {/* <th className="">Fecha aproximada</th>
                  <th className="">Fecha creación</th>*/}
                  <th className="">Precio total</th>
                  {/* <th className="">Especificaciones</th> */}
                  <th className="">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPedidos.map((pedido) => (
                  <tr key={pedido._id}>
                    <td className="text-black">
                      {pedido.cliente.nombreCompleto}
                      {/* <td className="text-black">
                      {pedido.productos
                        ? pedido.productos.map((items) => (
                            <div >
                              <p>{items.pruducto.nombre}</p>
                            </div>
                          ))
                        : "producto no encontrado"}*/}
                    </td>
                    <td className="text-black">
                      <div className="scrollable-content">
                        {pedido.productos
                          ? pedido.productos.map((items) => (
                            <div key={items._id}>
                              <p>
                                {items.producto
                                  ? items.producto.nombre
                                  : "Nombre no encontrado"}{" "}
                                ~ {items.cantidad}
                              </p>
                            </div>
                          ))
                          : "Productos no encontrados"}
                      </div>
                    </td>

                    {/* <td className="text-black">{pedido.estado}</td> */}
                    {/* <td className="text-black">{pedido.fecha_aprox}</td>
                    <td className="text-black">{pedido.fechaC}</td> */}
                    <td className="text-black">
                      {"$ " + pedido.precioTotal.toLocaleString("es-ES")}
                    </td>
                    {/* <td className="text-black">
                      <div className="scrollable-especificaciones">
                        {pedido.especificaciones}
                      </div>
                    </td> */}



                    <td>
                      <button
                        title="Información del Pedido"
                        className="btn btn-info py-1"
                        onClick={() => handleOpenModal(pedido)}
                      >
                        <InfoSharpIcon />
                      </button>
                      <Link to={`/pedidos/${pedido._id}`}>

                        <button
                          title="Editar cliente"
                          className="btn btn-warning mx-2 py-1 "
                        >
                          <EditIcon />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteEmpleado(pedido._id)}
                        title="Eliminar cliente"
                        className="btn btn-danger py-1"
                      >
                        <DeleteIcon />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {console.log(pedidos)}
            <div>
              <Stack spacing={2}>
                <Pagination

                  boundaryCount={1}
                  siblingCount={0}
                  color="primary"
                  count={Math.ceil(filteredPedidos.length / pageSize)}
                  page={currentPage}
                  onChange={(event, newPage) => handlePageChange(newPage)}
                />
              </Stack>
            </div>
          </div>
        )}

        <Dialog open={openModal} onClose={handleCloseModal}>
          {selectedPedido && (
            <div className="completo">
              <div className="pdf">
                <div  >
                  <h2 className="modal-titulo">
                    <strong>Información del Pedido</strong>
                  </h2>
                </div>
                <div className="pdf1">
                  <button onClick={generatePDFFromModal}>
                    <DownloadIcon />
                  </button>
                </div>
              </div>

              <p>
                <strong className="subT">Pedido creado por:</strong>{" "}
                {selectedPedido.user.nombre}
              </p>
              <p>
                <strong className="subT">Cliente:</strong>{" "}
                {selectedPedido.cliente.nombreCompleto}
              </p>
              <p>
                <strong className="subT">Creación del pedido:</strong>{" "}
                {selectedPedido.fechaC}
              </p>
              <p>
                <strong className="subT">Fecha Aproximada:</strong>{" "}
                {selectedPedido.fecha_aprox}
              </p>
              <p>
                <strong className="subT">Precio Total:</strong>{" "}
                {"$ " + selectedPedido.precioTotal.toLocaleString("es-ES")}
              </p>
              <p>
                <strong className="subT">Especificaciones:</strong>{" "}
                {selectedPedido.especificaciones}
              </p>
              <div className="contenedor-tabla">
                <table className="tablamod">
                  <thead>
                    <tr>
                      <th className="subT">Producto</th>{" "}
                      <th className="subT justify-center text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPedido.productos.map((producto, index) => (
                      <tr className="mod align-middle" key={producto.producto._id}>
                        <td>{producto.producto.nombre}</td>

                        <td >
                          <div className="justify-center text-center">
                            {producto.cantidad}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ButtonCancelar
                className="close-button"
                onClick={handleCloseModal}
              >
                Cerrar
              </ButtonCancelar>
            </div>
          )}
        </Dialog>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
