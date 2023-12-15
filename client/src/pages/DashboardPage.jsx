import { React } from 'react';

import GraficoEmpleados from '../components/dashboard/GraficoEmpleados';
import GraficoProductos from '../components/dashboard/GraficoProductos';
import { GraficoClientes } from '../components/dashboard/GraficoClientes';
import { GraficoProductoVendido } from '../components/dashboard/GraficoProductoVendido';
import MejoresMeses from '../components/dashboard/MejoresMeses';


const DashboardPage = () => {
    return (
        <div className='scrollDashBoard'>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <GraficoEmpleados />
                            </div>
                            <div className="col-md-6">
                                <GraficoProductos />
                            </div>
                            <div className="col-md-6">
                                <GraficoClientes />
                            </div>

                            <div className="col-md-6">
                                <GraficoProductoVendido />
                            </div>
                            {/* <div className="col-md-6">
                                <MejoresMeses />
                            </div> */}
                        </div>
                    </div>
                </section >
            </div>
        </div>

    );
};

export default DashboardPage;
