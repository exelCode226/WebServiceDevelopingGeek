import React from 'react'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom';
import { ButtonLink } from '../ui';
import { useLocation } from 'react-router-dom';


export default function Header() {
  const { isAuthenticated, logout, user } = useAuth()

  const location = useLocation();

  let pageTitle = '';

  // 
  switch (location.pathname) {
    case '/add-empleado':
      pageTitle = 'Agregar empleado';
      break;
    case '/add-product':
      pageTitle = 'Agregar producto';
      break;
    case '/add-actividades':
      pageTitle = 'Agregar actividad';
      break;
    case '/add-cliente':
      pageTitle = 'Agregar cliente';
      break;
    case '/add-pedido':
      pageTitle = 'Agregar pedido';
      break;
    case '/add-programacion':
      pageTitle = 'Agregar programación';
      break;
    default:
      if (location.pathname.startsWith('/empleados/')) {
        pageTitle = 'Editar empleado';
      } else if (location.pathname.startsWith('/clientes/')) {
        pageTitle = 'Editar cliente';
      } else if (location.pathname.startsWith('/pedidos/')) {
        pageTitle = 'Editar pedido';
      } else if (location.pathname.startsWith('/products/')) {
        pageTitle = 'Editar producto';
      } else if (location.pathname.startsWith('/actividades/')) {
        pageTitle = 'Editar actividad';
      } else if (location.pathname.startsWith('/programaciones/')) {
        pageTitle = 'Editar programación';
      } else {
        pageTitle = '';
      }

  }



  if (isAuthenticated) {
    return (


      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}


        <ul className="navbar-nav">

          <li title='Desplegar panel' className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <div className="info nav-link">
              <label> D. Geek</label>
            </div>
          </li>








          {/* 
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/home" className="nav-link">Home</a>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <div className="info nav-link">
              <label> <ButtonLink to="/add-product" className="nav-link">Add Producto</ButtonLink> </label>
            </div>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <div className="info nav-link">
              <label> <ButtonLink to="/add-empleado" className="nav-link">Add Empleado</ButtonLink> </label>
            </div>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <div className="info nav-link">
              <label> <ButtonLink to="/add-actividades" className="nav-link">Add Actividad</ButtonLink> </label>
            </div>
          </li> */}


        </ul>



        <ul className="navbar-nav ml-auto">
          <div className="divAddText d-flex text-center align-items-center justify-content-center">
            <h2 className="text-primary text-center tituModusAgre">{pageTitle}</h2>
          </div>
        </ul>


        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">


          <li className="nav-item d-none d-sm-inline-block">
            <div className="store nav-link">

              <label><Link to="/login" onClick={() => logout()}><label className="fas fa-share"></label> Cerrar sesión</Link></label>
            </div>
          </li>


        </ul>
      </nav>

    )
  }

  else {
    return null;
  }

}