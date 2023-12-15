import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productsRoutes from './routes/product.routes.js'
import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import empleadoRoutes from './routes/empleado.routes.js'
import actividadesRoutes from './routes/actividades.routes.js'
import clientesRouter from './routes/clientes.routes.js'
import pedidosRouter from './routes/pedidos.routes.js'
import programacionRouter from './routes/programacion.routes.js'
import { createRoles } from "./libs/initialSetUp.js";


const app = express();
createRoles()
app.use(cors({
  origin:{'http://localhost:49396':
   'http://localhost:5173'}, //con origin dejo solo los servidores que quiero que se comuniquen, si lo quito le doy entrada a que todos y no a uno en específico
  credentials: true
})); //Esto permite que todos los dominios se comuniquen en el mismo servidor

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taksRoutes);
app.use("/api", productsRoutes);
app.use("/api", empleadoRoutes);
app.use("/api", actividadesRoutes)
app.use("/api", clientesRouter);
app.use("/api", pedidosRouter);
app.use("/api", programacionRouter);


if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html") );
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
