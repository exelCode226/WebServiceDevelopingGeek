import React, { useEffect, useState } from "react";
import { usePedidos } from "../../context/pedidosContext";
import { Bar } from "react-chartjs-2";

export function GraficoProductoVendido() {
  const { pedidos, getPedidos } = usePedidos();
  const [productosMasRepetidos, setProductosMasRepetidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);

  useEffect(() => {
    if (pedidos.length > 0) {
      const productosRepetidos = pedidos.reduce((acc, pedido) => {
        pedido.productos.forEach((producto) => {
          const productoId = producto.producto ? producto.producto._id : null;
          const productoNombre = producto.producto ? producto.producto.nombre : "Producto Desconocido";

          if (productoId) {
            if (!acc[productoNombre]) {
              acc[productoNombre] = 0;
            }
            acc[productoNombre]++;
          }
        });
        return acc;
      }, {});

      const productosMasRepetidosArray = Object.entries(productosRepetidos)
        .sort(([, a], [, b]) => b - a) // Ordenar por cantidad de mayor a menor
        .map(([producto, cantidad]) => ({
          producto,
          cantidad,
        }))
        .slice(0, 10); // Mostrar solo los 10 productos más repetidos

      setProductosMasRepetidos(productosMasRepetidosArray);
    }
  }, [pedidos]);

  const data = {
    labels: productosMasRepetidos.map((producto) => producto.producto),
    datasets: [
      {
        label: "Número de productos",
        data: productosMasRepetidos.map((producto) => producto.cantidad),
        backgroundColor: "#045804",
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Mostrar barras horizontalmente
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de productos",
        },
      },
      y: {
        title: {
          display: true,
          text: "Productos",
        },
      },
    },
  };

  return (
    <div className="card card-success">
      <div className="card-header">
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
        </div>
        <h3 className="card-title">Productos más vendidos</h3>
      </div>
      <div className="card-body">
      
      {productosMasRepetidos.length > 0 ? (
        <div>
          <Bar data={data} options={options} />
          <ul>
            {productosMasRepetidos.map((producto) => (
              <li key={producto.producto}>
                <strong>{producto.producto}</strong> : {producto.cantidad}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay datos de pedidos disponibles.</p>
      )}
    </div>
    </div>
  );
}
