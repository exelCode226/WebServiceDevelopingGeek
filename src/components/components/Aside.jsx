import React from 'react'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { useClientes } from '../../context/ClientesContext'
import { useEmpleados } from '../../context/empleadoContext'
import { useProgramaciones } from '../../context/programacionesContext'
import { usePedidos } from '../../context/pedidosContext'
import { useActividades } from '../../context/actividadesContext'
import { useProducts } from '../../context/productsContext'
import { useEffect } from 'react'




export default function Aside() {

  // Por favor no me toquen esto 
  const { isAuthenticated, user, getUsers } = useAuth()
  const { getClientes } = useClientes();
  const { getActividades } = useActividades();
  const { getEmpleados } = useEmpleados();
  const { getProgramacion } = useProgramaciones();
  const { getPedidos } = usePedidos();
  const { getProducts } = useProducts();

  useEffect(() => {
    getActividades();
    getEmpleados();
    getProgramacion();
    getPedidos();
    getProducts();
    getClientes();
    // getUsers();
  }, []);

  // console.log(user)


  

  let nombreTitle = '';

  switch (location.pathname) {
    case '/users':
      nombreTitle = 'Jhonny Rendon';
      break;
    default:
      nombreTitle = user && user.nombre ? user.nombre : 'Jhonny Rendon';
  }



  if (isAuthenticated) {
    return (
      <div className='shadowAside'>
        <aside className="asidecss main-sidebar sidebar-dark-primary">
          {/* Brand Logo */}
          <a title='Nombre de usuario' className="brand-link scrollNombreAside">
            <img src="https://th.bing.com/th/id/R.8ac32247336ea31ea4c7922e58324edd?rik=Z8d%2fuxDBhBSR2w&pid=ImgRaw&r=0" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            {/* <span className="brand-text font-weight-light">{user.nombre}</span> */}
            <span className="brand-text font-weight-light">{nombreTitle}</span>



          </a>
          {/* Sidebar */}
          <div className="sidebar">



            {/* Sidebar user panel (optional) */}
            {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="/profile" className="d-block"> {user.nombre}</a>
            </div>
          </div> */}
            {/* SidebarSearch Form */}
            {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div> */}
            {/* Sidebar Menu */}



            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                <li title="Ir a empleados" className="nav-item">
                  <div className="nav-link">
                    <i className="nav-icon fas fa-user-plus" />
                    <p>
                      <Link to="/empleados">Empleados</Link>
                    </p>
                  </div>
                </li>



                <li title='Ir a clientes' className="nav-item">
                  <div className="nav-link">
                    <i className="nav-icon fas fa-users" />
                    <p>
                      <Link to="/clientes" >Clientes</Link>
                    </p>
                  </div>
                </li>





                <li title='Ir a actividades' className="nav-item">
                  <div className="nav-link">
                    <i className="nav-icon fas fa-newspaper" />
                    <p>
                      <Link to="/actividades" >Actividades</Link>
                    </p>
                  </div>
                </li>





                <li to="products" title='Ir a productos' className="nav-item">
                  <div className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart" />
                    <p>
                      <Link to="products" >Productos</Link>

                    </p>
                  </div>
                </li>


                {/* <li className="nav-item">
                <a href="/tasks" className="nav-link">
                  <i className="nav-icon fas fa-tasks" />
                  <p>
                    Tareas
                  </p>
                </a>

              </li> */}





                <li title='Ir a pedidos' className="nav-item">
                  <div className="nav-link">
                    <i className="nav-icon fas fa-list-ul" />
                    <p>
                      <Link to="/pedidos">Pedidos</Link>
                    </p>
                  </div>
                </li>



                <li to="products" title='Ir a programación' className="nav-item">
                  <div className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart" />
                    <p>
                      <Link to="/programaciones" >Programaciones</Link>

                    </p>
                  </div>
                </li>



                <li title="Ir a dashboard" className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      <Link to="/dashboard">Dashboard</Link>
                    </p>
                  </p>
                </li>


                {user.nombre === "Jhony Rendon" && (
              <li title="Ir a usuarios" className="nav-item">
                <div className="nav-link">
                  <i className="nav-icon fas fa-user-plus" />
                  <p>
                    <Link to="/users">Usuarios</Link>
                  </p>
                </div>
              </li>
            )}
            

              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>

    )
  } else {
    return null;
  }



}

