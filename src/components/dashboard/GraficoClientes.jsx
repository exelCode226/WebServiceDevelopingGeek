import React, { useEffect, useState } from "react";
import { usePedidos } from "../../context/pedidosContext";
import { Bar } from "react-chartjs-2";

export function GraficoClientes() {
  const { pedidos, getPedidos } = usePedidos();
  const [clientesConPedidos, setClientesConPedidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);

  useEffect(() => {
    if (pedidos.length > 0) {
      const clientesPedidos = pedidos.reduce((acc, pedido) => {
        const clienteId = pedido.cliente ? pedido.cliente._id : null;
        const clienteNombre = pedido.cliente ? pedido.cliente.nombreCompleto : "Cliente Desconocido";

        if (clienteId) {
          if (!acc[clienteNombre]) {
            acc[clienteNombre] = 0;
          }
          acc[clienteNombre]++;
        }
        return acc;
      }, {});

      const clientesConPedidosArray = Object.entries(clientesPedidos).map(([cliente, numPedidos]) => ({
        cliente,
        numPedidos,
      }));

      setClientesConPedidos(clientesConPedidosArray);
    }
  }, [pedidos]);

  const data = {
    labels: clientesConPedidos.map((cliente) => cliente.cliente),
    datasets: [
      {
        label: "Número de pedidos",
        data: clientesConPedidos.map((cliente) => cliente.numPedidos),
        backgroundColor: "#013F89",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de pedidos",
        },
      },
      x: {
        title: {
          display: true,
          text: "Clientes",
        },
      },
    },
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
        </div>
        <h3 className="card-title">Top mejores clientes</h3>
      </div>
      <div className="card-body">
      {clientesConPedidos.length > 0 ? (
        <div>
          <Bar data={data} options={options} />
          <ul>
            {clientesConPedidos.map((cliente) => (
              <li key={cliente.cliente}>
                <strong>{cliente.cliente}</strong> - Número de pedidos: {cliente.numPedidos}
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
