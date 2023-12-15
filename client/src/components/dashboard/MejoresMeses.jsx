import React from 'react';
import { Line } from 'react-chartjs-2';

const MejoresMeses = () => {
  const salesGraphChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Marzo', '2012 Q2', '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2'],
    datasets: [
      {
        label: 'Digital Goods',
        fill: false,
        borderWidth: 5,
        lineTension: 0,
        spanGaps: true,
        borderColor: '#efefef',
        pointRadius: 8,
        pointHoverRadius: 9,
        pointColor: '#efefef',
        pointBackgroundColor: '#efefef',
        data: [20666, 2778, 4912, 3767, 6810, 5670, 4820, 15073, 10687, 8432],
      },
    ],
  };

  const salesGraphChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          fontColor: '#efefef',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 2000,
          fontColor: '#efefef',
        },
        grid: {
          display: true,
          color: '#efefef',
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <> {/* solid sales graph */}
<div className="card bg-gradient-info">
  <div className="card-header border-0">
    <h3 className="card-title">
      <i className="fas fa-th mr-1" />
      Sales Graph
    </h3>
    <div className="card-tools">
      <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  <div className="card-body">
    <canvas className="chart" id="line-chart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} />
  </div>
  {/* /.card-body */}
  <div className="card-footer bg-transparent">
    <div className="row">
      <div className="col-4 text-center">
        <input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
        <div className="text-white">Mail-Orders</div>
      </div>
      {/* ./col */}
      <div className="col-4 text-center">
        <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
        <div className="text-white">Online</div>
      </div>
      {/* ./col */}
      <div className="col-4 text-center">
        <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
        <div className="text-white">In-Store</div>
      </div>
      {/* ./col */}
    </div>
    {/* /.row */}
  </div>
  {/* /.card-footer */}
</div>
{/* /.card */}</>
  

  );
};

export default MejoresMeses;
