import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useEmpleados } from '../../context/empleadoContext';

const GraficoEmpleados = () => {
  const { empleados, getEmpleados } = useEmpleados();
  const [tiposDeEmpleados, setTiposDeEmpleados] = useState({});
  const chartEmpleadosRef = useRef(null);
  const chartEmpleadosInstance = useRef(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      await getEmpleados();
    };

    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (chartEmpleadosRef.current && empleados) {
      if (chartEmpleadosInstance.current) {
        chartEmpleadosInstance.current.destroy();
      }

      const tiposDeEmpleados = empleados.reduce((acc, empleado) => {
        acc[empleado.typeEmpl] = (acc[empleado.typeEmpl] || 0) + 1;
        return acc;
      }, {});

      setTiposDeEmpleados(tiposDeEmpleados);

      const ctx = chartEmpleadosRef.current.getContext('2d');
      chartEmpleadosInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(tiposDeEmpleados),
          datasets: [{
            data: Object.values(tiposDeEmpleados),
            backgroundColor: ['#007bff', '#28a745', '#ffd109'],
          }],
        },
      });
    }
  }, [empleados]);

  return (
    <div className="card card-danger">
      <div className="card-header">
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
        </div>
        <h3 className="card-title">Total de empleados</h3>
      </div>
      <div className="card-body">
        <canvas id="donutChartEmpleados" ref={chartEmpleadosRef} style={{ minHeight: 350, height: 350, maxHeight: 350, maxWidth: '100%' }} />
        <p><strong>Total de empleados:</strong> {empleados.length}</p>
        <ul>
          {Object.entries(tiposDeEmpleados).map(([tipo, cantidad]) => (
            <li key={tipo}>
              <strong>{tipo}:</strong> {cantidad}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GraficoEmpleados;
