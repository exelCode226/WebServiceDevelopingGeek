import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)


  if (isAuthenticated) {
    return (
      <nav className="bg-zinc-700 my-3 flex justify-between py-2 px-10 rounded-lg">
        <h1 className="text-1xl font-bold">
          <Link to={isAuthenticated ? "/tasks" : "/"}>Tareas</Link>
        </h1>
        <h1 className="text-1xl font-bold ">
          <Link to={isAuthenticated ? "/empleados" : "/"}>Empleado </Link>
        </h1>
        <h1 className="text-1xl font-bold ">
          <Link to={isAuthenticated ? "/product" : "/"}>Productos</Link>
        </h1>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>
                Welcome {user.username}
              </li>
              {/* <li>
                <ButtonLink to="/add-task">Add Tarea</ButtonLink>
              </li> */}
              <li>
                <ButtonLink to="/add-empleado">Add Empleado</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/add-product">Add Productos</ButtonLink>
              </li>
              <ButtonLink to="/add-task">Add Tarea</ButtonLink>
              <li>
                <Link to="/" onClick={() => logout()}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  } else {
    return null;
  }


}
