import React, { useEffect, useRef, useState } from 'react'
import { useProducts } from '../../context/productsContext';
import Chart from 'chart.js/auto';

const GraficoProductos = () => {
    const { products, getProducts } = useProducts();
    const [nombreDeProducts, setNombreDeProducts] = useState({});
    const chartProductsRef = useRef(null);
    const chartProductsInstance = useRef(null);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1); // Mes actual por defecto

    useEffect(() => {
      
        getProducts();
        
    }, [])

    useEffect(() => {
        const productosFiltrados = products.filter(producto => {
            const fecha = new Date(producto.fecha);
            return fecha.getMonth() + 1 === mesSeleccionado;
        });

        const tiposCount = productosFiltrados.reduce((acc, product) => {
            acc[product.nombre] = (acc[product.nombre] || 0) + 1;
            return acc;
        }, {});

        setNombreDeProducts(tiposCount);
    }, [products, mesSeleccionado]);

    useEffect(() => {
        const tiposCount = products.reduce((acc, product) => {
            acc[product.nombre] = (acc[product.nombre] || 0) + 1;
            return acc;
        }, {});

        setNombreDeProducts(tiposCount);
    }, [products]);

    
    useEffect(() => {
        if (chartProductsRef.current && nombreDeProducts) {
            if (chartProductsInstance.current) {
                chartProductsInstance.current.destroy();
            }

            const ctx = chartProductsRef.current.getContext('2d');
            chartProductsInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(nombreDeProducts),
                    datasets: [{
                        label: 'Cantidad de productos',
                        data: Object.values(nombreDeProducts),
                        borderColor: '#B6430E',
                        fill: true,
                    }],
                },
            });
        }
    }, [nombreDeProducts]);
  return (

    
       <div className="card card-warning">
        <div className="card-header">
        <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
         <i className="fas fa-minus" />
         </button>
        </div>
        <h3 className="card-title"> Productos más vendidos</h3>

        </div>
       

        <div className="card-body">
        <canvas id="areaChartProducts" ref={chartProductsRef} style={{ minHeight: 350, height: 350, maxHeight: 350, maxWidth: '100%' }} />
      <p><strong>Total de productos:</strong> {products.length}</p>
        <ul>
        {Object.entries(nombreDeProducts).map(([nombre, cantidad]) => (
        <li key={nombre}>
           <strong>{nombre}:</strong>  {cantidad}
        </li>
         ))}
        </ul>
     </div>
    </div>
  )
}

export default GraficoProductos
