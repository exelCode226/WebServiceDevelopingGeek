import { useEmpleados } from "../../context/empleadoContext";
import { Button, ButtonLink, Card } from "../ui";

export function EmpleadoCard({ empleado }) {
  const { deleteEmpleado } = useEmpleados();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{empleado.username}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteEmpleado(empleado._id)}>Delete</Button>
          <ButtonLink to={`/empleados/${empleado._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{empleado.lastname}</p>
      <p className="text-slate-300">{empleado.identify}</p> {/* Cambio aquí */}
      <p className="text-slate-300">{empleado.typeEmpl}</p>
      {/* format date */}
      <p>
        {empleado.date &&
          new Date(empleado.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
